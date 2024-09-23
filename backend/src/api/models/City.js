import mongoose from 'mongoose'

const CityScheme = mongoose.Schema(
  {    
    stateID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
      },
    ],
    cityID: { type: String, required: true },
    cityName: { type: String, required: true },
    cityShortName: { type: String, required: true },
  },
  { timestamps: true }
)

const City = mongoose.model('City', CityScheme)
export default City