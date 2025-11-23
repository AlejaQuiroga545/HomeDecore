const brandColors = {
  accent: '#C263F9',
}

// Generate welcome email template (simple HTML without Mailgen)
export function generateWelcomeEmail(name?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const userName = name || 'there'
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px; text-align: center; background-color: #ffffff;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${brandColors.accent}; letter-spacing: -0.5px;">HomeDecor</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 0 40px 40px;">
                  <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">Welcome to HomeDecor! 🎉</h2>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; font-weight: 400; color: #333333; line-height: 1.6;">Hi ${userName},</p>
                  
                  <p style="margin: 0 0 32px; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">We're thrilled to have you as part of our community. Get ready to transform your living spaces with our curated collection of beautiful furniture and decor items.</p>
                  
                  <!-- Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px;">
                    <tr>
                      <td align="center">
                        <a href="${baseUrl}/shop" style="display: inline-block; background-color: ${brandColors.accent}; color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; letter-spacing: 0.3px;">Explore shop</a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">If you have any questions, feel free to reach out to our support team.</p>
                  
                  <p style="margin: 0; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">Happy shopping!</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0; font-size: 13px; font-weight: 400; color: #666666; text-align: center; line-height: 1.5;">© 2025 HomeDecor. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Generate contact form email template
export function generateContactEmail(name: string, email: string, message: string) {
  const brandColors = {
    accent: '#C263F9',
  }
  const submissionTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  
  // Escape user input to prevent XSS
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px; text-align: center; background-color: #ffffff;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${brandColors.accent}; letter-spacing: -0.5px;">HomeDecor</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 0 40px 40px;">
                  <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">New contact form message</h2>
                  
                  <p style="margin: 0 0 24px; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">You have received a new message from the contact form on your website.</p>
                  
                  <!-- Contact Information Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px; background-color: #f8f8f8; border-radius: 8px; border-left: 3px solid ${brandColors.accent};">
                    <tr>
                      <td style="padding: 20px;">
                        <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #1a1a1a; line-height: 1.5;">Contact Information</p>
                        <p style="margin: 0 0 8px; font-size: 14px; font-weight: 400; color: #4a4a4a; line-height: 1.6;"><strong>Name:</strong> ${safeName}</p>
                        <p style="margin: 0 0 8px; font-size: 14px; font-weight: 400; color: #4a4a4a; line-height: 1.6;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: ${brandColors.accent}; text-decoration: none;">${safeEmail}</a></p>
                        <p style="margin: 8px 0 0; font-size: 13px; font-weight: 400; color: #666666; line-height: 1.5;">Submitted: ${submissionTime}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Message Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px;">
                    <tr>
                      <td>
                        <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #1a1a1a; line-height: 1.5;">Message</p>
                        <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px;">
                          <p style="margin: 0; font-size: 15px; font-weight: 400; color: #333333; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Reply Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px;">
                    <tr>
                      <td align="center">
                        <a href="mailto:${safeEmail}?subject=Re: Contact Form Message from ${encodeURIComponent(safeName)}" style="display: inline-block; background-color: ${brandColors.accent}; color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; letter-spacing: 0.3px;">Reply to ${safeName}</a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0; font-size: 14px; font-weight: 400; color: #666666; line-height: 1.6;">This message was sent from the contact form on your HomeDecor website.</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0; font-size: 13px; font-weight: 400; color: #666666; text-align: center; line-height: 1.5;">© 2025 HomeDecor. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Generate login notification email template (simple HTML without Mailgen)
export function generateLoginEmail(name?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const userName = name || 'there'
  const loginTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 30px; text-align: center; background-color: #ffffff;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${brandColors.accent}; letter-spacing: -0.5px;">HomeDecor</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 0 40px 40px;">
                  <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 600; color: #1a1a1a; line-height: 1.3;">Login notification</h2>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; font-weight: 400; color: #333333; line-height: 1.6;">Hi ${userName},</p>
                  
                  <p style="margin: 0 0 24px; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">You have successfully logged into your HomeDecor account.</p>
                  
                  <!-- Login Time Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px; background-color: #f8f8f8; border-radius: 8px; border-left: 3px solid #e0e0e0;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <p style="margin: 0; font-size: 14px; font-weight: 500; color: #1a1a1a; line-height: 1.5;">Login Time</p>
                        <p style="margin: 4px 0 0; font-size: 15px; font-weight: 400; color: #4a4a4a; line-height: 1.5;">${loginTime}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 24px; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">If this wasn't you, please contact us immediately to secure your account.</p>
                  
                  <!-- Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 32px;">
                    <tr>
                      <td align="center">
                        <a href="${baseUrl}/contact" style="display: inline-block; background-color: ${brandColors.accent}; color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; letter-spacing: 0.3px;">Contact support</a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">For your security, we recommend changing your password if you didn't initiate this login.</p>
                  
                  <p style="margin: 0; font-size: 16px; font-weight: 400; color: #4a4a4a; line-height: 1.6;">Stay safe!</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0; font-size: 13px; font-weight: 400; color: #666666; text-align: center; line-height: 1.5;">© 2025 HomeDecor. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}