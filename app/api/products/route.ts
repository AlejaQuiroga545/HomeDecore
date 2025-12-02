import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { productSchema } from '@/lib/validations'

// Get all products with pagination, filtering and search
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build query
    const query: any = {}
    
    // Filter by category
    if (category && category !== 'All') {
      query.category = category
    }
    
    // Search in name and description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit
    
    // Get total count for pagination
    const total = await Product.countDocuments(query)
    
    // Get products with pagination
    const sortOptions: any = {}
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
    
    // Transform products to include id field
    const transformedProducts = products.map((product: any) => ({
      ...product.toObject(),
      id: product._id.toString(),
    }))
    
    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
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
    
    // Validate with Yup
    try {
      await productSchema.validate(body, { abortEarly: false })
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
