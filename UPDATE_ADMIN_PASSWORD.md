# Actualizar Contraseña de Admin

Para actualizar la contraseña del admin en la base de datos, puedes usar el endpoint `/api/auth/create-admin`.

## Método 1: Usando cURL (Terminal)

```bash
curl -X POST http://localhost:3000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@homedecor.com",
    "password": "xyz1507",
    "update": true
  }'
```

## Método 2: Usando el navegador (JavaScript Console)

Abre la consola del navegador (F12) y ejecuta:

```javascript
fetch('/api/auth/create-admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'admin@homedecor.com',
    password: 'xyz1507',
    update: true
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err))
```

## Método 3: Usando Postman o similar

1. Método: POST
2. URL: `http://localhost:3000/api/auth/create-admin`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "admin@homedecor.com",
  "password": "xyz1507",
  "update": true
}
```

## Nota Importante

- El parámetro `update: true` es **obligatorio** para actualizar una contraseña que ya está hasheada en la base de datos
- La contraseña se hasheará automáticamente antes de guardarse
- El email debe coincidir exactamente con el que está en la base de datos

