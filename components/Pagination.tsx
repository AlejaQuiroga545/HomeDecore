'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'bg-beige-200 text-brown-400 cursor-not-allowed'
            : 'bg-white text-brown-700 hover:bg-beige-100 border border-beige-300'
        }`}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-brown-600 text-white'
              : 'bg-white text-brown-700 hover:bg-beige-100 border border-beige-300'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'bg-beige-200 text-brown-400 cursor-not-allowed'
            : 'bg-white text-brown-700 hover:bg-beige-100 border border-beige-300'
        }`}
      >
        Next
      </button>
    </div>
  )
}

