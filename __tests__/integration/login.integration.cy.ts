describe('Login Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
  })

  it('should display login form', () => {
    cy.contains('Sign In').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', 'Sign In').should('be.visible')
  })

  it('should show error for empty fields', () => {
    cy.contains('button', 'Sign In').click()
    cy.contains('Please fill in all fields').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').type('wrong@email.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.contains('button', 'Sign In').click()
    cy.contains('Incorrect email or password').should('be.visible')
  })

  it('should login successfully as normal user', () => {
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('password123')
    
    // First register the user
    cy.visit('/auth/register')
    cy.get('input[type="text"]').type('Test User')
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Register').click()
    
    // Wait for redirect and then login
    cy.url().should('include', '/shop')
    cy.visit('/auth/login')
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Sign In').click()
    
    cy.url().should('include', '/shop')
    cy.contains('Profile').should('be.visible')
  })

  it('should login successfully as admin and redirect to dashboard', () => {
    cy.get('input[type="email"]').type('admin@admin.com')
    cy.get('input[type="password"]').type('admin123')
    cy.contains('button', 'Sign In').click()
    
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Products').should('be.visible')
  })
})

