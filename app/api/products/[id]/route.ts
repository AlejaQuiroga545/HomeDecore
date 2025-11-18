import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import mongoose from 'mongoose'

// Get a product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB()
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id
    
    // Validate that ID is valid for MongoDB
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ID received:', id)
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }
    
    // Find product by ID
    const product = await Product.findById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
  }
}

// Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB()
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id
    
    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ID received:', id)
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }
    
    const body = await request.json()
    // Update product in database
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        image: body.image,
        category: body.category,
        stock: Number(body.stock) || 0,
      },
      { new: true } // Return updated document
    )
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Error updating product' },
      { status: 500 }
    )
  }
}

// Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB()
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id
    
    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.error('Invalid ID received:', id)
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }
    
    // Delete product from database
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
  }
}
