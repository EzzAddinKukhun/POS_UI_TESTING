describe('Login Test Suit', () => {
    beforeEach('Visit The POS Website', ()=>{
        cy.visit('http://localhost:3000/')
    })
    it('Login without enter username and password', ()=>{
        cy.contains('LogIn').click()
        cy.get('.reg_errorMessageBox__G4I4q').eq(0).should('be.visible').and('have.text', 'Username is Required!')
        cy.get('.reg_errorMessageBox__G4I4q').eq(1).should('be.visible').and('have.text', 'Password is Required!')
    })

    it('Login with username only', ()=>{
        cy.get(`input[name='username']`).type('ezz')
        cy.contains('LogIn').click()
        cy.get('.reg_errorMessageBox__G4I4q').eq(0).should('be.visible').and('have.text', 'Password is Required!')
    })

    it('Login with password only', ()=>{
        cy.get(`input[name='password']`).type('1234')
        cy.contains('LogIn').click()
        cy.get('.reg_errorMessageBox__G4I4q').eq(0).should('be.visible').and('have.text', 'Username is Required!')
    })

    it('Login with invalid password', ()=>{
        cy.get(`input[name='username']`).type('ezz')
        cy.get(`input[name='password']`).type('ezz1234')
        cy.contains('LogIn').click()
        cy.get(`div[class='swal-modal']`).contains('Password is Wrong!').should('be.visible')
    })

    it('Login with invalid username', ()=>{
        cy.get(`input[name='username']`).type('ezzzzz')
        cy.get(`input[name='password']`).type('ezz1234')
        cy.contains('LogIn').click()
        cy.get(`div[class='swal-modal']`).contains(`This account is doesn't exist!, Try to sure of enetered username..`).should('be.visible')
    })



})