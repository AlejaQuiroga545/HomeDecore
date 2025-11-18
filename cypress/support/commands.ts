/// <reference types="cypress" />

// Declaración de tipos para comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para llenar formulario de registro
       */
      fillRegistrationForm(userData: {
        cc: string;
        name: string;
        tel: string;
        email: string;
        password: string;
      }): Chainable<void>;
      
      /**
       * Comando personalizado para generar usuario único
       */
      generateUniqueUser(): Chainable<{
        cc: string;
        name: string;
        tel: string;
        email: string;
        password: string;
      }>;
    }
  }
}

// Comando para llenar formulario de registro
Cypress.Commands.add('fillRegistrationForm', (userData) => {
  cy.get('input[name="cc"]').type(userData.cc);
  cy.get('input[name="name"]').type(userData.name);
  cy.get('input[name="tel"]').type(userData.tel);
  cy.get('input[name="email"]').type(userData.email);
  cy.get('input[name="pass"]').type(userData.password);
  cy.get('input[name="confirmPass"]').type(userData.password);
});

// Comando para generar usuario único
Cypress.Commands.add('generateUniqueUser', () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  
  return cy.wrap({
    cc: `${timestamp}${randomNum}`.slice(-10),
    name: `Usuario Test ${randomNum}`,
    tel: `300${randomNum}${timestamp}`.slice(-10),
    email: `test${timestamp}${randomNum}@example.com`,
    password: 'TestPassword123!'
  });
});