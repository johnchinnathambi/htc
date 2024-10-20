import mongoose from 'mongoose'

const HSNScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    hSNCodeSerialNo: { type: String, required: true },
    hSNCode: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
)

const HSN = mongoose.model('HSN', HSNScheme)
export default HSN
