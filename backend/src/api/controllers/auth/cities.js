import City from '../../models/City.js'

const schemaName = City
const schemaNameString = 'City'

export const getCities = async (req, res) => {

  // try {
  //   const { _id } = req.user
  //   const objects = await schemaName
  //     .findOne({ user: _id })
  //     .lean()
  //     .sort({ createdAt: -1 })
  //     .populate('user', ['name', 'email', 'confirmed', 'blocked'])

  //   res.status(200).send(objects)
  // } catch (error) {
  //   res.status(500).json({ error: error.message })
  // }

  try {
    const q = req.query && req.query.q

    let query = schemaName.find(q ? { name: { $regex: q, $options: 'i' } } : {})

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      q ? { name: { $regex: q, $options: 'i' } } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
      .populate('state', ['stateName'])

    const result = await query

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const postCity = async (req, res) => {
  try {
    const object = await schemaName.create(req.body)
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putCity = async (req, res) => {
  try {
    const { id } = req.params

    const { state, cityID, cityName, cityShortName } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.state = state
    object.cityID = cityID
    object.cityName = cityName
    object.cityShortName = cityShortName
        
    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params
    const object = await schemaName.findByIdAndDelete(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    // const rolesObject = await Role.find({
    //   cityState: object._id,
    // })

    // if (rolesObject.length > 0) {
    //   rolesObject.forEach(async (role) => {
    //     role.cityState.filter((item) => item.toString() !== id).length
    //     await role.save()
    //   })
    // }

    // await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
