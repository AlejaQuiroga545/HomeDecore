import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

// Input component
export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-primary-700 mb-1.5">
        {label}
      </label>
        <input
          className={`w-full px-4 py-2.5 rounded-xl border border-primary-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-200 focus:outline-none bg-white text-primary-900 text-sm placeholder-primary-400 transition-all ${className}`}
          {...props}
        />
    </div>
  )
}
