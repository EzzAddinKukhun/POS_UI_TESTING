class LogIn {
    private username: string = `input[name='username']`;
    private password: string = `input[name='password']`;
    private logInBtn: string = `LogIn`;
    private errorMessage: string = `.reg_errorMessageBox__G4I4q`

    public getUsernameElement(): Cypress.Chainable {
        return cy.get(this.username)
    }
    public getPasswordElement(): Cypress.Chainable {
        return cy.get(this.username)
    }
    public getSubmitBtnElement(): Cypress.Chainable {
        return cy.contains(this.logInBtn)
    }
    public getErrorMessageBoxElement(): Cypress.Chainable {
        return cy.get('.reg_errorMessageBox__G4I4q')
    }

    public submitLogIn(username: string, password: string): void{
        cy.get(this.username).type(username)
        cy.get(this.password).type(password)
        cy.contains(this.logInBtn).click()
    }
}

export const logInObj = new LogIn(); 