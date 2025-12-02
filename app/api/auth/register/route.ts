import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { sendWelcomeEmail } from '@/lib/nodemailer'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'

// Register new user
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { name, email, password } = await request.json()

    // Validate with Yup
    try {
      await registerSchema.validate({ name, email, password }, { abortEarly: false })
    } catch (validationError: any) {
      const errors = validationError.inner 
        ? validationError.inner.map((err: any) => ({
            field: err.path,
            message: err.message,
          }))
        : [{
            field: validationError.path || 'unknown',
            message: validationError.message || 'Validation failed',
          }]
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create new user
    const user = new User({
      email: email.toLowerCase().trim(),
      name: name?.trim() || '',
      password: hashedPassword,
      role: 'user',
    })

    await user.save()

    // Send welcome email
    sendWelcomeEmail(user.email, user.name).catch((error) => {
      console.error('Failed to send welcome email:', error)
    })

    // Return created user data
    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error:', error)
    const errorMessage = error.message || 'Error registering user'
    if (errorMessage.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection not configured. Please check your .env.local file' },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
