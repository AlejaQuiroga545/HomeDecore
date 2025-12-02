// Script para actualizar la contraseña del admin
// Ejecutar con: node scripts/update-admin-password.js

const fetch = require('node-fetch');

const updateAdminPassword = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/create-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@homedecor.com',
        password: 'xyz1507',
        update: true
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Contraseña actualizada exitosamente!');
      console.log('Usuario:', data.user);
    } else {
      console.error('❌ Error:', data.error);
    }
  } catch (error) {
    console.error('❌ Error al conectar:', error.message);
    console.log('Asegúrate de que el servidor esté corriendo en http://localhost:3000');
  }
};

updateAdminPassword();

