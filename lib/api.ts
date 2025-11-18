import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

// Configure Axios with API base URL
const api = axios.create({
  baseURL: '/api',
})

// Request interceptor - configure Content-Type
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // If not FormData, set Content-Type as JSON
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
})

// Response interceptor - transform _id to id
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      // If it's an array, transform each element
      if (Array.isArray(response.data)) {
        response.data = response.data.map((item: any) => {
          if (item?._id) {
            const { _id, ...rest } = item
            return { ...rest, id: _id.toString() }
          }
          return item
        })
      }
      // If it's an object with _id, transform it
      else if (response.data._id) {
        const { _id, ...rest } = response.data
        response.data = { ...rest, id: _id.toString() }
      }
      // If it has a user object with _id
      else if (response.data.user?._id) {
        const { _id, ...userRest } = response.data.user
        response.data.user = { ...userRest, id: _id.toString() }
      }
    }
    return response
  },
  (error: AxiosError) => {
    // Get error message
    const errorData = error.response?.data
    let errorMessage = 'Unknown error'
    
    if (typeof errorData === 'object' && errorData !== null && 'error' in errorData) {
      errorMessage = String((errorData as any).error)
    } else if (error.message) {
      errorMessage = error.message
    }
    
    console.error('API Error:', {
      message: errorMessage,
      status: error.response?.status,
      url: error.config?.url,
    })
    
    // Ensure error has a readable message
    if (error.response?.data && typeof error.response.data === 'object') {
      const data = error.response.data as any
      if (data.error) {
        error.message = String(data.error)
      }
    } else {
      error.message = errorMessage
    }
    
    return Promise.reject(error)
  }
)

export default api
