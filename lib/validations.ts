import * as yup from 'yup'

// Validation schema for product
export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  description: yup
    .string()
    .required('La descripción es requerida')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  price: yup
    .number()
    .required('El precio es requerido')
    .positive('El precio debe ser positivo')
    .min(0, 'El precio debe ser mayor o igual a 0'),
  image: yup
    .string()
    .required('La imagen es requerida')
    .url('La URL de la imagen debe ser válida'),
  category: yup
    .string()
    .required('La categoría es requerida')
    .oneOf(['Furniture', 'Lighting', 'Decor'], 'La categoría debe ser válida'),
  stock: yup
    .number()
    .required('El stock es requerido')
    .integer('El stock debe ser un número entero')
    .min(0, 'El stock debe ser mayor o igual a 0'),
})

// Validation schema for user registration
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('El correo electrónico debe ser válido')
    .max(100, 'El correo electrónico no puede exceder 100 caracteres'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
})

// Validation schema for user login
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('El correo electrónico debe ser válido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(1, 'La contraseña es requerida'),
})

// Validation schema for contact form
export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('El correo electrónico debe ser válido')
    .max(100, 'El correo electrónico no puede exceder 100 caracteres'),
  message: yup
    .string()
    .required('El mensaje es requerido')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
})

// Validation schema for profile update
export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  image: yup
    .string()
    .nullable()
    .optional()
    .url('La URL de la imagen debe ser válida')
    .max(500, 'La URL de la imagen no puede exceder 500 caracteres'),
})

