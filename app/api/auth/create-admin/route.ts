import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email = 'admin@homedecor.com', password = 'xyz1507', name = 'Admin User', update = false } = await request.json()

    // Verificar si ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      // Si update=true, siempre actualizar la contraseña
      if (update) {
        const hashedPassword = await bcrypt.hash(password, 10)
        existingUser.password = hashedPassword
        existingUser.role = 'admin'
        if (name) existingUser.name = name
        await existingUser.save()
        return NextResponse.json({ 
          message: 'Admin user password updated successfully',
          user: {
            id: (existingUser._id as any).toString(),
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
          }
        })
      }
      
      // Si la contraseña no está hasheada o no existe, actualizarla automáticamente
      if (!existingUser.password || existingUser.password.length < 50) {
        const hashedPassword = await bcrypt.hash(password, 10)
        existingUser.password = hashedPassword
        existingUser.role = 'admin'
        if (name) existingUser.name = name
        await existingUser.save()
        return NextResponse.json({ 
          message: 'Admin user password updated successfully',
          user: {
            id: (existingUser._id as any).toString(),
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
          }
        })
      }
      
      return NextResponse.json({ error: 'User already exists with hashed password. Use update=true to force update.' }, { status: 400 })
    }

    // Crear nuevo usuario admin
    const hashedPassword = await bcrypt.hash(password, 10)
    const adminUser = new User({
      email: email.toLowerCase().trim(),
      name,
      password: hashedPassword,
      role: 'admin',
    })

    await adminUser.save()

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: {
          id: (adminUser._id as any).toString(),
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Error creating admin user' },
      { status: 500 }
    )
  }
}

