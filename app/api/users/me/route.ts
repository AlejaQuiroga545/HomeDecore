import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

// Get current user information
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Try to get NextAuth session (for Google OAuth)
    const session = await getServerSession(authOptions)
    
    let userEmail: string | null = null
    
    // If there's a NextAuth session, use that email
    if (session?.user?.email) {
      userEmail = session.user.email
    } 
    // If no NextAuth session, get email from query string (for manual login)
    else {
      const url = new URL(request.url)
      userEmail = url.searchParams.get('email')
    }
    
    // If no email, unauthorized
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user in database
    const user = await User.findOne({ email: userEmail.toLowerCase().trim() })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return user data
    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image || '',
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// Update user information
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    // Try to get NextAuth session
    const session = await getServerSession(authOptions)
    
    // Read body once
    const body = await request.json()
    
    let userEmail: string | null = null
    
    // If there's a NextAuth session, use that email
    if (session?.user?.email) {
      userEmail = session.user.email
    }
    // If not, get email from body (for manual login)
    else {
      userEmail = body.email
    }
    
    // If no email, unauthorized
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get data to update
    const { name, image } = body

    // Update user in database
    const user = await User.findOneAndUpdate(
      { email: userEmail.toLowerCase().trim() },
      { name, image },
      { new: true } // Return updated document
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Return updated data
    return NextResponse.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image || '',
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
