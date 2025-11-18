describe('Register Page Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/register');
  });

  it('should display all input fields and the register button', () => {
    cy.get('input[placeholder="Your name"]').should('be.visible');
    cy.get('input[placeholder="your@email.com"]').should('be.visible');
    cy.get('input[placeholder="••••••••"]').should('be.visible');
    cy.contains('button', 'Register').should('be.visible');
  });

//   it('should show an error if fields are empty', () => {
//   cy.get('form').submit();
//   cy.contains('Please fill in all fields').should('exist').and('be.visible');
// });

  it('should show an error if password is too short', () => {
    const email = `test${Date.now()}@mail.com`;
    cy.get('input[placeholder="Your name"]').type('Test User');
    cy.get('input[placeholder="your@email.com"]').type(email);
    cy.get('input[placeholder="••••••••"]').type('123');
    cy.contains('button', 'Register').click();
    cy.contains('Password must be at least 6 characters').should('exist');
  });

  it('should register successfully with valid credentials', () => {
    const email = `test${Date.now()}@mail.com`;
    cy.get('input[placeholder="Your name"]').type('Test User');
    cy.get('input[placeholder="your@email.com"]').type(email);
    cy.get('input[placeholder="••••••••"]').type('password123');
    cy.contains('button', 'Register').click();

    // Esperamos redirección
    cy.url({ timeout: 10000 }).should('include', '/shop');
  });

//   // Test opcional si tienes lógica de usuarios existentes
// it('should show an error if email is already registered', () => {
//   const email = 'test@mail.com';

//   // Guardamos un usuario ya registrado en localStorage
//   cy.window().then((win) => {
//     win.localStorage.setItem(
//       'users',
//       JSON.stringify([{ name: 'Existing', email, password: 'password123' }])
//     );
//   });

//   cy.visit('/auth/register');

//   cy.get('input[placeholder="Your name"]').type('New User');
//   cy.get('input[placeholder="your@email.com"]').type(email);
//   cy.get('input[placeholder="••••••••"]').type('password123');

//   cy.contains('button', 'Register').click();

//   cy.url().should('include', '/auth/register');

//   cy.contains('This email is already registered', { timeout: 5000 })
//     .should('exist')
//     .and('be.visible');
// });

})