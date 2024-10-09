import mongoose from 'mongoose'

const MenuScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    menu: { type: String, required: true },
    path: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
)

const Menu = mongoose.model('Menu', MenuScheme)
export default Menu
