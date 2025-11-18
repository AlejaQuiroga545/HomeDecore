import { NextRequest, NextResponse } from 'next/server'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

// Upload image to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    // Validate that a file was sent
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate that it's an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate size (maximum 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    console.log('Uploading file to Cloudinary:', {
      name: file.name,
      type: file.type,
      size: file.size,
    })
    
    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(file)
    
    if (!result.secure_url) {
      return NextResponse.json({ error: 'Failed to get image URL from Cloudinary' }, { status: 500 })
    }
    
    console.log('Upload successful, URL:', result.secure_url)
    // Return image URL
    return NextResponse.json({ secure_url: result.secure_url, public_id: result.public_id })
  } catch (error: any) {
    console.error('Error uploading image:', error)
    
    // Clearer error message
    let errorMessage = 'Error uploading image'
    if (error?.message) {
      errorMessage = String(error.message)
    }
    
    // Specific message for configuration errors
    if (errorMessage.includes('CLOUDINARY_CLOUD_NAME') || errorMessage.includes('CLOUDINARY_API_KEY') || errorMessage.includes('CLOUDINARY_API_SECRET')) {
      errorMessage = 'Cloudinary is not configured correctly. Check your environment variables in .env.local'
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
