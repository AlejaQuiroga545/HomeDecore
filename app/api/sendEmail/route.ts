import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendContactConfirmationEmail } from '@/lib/nodemailer'
import { contactSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate with Yup
    try {
      await contactSchema.validate({ name, email, message }, { abortEarly: false })
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

    // Send email to HomeDecor
    await sendContactEmail(name, email, message)

    // Send confirmation email to user (don't wait for it)
    sendContactConfirmationEmail(name, email).catch((error) => {
      console.error('Failed to send confirmation email:', error)
      // Don't fail the request if confirmation email fails
    })

    return NextResponse.json({ message: 'Contact email sent successfully' })
  } catch (error: any) {
    console.error('Error sending contact email:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send contact email' },
      { status: 500 }
    )
  }
}

