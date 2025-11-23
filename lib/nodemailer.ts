import nodemailer from 'nodemailer'
import {
  generateWelcomeEmail,
  generateLoginEmail,
  generateContactEmail,
} from './emailTemplates'

// Verify SMTP configuration
function verifySMTPConfig(): boolean {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP configuration missing. Email functionality disabled.')
    console.warn('Set SMTP_HOST, SMTP_USER, and SMTP_PASSWORD in .env.local')
    return false
  }
  return true
}

// Create transporter function to ensure it's only created when needed
function createTransporter() {
  if (!verifySMTPConfig()) {
    throw new Error('SMTP configuration is missing')
  }

  const port = parseInt(process.env.SMTP_PORT || '587')
  const secure = port === 465 || process.env.SMTP_SECURE === 'true'

  const transporterConfig = {
    host: process.env.SMTP_HOST,
    port: port,
    secure: secure, // true for port 465, false for others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Increased timeouts to handle slow connections
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 30000, // 30 seconds
    // TLS options for better compatibility
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
    },
    // Additional options for Gmail
    requireTLS: !secure, // Require TLS for non-secure connections
  } as const

  return nodemailer.createTransport(transporterConfig)
}

// Send welcome email on registration
export async function sendWelcomeEmail(email: string, name?: string): Promise<void> {
  console.log('📧 Sending welcome email to:', email)
  
  try {
    if (!verifySMTPConfig()) {
      console.warn('Welcome email skipped - SMTP not configured')
      return
    }

    const transporter = createTransporter()
    const emailHtml = generateWelcomeEmail(name)

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to HomeDecor! 🎉',
      html: emailHtml,
    }

    const result = await transporter.sendMail(mailOptions)

    console.log('Welcome email sent successfully to', email)
    console.log('Message ID:', result.messageId)
  } catch (error: any) {
    console.error('Failed to send welcome email to', email)
    console.error('Error:', error.message || error)
    
    if (error.code === 'EAUTH' || error.message?.includes('Username and Password not accepted')) {
      console.error('Authentication failed. Gmail requires an App Password.')
      console.error('Get one at: https://myaccount.google.com/apppasswords')
      console.error('Make sure 2-Step Verification is enabled first.')
    }
    
    if (error.code === 'ETIMEDOUT' || error.message?.includes('Timeout')) {
      console.error('Connection timeout. Try port 465 with SMTP_SECURE=true')
      console.error('Or check your internet connection and firewall settings.')
    }
    
    // Don't throw - email failures shouldn't break registration
  }
}

// Send login notification email
export async function sendLoginEmail(email: string, name?: string): Promise<void> {
  console.log('📧 Sending login notification email to:', email)
  
  try {
    if (!verifySMTPConfig()) {
      console.warn('Login email skipped - SMTP not configured')
      return
    }

    const transporter = createTransporter()
    const emailHtml = generateLoginEmail(name)

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Login Notification - HomeDecor',
      html: emailHtml,
    }

    const result = await transporter.sendMail(mailOptions)

    console.log('Login notification email sent to', email)
    console.log('Message ID:', result.messageId)
  } catch (error: any) {
    console.error('Failed to send login email to', email)
    console.error('Error:', error.message || error)
    
    if (error.code === 'EAUTH' || error.message?.includes('Username and Password not accepted')) {
      console.error('Authentication failed. Gmail requires an App Password.')
      console.error('Get one at: https://myaccount.google.com/apppasswords')
      console.error('Make sure 2-Step Verification is enabled first.')
    }
    
    if (error.code === 'ETIMEDOUT' || error.message?.includes('Timeout')) {
      console.error('Connection timeout. Try port 465 with SMTP_SECURE=true')
      console.error('Or check your internet connection and firewall settings.')
    }
    
    // Don't throw - email failures shouldn't break login
  }
}

// Send contact form email
export async function sendContactEmail(name: string, email: string, message: string): Promise<void> {
  console.log('📧 Sending contact form email from:', email)
  
  try {
    if (!verifySMTPConfig()) {
      console.warn('Contact email skipped - SMTP not configured')
      throw new Error('SMTP configuration is missing')
    }

    const transporter = createTransporter()
    const emailHtml = generateContactEmail(name, email, message)
    const recipientEmail = 'qgale45@gmail.com'

    // Escape name for subject line
    const safeSubjectName = name.replace(/[<>]/g, '')

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipientEmail,
      replyTo: email,
      subject: `New contact form Message from ${safeSubjectName} - HomeDecor`,
      html: emailHtml,
    }

    const result = await transporter.sendMail(mailOptions)

    console.log('Contact email sent successfully to', recipientEmail)
    console.log('Message ID:', result.messageId)
  } catch (error: any) {
    console.error('Failed to send contact email')
    console.error('Error:', error.message || error)
    
    if (error.code === 'EAUTH' || error.message?.includes('Username and Password not accepted')) {
      console.error('Authentication failed. Gmail requires an App Password.')
      console.error('Get one at: https://myaccount.google.com/apppasswords')
      console.error('Make sure 2-Step Verification is enabled first.')
    }
    
    if (error.code === 'ETIMEDOUT' || error.message?.includes('Timeout')) {
      console.error('Connection timeout. Try port 465 with SMTP_SECURE=true')
      console.error('Or check your internet connection and firewall settings.')
    }
    
    throw error // Throw for API to handle
  }
}
