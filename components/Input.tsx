import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

// Reusable input component
export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {/* Input label */}
      {label && (
        <label className="block text-xs font-medium text-primary-600 mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative group">
        {/* Input */}
        <input
          className={`w-full px-0 py-2.5 bg-transparent border-0 border-b ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-300 focus:border-accent-400'
          } focus:outline-none text-sm text-gray-800 placeholder-gray-400 transition-all duration-300 group-hover:border-accent-300 ${className}`}
          {...props}
        />
        {/* Decorative bottom line */}
        <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent-400 transition-all duration-300 group-hover:w-full ${
          error ? 'hidden' : ''
        }`} />
      </div>
      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
