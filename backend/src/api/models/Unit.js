import mongoose from 'mongoose'

const UnitScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    unitSerialNo: { type: String, required: true },
    unitName: { type: String, required: true },
  },
  { timestamps: true }
)

const Unit = mongoose.model('Unit', UnitScheme)
export default Unit