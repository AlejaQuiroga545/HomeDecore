import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

// Reusable button component
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  // Base button styles
  const baseStyles =
    'font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-sm'
  
  // Color variants
  const variants = {
    primary:
      'bg-accent-400 text-white hover:bg-accent-500 focus:ring-accent-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-white/80 text-primary-700 hover:bg-white/90 focus:ring-primary-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'border border-primary-300 text-primary-700 hover:bg-primary-50/50 focus:ring-primary-300 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]',
  }

  // Button sizes
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-6 py-2.5 text-sm',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
