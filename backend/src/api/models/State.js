import mongoose from 'mongoose'

const StateScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    stateID: { type: String, required: true},
    stateName: { type: String, required: true },
    stateShortName: { type: String, required: true },
    stateGSTCode: { type: Number, required: true },
  },
  { timestamps: true }
)

const State = mongoose.model('State', StateScheme)
export default State