import mongoose, { Schema, Document, Model } from 'mongoose'

// Cart item type
export interface ICartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

// Cart type
export interface ICart extends Document {
  userId: string
  items: ICartItem[]
  createdAt: Date
  updatedAt: Date
}

// Cart schema in MongoDB
const CartSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    items: [
      {
        productId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        image: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Create or get cart model
const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema, 'carts')

export default Cart

