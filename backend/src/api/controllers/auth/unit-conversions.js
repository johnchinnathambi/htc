import UnitConversion from '../../models/UnitConversion.js'

const schemaName = UnitConversion
const schemaNameString = 'UnitConversion'

export const getUnitConversions = async (req, res) => {

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
      .populate('mainUnit', ['unitName'])

    const result = await query

    const getLastItem = await schemaName.find({}).sort({sequenceNumber: -1}).limit(1)
    const nextSequenceNumber = getLastItem && getLastItem.length > 0 ? getLastItem[0].sequenceNumber + 1 : ''

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      nextSequenceNumber,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const postUnitConversion = async (req, res) => {
  try {
    const object = await schemaName.create(req.body)
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putUnitConversion = async (req, res) => {
  try {
    const { id } = req.params

    const { unitConversionSerialNo, mainUnit, subUnit, conversionFactor } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.unitConversionSerialNo = unitConversionSerialNo
    object.mainUnit = mainUnit
    object.subUnit = subUnit
    object.conversionFactor = conversionFactor
        
    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUnitConversion = async (req, res) => {
  try {
    const { id } = req.params
    const object = await schemaName.findByIdAndDelete(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    // const rolesObject = await Role.find({
    //   unitConversionState: object._id,
    // })

    // if (rolesObject.length > 0) {
    //   rolesObject.forEach(async (role) => {
    //     role.unitConversionState.filter((item) => item.toString() !== id).length
    //     await role.save()
    //   })
    // }

    // await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
