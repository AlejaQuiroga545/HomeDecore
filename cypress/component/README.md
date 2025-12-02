# Cypress Component Testing

Tests unitarios para componentes de HomeDecor usando Cypress Component Testing.

## Estructura

- `Button.cy.tsx` - Tests para el componente Button
- `Input.cy.tsx` - Tests para el componente Input
- `ProductCard.cy.tsx` - Tests para el componente ProductCard
- `Pagination.cy.tsx` - Tests para el componente Pagination

## Ejecutar Tests

### Abrir Cypress en modo interactivo
```bash
npm run cypress:component:open
```

### Ejecutar todos los tests en modo headless
```bash
npm run cypress:component
```

## Componentes Testeados

### Button
- Renderizado con diferentes variantes (primary, secondary, outline)
- Renderizado con diferentes tamaños (sm, md, lg)
- Manejo de eventos click
- Estado disabled
- Aplicación de className personalizado

### Input
- Renderizado con label
- Diferentes tipos de input
- Manejo de cambios de valor
- Estado disabled y required
- Aplicación de className personalizado

### ProductCard
- Renderizado de información del producto
- Imagen del producto
- Botones de favorito y carrito
- Toggle de favoritos
- Agregar al carrito
- Links a página de detalle

### Pagination
- Renderizado de páginas
- Navegación entre páginas
- Estado disabled en primera/última página
- Resaltado de página actual

