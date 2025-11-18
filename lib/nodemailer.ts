import nodemailer from 'nodemailer'

// Configure email transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Send welcome email on registration
export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to HomeDecor!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #292D3E;">Welcome to HomeDecor!</h1>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for joining HomeDecor! We're excited to have you as part of our community.</p>
          <p>Start exploring our collection of beautiful furniture and decor items to transform your living spaces.</p>
          <p>Happy shopping!</p>
          <p>Best regards,<br>The HomeDecor Team</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}

// Send login notification email
export async function sendLoginEmail(email: string, name?: string) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Login Notification - HomeDecor',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #292D3E;">Hello ${name || 'there'}!</h1>
          <p>You have successfully logged into your HomeDecor account.</p>
          <p>If this wasn't you, please contact us immediately.</p>
          <p>Best regards,<br>The HomeDecor Team</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending login email:', error)
  }
}

// Send new product notification email
export async function sendNewProductEmail(
  email: string,
  name: string | undefined,
  productName: string,
  productDescription: string,
  productPrice: number,
  productImage: string,
  productCategory: string
) {
  try {
    // Format price with currency
    const formattedPrice = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(productPrice)

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `New Product Available: ${productName} - HomeDecor`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #292D3E; margin-bottom: 20px;">New Product Available!</h1>
          <p>Hi ${name || 'there'},</p>
          <p>We're excited to announce a new product has been added to our collection:</p>
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <div style="text-align: center; margin-bottom: 15px;">
              <img src="${productImage}" alt="${productName}" style="max-width: 100%; height: auto; border-radius: 8px;" />
            </div>
            <h2 style="color: #292D3E; margin-top: 0;">${productName}</h2>
            <p style="color: #666; margin: 10px 0;"><strong>Category:</strong> ${productCategory}</p>
            <p style="color: #666; margin: 10px 0;"><strong>Price:</strong> ${formattedPrice}</p>
            <p style="color: #666; margin: 10px 0;">${productDescription}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shop" 
               style="background-color: #C263F9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              View Product
            </a>
          </div>
          
          <p>Don't miss out on this amazing addition to our collection!</p>
          <p>Best regards,<br>The HomeDecor Team</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending new product email:', error)
  }
}