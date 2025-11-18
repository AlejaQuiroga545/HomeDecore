import mongoose, { Schema, Document, Model } from 'mongoose'

// User type
export interface IUser extends Document {
  email: string
  name?: string
  password?: string
  role: 'admin' | 'user'
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

// User schema in MongoDB
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Unique email
      lowercase: true, // Convert to lowercase
      trim: true, // Remove spaces
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // Only these values
      default: 'user', // Default is user
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
)

// Create or get user model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema, 'users')

export default User
