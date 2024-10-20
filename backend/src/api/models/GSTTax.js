import mongoose from 'mongoose'

const GSTTaxScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    gSTTaxSerialNo: { type: String, required: true },
    gSTTax: { type: String, required: true },
  },
  { timestamps: true }
)

const GSTTax = mongoose.model('GSTTax', GSTTaxScheme)
export default GSTTax
