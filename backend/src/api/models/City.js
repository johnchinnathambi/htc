import mongoose from 'mongoose'

const CityScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
)

const City = mongoose.model('City', CityScheme)
export default City