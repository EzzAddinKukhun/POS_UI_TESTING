let img: HTMLImageElement; 
import { logInObj } from "../../pages/LogIn";
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
        logInObj.getUsernameElement().type('ezz')
        logInObj.getSubmitBtnElement().click()
        logInObj.getErrorMessageBoxElement().eq(0).should('be.visible').and('have.text', 'Password is Required!')
    })

    it('Login with password only', ()=>{
        cy.get(`input[name='password']`).type('1234')
        cy.contains('LogIn').click()
        cy.get('.reg_errorMessageBox__G4I4q').eq(0).should('be.visible').and('have.text', 'Username is Required!')
    })

    it('Login with invalid password', ()=>{
        logInObj.submitLogIn('ezz', 'ezz1234')
        cy.get(`div[class='swal-modal']`).contains('Password is Wrong!').should('be.visible')
    })

    it('Login with invalid username', ()=>{
        logInObj.submitLogIn('ezzkukhun', 'ezz1234')
        cy.get(`div[class='swal-modal']`).contains(`This account is doesn't exist!, Try to sure of enetered username..`).should('be.visible')
    })

    it('LogIn with valid username and password', ()=>{
        logInObj.submitLogIn('ezz', '1234')
        cy.url().then(url => {
            expect(url).to.be.equal('http://localhost:3000/')
        })
    })

    it('Sign Up with registered username', ()=>{
        cy.contains('a', 'Sign Up').click()
        cy.get('.react-reveal').eq(1).find('input').its('length').should('be.eq', 4)
        cy.get(`input[name='fullName']`).type('Ezz Kukhun')
        cy.get(`input[name='userName']`).type('ezz')
        cy.get(`input[name='password']`).type('1234')
        cy.get(`input[name='passwordConfirmation']`).type('1234')
        cy.get(`button[type='submit']`).click()
        cy.contains(`This account is already exist!, Try to use another username..`).should('be.visible')
        cy.get('.swal-button').click()
    })

    it('Sign Up with non identical password', ()=>{
        cy.contains('a', 'Sign Up').click()
        cy.get('.react-reveal').eq(1).find('input').its('length').should('be.eq', 4)
        cy.get(`input[name='fullName']`).type('Ezz Kukhun')
        cy.get(`input[name='userName']`).type('QA Engineer')
        cy.get(`input[name='password']`).type('1234')
        cy.get(`input[name='passwordConfirmation']`).type('123')
        cy.get('.reg_errorMessageBox__G4I4q').eq(1).should('have.text', 'Two Passwords are not identical!')
    })

    it('Logo Test', ()=>{
        cy.get('.reg_logo__-YJ0F').should('be.visible').and(($img) => {
            img = $img[0] as HTMLImageElement
            expect(img.naturalWidth).to.be.greaterThan(0)
        })
    })
    



})