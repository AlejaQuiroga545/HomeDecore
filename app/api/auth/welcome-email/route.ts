import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await sendWelcomeEmail(email, name)

    return NextResponse.json({ message: 'Welcome email sent successfully' })
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    )
  }
}

