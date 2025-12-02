import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/nodemailer'

// Daily email cron job endpoint
// This endpoint should be called by Vercel Cron or an external service
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'qgale45@gmail.com'
    
    // Send daily email
    await sendContactEmail(
      'HomeDecor System',
      adminEmail,
      'Este es un email automático diario del sistema HomeDecor. El sistema está funcionando correctamente.'
    )
    
    return NextResponse.json({ 
      success: true,
      message: 'Daily email sent successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error in daily email cron job:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to send daily email',
      },
      { status: 500 }
    )
  }
}

