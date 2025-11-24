export type Language = 'es' | 'en'

// Helper function to translate categories
export const translateCategory = (category: string, language: Language): string => {
  const categoryMap: Record<string, { es: string; en: string }> = {
    'Furniture': { es: 'Muebles', en: 'Furniture' },
    'Lighting': { es: 'Iluminación', en: 'Lighting' },
    'Decor': { es: 'Decoración', en: 'Decor' },
  }
  return categoryMap[category]?.[language] || category
}

// Helper function to translate product names
export const translateProductName = (productName: string, language: Language): string => {
  const productNameMap: Record<string, { es: string; en: string }> = {
    'Modern Sofa Set': { es: 'Juego de Sofá Moderno', en: 'Modern Sofa Set' },
    'Wooden Coffee Table': { es: 'Mesa de Centro de Madera', en: 'Wooden Coffee Table' },
    'Decorative Floor Lamp': { es: 'Lámpara de Pie Decorativa', en: 'Decorative Floor Lamp' },
    'Velvet Armchair': { es: 'Sillón de Terciopelo', en: 'Velvet Armchair' },
    'Ceramic Vase Set': { es: 'Juego de Jarrones de Cerámica', en: 'Ceramic Vase Set' },
    'Woven Wall Hanging': { es: 'Tapiz Tejido para Pared', en: 'Woven Wall Hanging' },
    'Modern Dining Table': { es: 'Mesa de Comedor Moderna', en: 'Modern Dining Table' },
    'Pendant Light Fixture': { es: 'Lámpara Colgante', en: 'Pendant Light Fixture' },
  }
  return productNameMap[productName]?.[language] || productName
}

// Helper function to get searchable text in both languages
export const getSearchableText = (productName: string): { en: string; es: string } => {
  const enName = translateProductName(productName, 'en')
  const esName = translateProductName(productName, 'es')
  return { en: enName.toLowerCase(), es: esName.toLowerCase() }
}

