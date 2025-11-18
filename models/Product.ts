import mongoose, { Schema, Document, Model } from 'mongoose'

// Product type
export interface IProduct extends Document {
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  createdAt: Date
  updatedAt: Date
}

// Product schema in MongoDB
const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Minimum price 0
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Default stock 0
      min: 0, // Minimum stock 0
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
)

// Create or get product model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema, 'products')

export default Product
