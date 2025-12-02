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
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
          currentPage === 1
            ? 'bg-primary-100 text-primary-400 cursor-not-allowed'
            : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200 shadow-sm hover:shadow-md'
        }`}
      >
        {t.pagination.previous}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            currentPage === page
              ? 'bg-primary-900 text-white shadow-md'
              : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200 shadow-sm hover:shadow-md'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
          currentPage === totalPages
            ? 'bg-primary-100 text-primary-400 cursor-not-allowed'
            : 'bg-white text-primary-700 hover:bg-primary-50 border border-primary-200 shadow-sm hover:shadow-md'
        }`}
      >
        {t.pagination.next}
      </button>
    </div>
  )
}
