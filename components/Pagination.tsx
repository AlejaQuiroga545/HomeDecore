'use client'

import { useLanguage } from '@/context/LanguageContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// Pagination component
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { t } = useLanguage()
  // Create array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-accent-50 hover:text-accent-500 border border-gray-200/50'
        }`}
      >
        {t.pagination.previous}
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            currentPage === page
              ? 'bg-accent-400 text-white shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-accent-50 hover:text-accent-500 border border-gray-200/50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-accent-50 hover:text-accent-500 border border-gray-200/50'
        }`}
      >
        {t.pagination.next}
      </button>
    </div>
  )
}
