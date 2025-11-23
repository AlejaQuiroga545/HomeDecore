import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    await sendContactEmail(name, email, message)

    return NextResponse.json({ message: 'Contact email sent successfully' })
  } catch (error: any) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send contact email' },
      { status: 500 }
    )
  }
}

