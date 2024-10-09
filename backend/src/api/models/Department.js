import mongoose from 'mongoose'

const DepartmentScheme = mongoose.Schema(
  {
    departmentSerialNo: { type: String, required: true },
    department: { type: String, required: true },    
  },
  { timestamps: true }
)

const Department = mongoose.model('Department', DepartmentScheme)
export default Department