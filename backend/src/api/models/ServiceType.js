import mongoose from 'mongoose'

const ServiceTypeScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    serviceSerialNo: { type: String, required: true },
    serviceName: { type: String, required: true },
    particular: { type: String, required: true },
    fees: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
)

const ServiceType = mongoose.model('ServiceType', ServiceTypeScheme)
export default ServiceType
