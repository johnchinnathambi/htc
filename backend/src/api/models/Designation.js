import mongoose from 'mongoose'

const DesignationScheme = mongoose.Schema(
  {    
    sequenceNumber: { type: Number, unique: true },
    designationSerialNo: { type: String, required: true },
    department:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },    
    designation: { type: String, required: true },    
  },
  { timestamps: true }
)

const Designation = mongoose.model('Designation', DesignationScheme)
export default Designation