import cron from 'node-cron'
import { sendContactEmail } from './nodemailer'

// Daily email task - sends email every day at 9:00 AM
export function setupDailyEmailTask() {
  // Run every day at 9:00 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('Running daily email task...')
    try {
      // Example: Send daily report email
      // You can customize this to send any daily email
      const adminEmail = process.env.ADMIN_EMAIL || 'qgale45@gmail.com'
      
      // Example email content
      await sendContactEmail(
        'HomeDecor System',
        adminEmail,
        'Este es un email automático diario del sistema HomeDecor. El sistema está funcionando correctamente.'
      )
      
      console.log('Daily email task completed successfully')
    } catch (error) {
      console.error('Error in daily email task:', error)
    }
  }, {
    scheduled: true,
    timezone: 'America/Bogota', // Adjust to your timezone
  })
  
  console.log('Daily email cron job scheduled (runs daily at 9:00 AM)')
}

// Initialize cron jobs
export function initializeCronJobs() {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_CRON === 'true') {
    setupDailyEmailTask()
  } else {
    console.log('Cron jobs disabled in development mode. Set ENABLE_CRON=true to enable.')
  }
}

