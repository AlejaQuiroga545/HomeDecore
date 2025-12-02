// SweetAlert2 configuration with brand colors
import Swal from 'sweetalert2'

// Brand colors
const brandColors = {
  primary: '#2C2416',
  accent: '#C97D60',
  warm: '#e37a3f',
  danger: '#d33',
  success: '#10b981',
}

// Configure SweetAlert2 with brand colors
export const swalConfig = {
  confirmButtonColor: brandColors.accent,
  cancelButtonColor: brandColors.primary,
  denyButtonColor: brandColors.warm,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancelar',
  denyButtonText: 'No',
  buttonsStyling: true,
  customClass: {
    confirmButton: 'swal2-confirm-brand',
    cancelButton: 'swal2-cancel-brand',
    denyButton: 'swal2-deny-brand',
  },
}

// Helper function to create branded Swal alerts
export const createBrandedSwal = (options: any) => {
  return Swal.fire({
    ...swalConfig,
    ...options,
  })
}

// Pre-configured alert types
export const swalSuccess = (title: string, text?: string) => {
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    icon: 'success',
    confirmButtonColor: brandColors.success,
  })
}

export const swalError = (title: string, text?: string) => {
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    icon: 'error',
    confirmButtonColor: brandColors.danger,
  })
}

export const swalWarning = (title: string, text?: string) => {
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    icon: 'warning',
    confirmButtonColor: brandColors.warm,
  })
}

export const swalConfirm = (title: string, text?: string) => {
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: brandColors.accent,
    cancelButtonColor: brandColors.primary,
  })
}

export default Swal

