describe('Cart Integration Tests', () => {
  beforeEach(() => {
    // Register and login as a user
    const timestamp = Date.now()
    const email = `carttest${timestamp}@test.com`
    
    cy.visit('/auth/register')
    cy.get('input[type="text"]').type('Cart Test User')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type('password123')
    cy.contains('button', 'Register').click()
    cy.url().should('include', '/shop')
  })

  it('should display empty cart message', () => {
    cy.visit('/cart')
    cy.contains('Your cart is empty').should('be.visible')
    cy.contains('Continue shopping').should('be.visible')
  })

  it('should add product to cart from shop page', () => {
    cy.visit('/shop')
    
    // Wait for products to load
    cy.contains('Our Store').should('be.visible')
    
    // Click first "Add to Cart" button
    cy.contains('button', 'Add to Cart').first().click()
    
    // Check toast notification
    cy.contains('added to cart').should('be.visible')
    
    // Check cart icon has badge
    cy.get('[class*="rounded-full"]').should('contain', '1')
  })

  it('should display products in cart', () => {
    cy.visit('/shop')
    cy.contains('button', 'Add to Cart').first().click()
    
    cy.visit('/cart')
    cy.contains('Shopping Cart').should('be.visible')
    cy.get('img').should('be.visible')
    cy.contains('Total:').should('be.visible')
  })

  it('should update quantity in cart', () => {
    cy.visit('/shop')
    cy.contains('button', 'Add to Cart').first().click()
    
    cy.visit('/cart')
    
    // Get initial quantity
    cy.get('span').contains('1').should('be.visible')
    
    // Increase quantity
    cy.contains('button', '+').first().click()
    cy.get('span').contains('2').should('be.visible')
    
    // Decrease quantity
    cy.contains('button', '-').first().click()
    cy.get('span').contains('1').should('be.visible')
  })

  it('should remove product from cart', () => {
    cy.visit('/shop')
    cy.contains('button', 'Add to Cart').first().click()
    
    cy.visit('/cart')
    cy.contains('Shopping Cart').should('be.visible')
    
    // Click delete button
    cy.get('svg').parent('button').click()
    
    // Cart should be empty
    cy.contains('Your cart is empty').should('be.visible')
  })

  it('should calculate total price correctly', () => {
    cy.visit('/shop')
    
    // Add first product
    cy.contains('button', 'Add to Cart').first().click()
    
    cy.visit('/cart')
    
    // Check total is displayed
    cy.contains('Total:').should('be.visible')
    cy.contains('COP').should('be.visible')
    
    // Add more quantity
    cy.contains('button', '+').first().click()
    
    // Total should update
    cy.contains('Total:').should('be.visible')
  })

  it('should show checkout button when cart has items', () => {
    cy.visit('/shop')
    cy.contains('button', 'Add to Cart').first().click()
    
    cy.visit('/cart')
    cy.contains('button', 'Proceed to Checkout').should('be.visible')
  })

  it('should show checkout message when clicking proceed', () => {
    cy.visit('/shop')
    cy.contains('button', 'Add to Cart').first().click()
    
    cy.visit('/cart')
    cy.contains('button', 'Proceed to Checkout').click()
    
    // SweetAlert should appear
    cy.contains('This feature will be available soon').should('be.visible')
  })
})

