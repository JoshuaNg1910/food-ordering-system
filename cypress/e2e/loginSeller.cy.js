describe('Login Seller Page', () => {
    beforeEach(() => {
      // Visit the login page or route where your login form is located
      cy.visit('/seller/login');
    });
  
    it('should display the login form', () =>{
      cy.getByTestId('login-form').should('be.visible');
    })
  
    it('submit the form with invalid credentials', () => {
      cy.get('input[id=username]').type('johndoe_seller');
      cy.get('input[id=password]').type('j1234');
      cy.getByTestId('signin').click();  
      cy.url().should('include', '/login');
    })
  
    it('submit the form with valid credentials', () => {
      cy.intercept('POST', '/api/auth/login').as('sellerlogin');
      cy.wait(500);
      cy.get('input[id=username]').type('johndoe_seller');
      cy.get('input[id=password]').type('johndoe_seller');
      cy.getByTestId('signin').click();
      cy.wait('@sellerlogin', { requestTimeout: 20000 });
      cy.wait(500);
      cy.url().should('include', '/otp-verification');
    })
  
  });