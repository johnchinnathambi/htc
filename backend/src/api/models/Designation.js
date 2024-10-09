import mongoose from 'mongoose'

const DesignationScheme = mongoose.Schema(
  {    
    department:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },    
    designationSerialNo: { type: String, required: true },
    designation: { type: String, required: true },    
  },
  { timestamps: true }
)

const Designation = mongoose.model('Designation', DesignationScheme)
export default Designation