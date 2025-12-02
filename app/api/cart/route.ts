import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// Get user cart
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Try NextAuth session first
    const session = await getServerSession(authOptions)
    let userEmail = session?.user?.email
    
    // If no session, try to get from query params
    if (!userEmail) {
      const { searchParams } = new URL(request.url)
      userEmail = searchParams.get('userEmail')
    }
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists
    if (!session?.user?.email) {
      const User = (await import('@/models/User')).default
      const user = await User.findOne({ email: userEmail })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    }

    const cart = await Cart.findOne({ userId: userEmail })
    
    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json({ items: cart.items || [] })
  } catch (error: any) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: error.message || 'Error fetching cart' },
      { status: 500 }
    )
  }
}

// Save or update user cart
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { items, userEmail: bodyUserEmail } = body
    
    // Get user email from session or body
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email || bodyUserEmail
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists
    if (!session?.user?.email) {
      const User = (await import('@/models/User')).default
      const user = await User.findOne({ email: userEmail })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Items must be an array' }, { status: 400 })
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: userEmail },
      { items },
      { upsert: true, new: true }
    )

    return NextResponse.json({ items: cart.items || [] })
  } catch (error: any) {
    console.error('Error saving cart:', error)
    return NextResponse.json(
      { error: error.message || 'Error saving cart' },
      { status: 500 }
    )
  }
}