export const translations = {
  es: {
    // Navbar
    navbar: {
      home: 'Inicio',
      shop: 'Tienda',
      about: 'Nosotros',
      contact: 'Contacto',
      profile: 'Perfil',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      searchPlaceholder: 'Buscar productos...',
    },
    // Hero Section
    hero: {
      title: 'Lleva luz, comodidad y estilo',
      titleHighlight: 'a cada habitación',
      description: 'Descubre nuestra colección curada de muebles modernos y accesorios diseñados para transformar tus espacios en refugios de comodidad y estilo.',
      shopNow: 'Comprar ahora',
      exploreCollection: 'Explorar colección',
    },
    // Home Page
    home: {
      featuredProducts: 'Productos destacados',
      featuredDescription: 'Descubre nuestra selección de los muebles y accesorios más populares',
    },
    // Shop Page
    shop: {
      title: 'Nuestra tienda',
      description: 'Explora nuestra colección completa de productos',
      searchPlaceholder: 'Buscar productos...',
      all: 'Todos',
    },
    // About Page
    about: {
      title: 'Nosotros',
      subtitle: 'Descubre nuestra historia',
      mission: 'Nuestra misión',
      missionText: 'En HomeDecor, creemos que cada hogar merece ser un santuario de comodidad y estilo. Nos especializamos en ofrecer muebles y accesorios de decoración cuidadosamente seleccionados que transforman espacios ordinarios en ambientes extraordinarios.',
      whatWeDo: 'Qué hacemos',
      qualityMaterials: 'Materiales de calidad',
      qualityMaterialsText: 'Nuestra misión es ayudarte a crear espacios que reflejen tu personalidad y te hagan sentir como en casa. Trabajamos con materiales de calidad y diseños modernos que combinan funcionalidad con estética.',
      curatedCollection: 'Colección curada',
      curatedCollectionText: 'Desde sofás cómodos hasta lámparas elegantes, cada producto en nuestra colección ha sido elegido pensando en tu bienestar y la creación de ambientes cálidos y acogedores.',
    },
    // Contact Page
    contact: {
      title: 'Contáctanos',
      subtitle: 'Ponte en contacto con nuestro equipo',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.com',
      message: 'Mensaje',
      messagePlaceholder: 'Tu mensaje...',
      sendMessage: 'Enviar mensaje',
      contactInfo: 'Información de contacto',
      emailLabel: 'Correo electrónico',
      phoneLabel: 'Teléfono',
      addressLabel: 'Dirección',
      address: 'Calle 19 # 53-50, Medellín - Colombia',
      helpText: '¡Estamos aquí para ayudar! Envíanos un mensaje y te responderemos lo antes posible.',
      successMessage: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
      emailSentTitle: '¡Mensaje enviado!',
      emailSentText: 'Tu mensaje ha sido enviado correctamente. El equipo de HomeDecor se comunicará contigo próximamente.',
      emailError: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
      sending: 'Enviando...',
    },
    // Footer
    footer: {
      description: 'Llevando luz, comodidad y estilo a cada habitación de tu hogar.',
      quickLinks: 'Enlaces rápidos',
      customerService: 'Atención al cliente',
      shippingInfo: 'Información de envío',
      returns: 'Devoluciones',
      faq: 'Preguntas frecuentes',
      contact: 'Contacto',
      copyright: '© 2025 HomeDecor. Todos los derechos reservados.',
    },
    // Cart
    cart: {
      title: 'Carrito de compras',
      empty: 'Tu carrito está vacío',
      continueShopping: 'Continuar comprando',
      total: 'Total:',
      proceedToCheckout: 'Proceder al pago',
      addedToCart: 'añadido al carrito',
    },
    // Product
    product: {
      addToCart: 'Añadir al carrito',
      category: 'Categoría:',
      notFound: 'Producto no encontrado',
      notFoundDescription: 'El producto que buscas no existe o ha sido eliminado.',
      backToShop: 'Volver a la tienda',
      loading: 'Cargando...',
    },
    // Pagination
    pagination: {
      previous: 'Anterior',
      next: 'Siguiente',
    },
    // Cart Summary
    cartSummary: {
      empty: 'Tu carrito está vacío',
      continueShopping: 'Continuar comprando',
      total: 'Total:',
    },
    // Checkout
    checkout: {
      comingSoon: '🚧 ¡Esta función estará disponible pronto!',
      comingSoonText: 'La pasarela de pago estará disponible en breve',
      gotIt: 'Entendido',
    },
    // Auth - Login
    login: {
      title: 'Iniciar sesión',
      welcome: 'Bienvenido a HomeDecor',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.com',
      password: 'Contraseña',
      passwordPlaceholder: '••••••••',
      signIn: 'Iniciar sesión',
      signingIn: 'Iniciando sesión...',
      orContinueWith: 'O continúa con',
      signInWithGoogle: 'Iniciar sesión con Google',
      noAccount: '¿No tienes una cuenta?',
      registerHere: 'Regístrate aquí',
      fillAllFields: 'Por favor completa todos los campos',
      incorrectCredentials: 'Correo o contraseña incorrectos. Si eres el administrador, asegúrate de que el usuario administrador exista en la base de datos.',
      errorOccurred: 'Ocurrió un error. Por favor intenta de nuevo.',
      loginSuccessful: 'Inicio de sesión exitoso',
      googleSignInFailed: 'Error al iniciar sesión con Google',
    },
    // Auth - Register
    register: {
      title: 'Crear cuenta',
      joinUs: 'Únete hoy',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.com',
      password: 'Contraseña',
      passwordPlaceholder: '••••••••',
      register: 'Registrarse',
      registering: 'Registrando...',
      orContinueWith: 'O continúa con',
      signUpWithGoogle: 'Registrarse con Google',
      haveAccount: '¿Ya tienes una cuenta?',
      signInHere: 'Inicia sesión aquí',
      fillAllFields: 'Por favor completa todos los campos',
      passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
      emailAlreadyRegistered: 'Este correo ya está registrado',
      errorOccurred: 'Ocurrió un error. Por favor intenta de nuevo.',
      registrationSuccessful: 'Registro exitoso',
      googleSignInFailed: 'Error al iniciar sesión con Google',
    },
    // Profile
    profile: {
      title: 'Mi perfil',
      profileInformation: 'Información del perfil',
      editProfile: 'Editar perfil',
      name: 'Nombre',
      email: 'Correo electrónico',
      avatarUrl: 'URL del avatar',
      avatarUrlPlaceholder: 'https://ejemplo.com/avatar.jpg',
      saveChanges: 'Guardar cambios',
      cancel: 'Cancelar',
      logOut: 'Cerrar sesión',
      logoutConfirm: '¿Cerrar sesión?',
      logoutConfirmText: '¿Estás seguro de que deseas cerrar sesión?',
      yesLogOut: 'Sí, cerrar sesión',
      nameRequired: 'El nombre es requerido',
      profileUpdated: 'Perfil actualizado exitosamente',
      errorUpdating: 'Error al actualizar el perfil',
      loading: 'Cargando...',
    },
    // Dashboard
    dashboard: {
      title: 'Panel de control',
      products: 'Productos',
      addProduct: 'Agregar producto',
      settings: 'Configuración',
      searchPlaceholder: 'Buscar productos...',
      all: 'Todos',
      image: 'Imagen',
      name: 'Nombre',
      category: 'Categoría',
      price: 'Precio',
      stock: 'Stock',
      actions: 'Acciones',
      edit: 'Editar',
      delete: 'Eliminar',
      noProductsFound: 'No se encontraron productos.',
      deleteConfirm: '¿Estás seguro?',
      deleteConfirmText: '¿Deseas eliminar',
      yesDelete: 'Sí, eliminar',
      productDeleted: 'Producto eliminado exitosamente',
      deleteFailed: 'Error al eliminar producto',
      productUpdated: 'Producto actualizado exitosamente',
      productAdded: 'Producto agregado exitosamente',
      saveFailed: 'Error al guardar producto',
      settingsComingSoon: 'Panel de configuración próximamente.',
    },
    // Product Modal
    productModal: {
      editProduct: 'Editar producto',
      addNewProduct: 'Agregar nuevo producto',
      name: 'Nombre',
      category: 'Categoría',
      description: 'Descripción',
      price: 'Precio (COP)',
      stock: 'Stock',
      image: 'Imagen',
      selectedFile: 'Archivo seleccionado:',
      update: 'Actualizar',
      add: 'Agregar',
      cancel: 'Cancelar',
      uploading: 'Subiendo...',
      fillRequiredFields: 'Por favor completa todos los campos requeridos',
      selectImage: 'Debes seleccionar una imagen',
      errorSaving: 'Error al guardar producto',
    },
    // Categories
    categories: {
      furniture: 'Muebles',
      lighting: 'Iluminación',
      decor: 'Decoración',
    },
    // Common
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
    },
  },
  en: {
    // Navbar
    navbar: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      searchPlaceholder: 'Search products...',
    },
    // Hero Section
    hero: {
      title: 'Bring light, comfort, and style',
      titleHighlight: 'to every room',
      description: 'Discover our curated collection of modern furniture and accessories designed to transform your living spaces into havens of comfort and style.',
      shopNow: 'Shop now',
      exploreCollection: 'Explore collection',
    },
    // Home Page
    home: {
      featuredProducts: 'Featured products',
      featuredDescription: 'Discover our selection of the most popular furniture and accessories',
    },
    // Shop Page
    shop: {
      title: 'Our store',
      description: 'Explore our complete collection of products',
      searchPlaceholder: 'Search products...',
      all: 'All',
    },
    // About Page
    about: {
      title: 'About us',
      subtitle: 'Discover our story',
      mission: 'Our mission',
      missionText: 'At HomeDecor, we believe every home deserves to be a sanctuary of comfort and style. We specialize in offering carefully selected furniture and decor accessories that transform ordinary spaces into extraordinary environments.',
      whatWeDo: 'What we do',
      qualityMaterials: 'Quality materials',
      qualityMaterialsText: 'Our mission is to help you create spaces that reflect your personality and make you feel at home. We work with quality materials and modern designs that combine functionality with aesthetics.',
      curatedCollection: 'Curated collection',
      curatedCollectionText: 'From comfortable sofas to elegant lamps, every product in our collection has been chosen with your well-being in mind and the creation of warm and welcoming environments.',
    },
    // Contact Page
    contact: {
      title: 'Contact us',
      subtitle: 'Get in touch with our team',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      sendMessage: 'Send message',
      contactInfo: 'Contact information',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      address: '19th street # 53 -50, Medellín - Colombia',
      helpText: "We're here to help! Send us a message and we'll get back to you as soon as possible.",
      successMessage: 'Message sent successfully. We will contact you soon.',
      emailSentTitle: 'Message sent!',
      emailSentText: 'Your message has been sent successfully. The HomeDecor team will contact you soon.',
      emailError: 'Error sending message. Please try again.',
      sending: 'Sending...',
    },
    // Footer
    footer: {
      description: 'Bringing light, comfort, and style to every room in your home.',
      quickLinks: 'Quick links',
      customerService: 'Customer service',
      shippingInfo: 'Shipping info',
      returns: 'Returns',
      faq: 'FAQ',
      contact: 'Contact',
      copyright: '© 2025 HomeDecor. All rights reserved.',
    },
    // Cart
    cart: {
      title: 'Shopping cart',
      empty: 'Your cart is empty',
      continueShopping: 'Continue shopping',
      total: 'Total:',
      proceedToCheckout: 'Proceed to checkout',
      addedToCart: 'added to cart',
    },
    // Product
    product: {
      addToCart: 'Add to cart',
      category: 'Category:',
      notFound: 'Product not found',
      notFoundDescription: "The product you're looking for doesn't exist or has been removed.",
      backToShop: 'Back to shop',
      loading: 'Loading...',
    },
    // Pagination
    pagination: {
      previous: 'Previous',
      next: 'Next',
    },
    // Cart Summary
    cartSummary: {
      empty: 'Your cart is empty',
      continueShopping: 'Continue shopping',
      total: 'Total:',
    },
    // Checkout
    checkout: {
      comingSoon: '🚧 This feature will be available soon!',
      comingSoonText: 'Payment gateway will be available shortly',
      gotIt: 'Got it',
    },
    // Auth - Login
    login: {
      title: 'Sign in',
      welcome: 'Welcome to HomeDecor',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      signIn: 'Sign in',
      signingIn: 'Signing in...',
      orContinueWith: 'Or continue with',
      signInWithGoogle: 'Sign in with Google',
      noAccount: "Don't have an account?",
      registerHere: 'Register here',
      fillAllFields: 'Please fill in all fields',
      incorrectCredentials: 'Incorrect email or password. If you are the admin, make sure the admin user exists in the database.',
      errorOccurred: 'An error occurred. Please try again.',
      loginSuccessful: 'Login successful',
      googleSignInFailed: 'Failed to sign in with Google',
    },
    // Auth - Register
    register: {
      title: 'Create account',
      joinUs: 'Join us today',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: '••••••••',
      register: 'Register',
      registering: 'Registering...',
      orContinueWith: 'Or continue with',
      signUpWithGoogle: 'Sign up with Google',
      haveAccount: 'Already have an account?',
      signInHere: 'Sign in here',
      fillAllFields: 'Please fill in all fields',
      passwordMinLength: 'Password must be at least 6 characters',
      emailAlreadyRegistered: 'This email is already registered',
      errorOccurred: 'An error occurred. Please try again.',
      registrationSuccessful: 'Registration successful',
      googleSignInFailed: 'Failed to sign in with Google',
    },
    // Profile
    profile: {
      title: 'My profile',
      profileInformation: 'Profile information',
      editProfile: 'Edit profile',
      name: 'Name',
      email: 'Email',
      avatarUrl: 'Avatar URL',
      avatarUrlPlaceholder: 'https://example.com/avatar.jpg',
      saveChanges: 'Save changes',
      cancel: 'Cancel',
      logOut: 'Log out',
      logoutConfirm: 'Log out?',
      logoutConfirmText: 'Are you sure you want to log out?',
      yesLogOut: 'Yes, log out',
      nameRequired: 'Name is required',
      profileUpdated: 'Profile updated successfully',
      errorUpdating: 'Error updating profile',
      loading: 'Loading...',
    },
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      products: 'Products',
      addProduct: 'Add product',
      settings: 'Settings',
      searchPlaceholder: 'Search products...',
      all: 'All',
      image: 'Image',
      name: 'Name',
      category: 'Category',
      price: 'Price',
      stock: 'Stock',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      noProductsFound: 'No products found.',
      deleteConfirm: 'Are you sure?',
      deleteConfirmText: 'Do you want to delete',
      yesDelete: 'Yes, delete',
      productDeleted: 'Product deleted successfully',
      deleteFailed: 'Failed to delete product',
      productUpdated: 'Product updated successfully',
      productAdded: 'Product added successfully',
      saveFailed: 'Failed to save product',
      settingsComingSoon: 'Settings panel coming soon.',
    },
    // Product Modal
    productModal: {
      editProduct: 'Edit Product',
      addNewProduct: 'Add new product',
      name: 'Name',
      category: 'Category',
      description: 'Description',
      price: 'Price (COP)',
      stock: 'Stock',
      image: 'Image',
      selectedFile: 'Selected file:',
      update: 'Update',
      add: 'Add',
      cancel: 'Cancel',
      uploading: 'Uploading...',
      fillRequiredFields: 'Please fill in all required fields',
      selectImage: 'You must select an image',
      errorSaving: 'Error saving product',
    },
    // Categories
    categories: {
      furniture: 'Furniture',
      lighting: 'Lighting',
      decor: 'Decor',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
    },
  },
}