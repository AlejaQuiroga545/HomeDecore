# HomeDecor - Ecommerce Moderno

Un ecommerce completo y moderno construido con Next.js 16 (App Router), React, TypeScript y Tailwind CSS.

## Características

- 🏠 **Página Principal**: Hero section con productos destacados
- 🛍️ **Tienda**: Grid de productos con búsqueda, filtros por categoría y paginación
- 📦 **Detalle de Producto**: Vista detallada con información completa
- 🛒 **Carrito de Compras**: Gestión completa con localStorage
- 👤 **Autenticación**: Login y registro (simulado)
- 🔧 **Panel de Administración**: CRUD completo de productos
- 📱 **Diseño Responsive**: Optimizado para desktop, tablet y móvil

## Tecnologías

- **Next.js 16** con App Router
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **React Toastify** para notificaciones
- **SweetAlert2** para confirmaciones
- **Heroicons** para iconos

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Credenciales de Administrador

- **Email**: admin@store.com
- **Password**: adminpass

## Estructura del Proyecto

```
├── app/                    # Páginas y rutas (App Router)
│   ├── page.tsx           # Página principal
│   ├── shop/              # Página de tienda
│   ├── product/[id]/      # Detalle de producto
│   ├── cart/              # Carrito de compras
│   ├── auth/              # Login y registro
│   ├── admin/             # Panel de administración
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
├── context/               # Context API (Carrito, Productos, Auth)
├── data/                  # Datos estáticos (productos.json)
└── public/                # Archivos estáticos
```

## Funcionalidades

### Carrito
- Añadir productos al carrito
- Actualizar cantidades
- Eliminar productos
- Persistencia en localStorage
- Cálculo automático del total

### Administración
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos con confirmación
- Persistencia en localStorage

### Búsqueda y Filtros
- Búsqueda por nombre o descripción
- Filtrado por categoría
- Paginación (6 productos por página)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Diseño

El diseño está inspirado en sitios de decoración e interiores, con:
- Colores cálidos (beige, marrones suaves)
- Tipografía Poppins
- Sombras suaves y bordes redondeados
- Transiciones suaves en hovers
- Diseño completamente responsive

## Notas

- La autenticación es simulada (sin backend real)
- Los productos se almacenan en localStorage
- El carrito persiste entre sesiones
- Las imágenes se obtienen de Unsplash

