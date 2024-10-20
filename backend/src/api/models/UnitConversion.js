import mongoose from 'mongoose'

const UnitConversionScheme = mongoose.Schema(
  { 
    sequenceNumber: { type: Number, unique: true },
    unitConversionSerialNo: { type: String, required: true },
    mainUnit:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Unit',
    },
    subUnit: { type: String, required: true },
    conversionFactor: { type: String, required: true },
  },
  { timestamps: true }
)

const UnitConversion = mongoose.model('UnitConversion', UnitConversionScheme)
export default UnitConversion