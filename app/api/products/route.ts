import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// Get all products
export async function GET() {
  try {
    await connectDB()
    // Find all products sorted by creation date (newest first)
    const products = await Product.find({}).sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Error:', error)
    const errorMessage = error.message || 'Error fetching products'
    if (errorMessage.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection not configured. Please check your .env.local file' },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Create new product
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.image) {
      return NextResponse.json({ error: 'Name, price and image are required' }, { status: 400 })
    }

    // Create new product in database
    const product = new Product({
      name: body.name,
      description: body.description || '',
      price: Number(body.price),
      image: body.image,
      category: body.category || 'Other',
      stock: Number(body.stock) || 0,
    })
    
    await product.save()

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error('Error:', error)
    const errorMessage = error.message || 'Error creating product'
    if (errorMessage.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection not configured. Please check your .env.local file' },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
