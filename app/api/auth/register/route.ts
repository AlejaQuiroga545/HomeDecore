import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { sendWelcomeEmail } from '@/lib/nodemailer'
import bcrypt from 'bcryptjs'

// Register new user
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
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
    sendWelcomeEmail(user.email, user.name).catch(console.error)

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
