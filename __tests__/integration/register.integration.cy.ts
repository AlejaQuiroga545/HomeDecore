describe('Register Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/register')
  })

  it('should display registration form', () => {
    cy.contains('Create Account').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', 'Register').should('be.visible')
  })

  it('should show error for empty fields', () => {
    cy.contains('button', 'Register').click()
    cy.contains('Please fill in all fields').should('be.visible')
  })

  it('should show error for short password', () => {
    cy.get('input[type="text"]').type('Test User')
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('12345')
    cy.contains('button', 'Register').click()
    cy.contains('Password must be at least 6 characters').should('be.visible')
  })

  it('should register successfully with valid data', () => {
    const timestamp = Date.now()
    const email = `test${timestamp}@test.com`
    
    cy.get('input[type="text"]').type('Test User')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Register').click()
    
    cy.url().should('include', '/shop')
    cy.contains('Profile').should('be.visible')
  })

  it('should show error for duplicate email', () => {
    const email = 'duplicate@test.com'
    
    // Register first time
    cy.get('input[type="text"]').type('Test User 1')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Register').click()
    cy.url().should('include', '/shop')
    
    // Try to register again with same email
    cy.visit('/auth/register')
    cy.get('input[type="text"]').type('Test User 2')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Register').click()
    cy.contains('This email is already registered').should('be.visible')
  })

  it('should navigate to login page', () => {
    cy.contains('Sign in here').click()
    cy.url().should('include', '/auth/login')
    cy.contains('Sign In').should('be.visible')
  })
})

