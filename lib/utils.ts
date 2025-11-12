// Format price to Colombian Pesos
export function formatPriceCOP(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format price with COP suffix (simpler format)
export function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-CO')} COP`
}

