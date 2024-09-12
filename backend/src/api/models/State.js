import mongoose from 'mongoose'

const StateScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
)

const State = mongoose.model('State', StateScheme)
export default State