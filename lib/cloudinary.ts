import { v2 as cloudinary } from 'cloudinary'

// Get Cloudinary environment variables
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

let isConfigured = false

// Verify and configure Cloudinary
function ensureConfig() {
  // Validate that all variables are configured
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env')
  }

  // Configure only once
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true, // Use HTTPS
    })
    isConfigured = true
  }
}

// Upload image to Cloudinary
export async function uploadImageToCloudinary(file: File) {
  // Verify configuration
  ensureConfig()

  // Validate that file exists and is not empty
  if (!file || file.size === 0) {
    throw new Error('You must attach an image for the product.')
  }

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload to Cloudinary
  return new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER ?? 'homedecor', // Folder where it's saved
        transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }], // Automatic optimization
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Unknown error uploading image'))
          return
        }
        // Return image URL and its public ID
        resolve({ secure_url: result.secure_url, public_id: result.public_id })
      }
    )

    uploadStream.end(buffer)
  })
}

// Compatibility function (returns only the URL)
export async function uploadImage(file: File | Blob): Promise<string> {
  if (!(file instanceof File)) {
    throw new Error('uploadImage only accepts File objects')
  }
  const result = await uploadImageToCloudinary(file)
  return result.secure_url
}

export default cloudinary
