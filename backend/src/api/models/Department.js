import mongoose from 'mongoose'

const DepartmentScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    departmentSerialNo: { type: String, required: true },
    department: { type: String, required: true },    
  },
  { timestamps: true }
)

const Department = mongoose.model('Department', DepartmentScheme)
export default Department