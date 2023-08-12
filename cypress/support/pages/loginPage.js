class LoginPage {

    visit() {
        cy.visit('#/login')
    }


    getLoginButton() {
        return cy.get("button[id='loginButton'] span[class='mat-button-wrapper']");
    }


    getLoginButton1() {
        return cy.get('#navbarLoginButton');
    }

    getAccountButton() {
        return cy.get("button[id='navbarAccount'] span[class='mat-button-wrapper'] span");
    }


    getEmail() {
        return cy.get("#email");
    }


    getPassword() {
        return cy.get("#password");
    }

    
    getUrlMatchesPattern(pattern) {
        cy.url().should('match', pattern);
    }


    getErrorEmailPassword() {
        return cy.get('.error.ng-star-inserted');
    }
}
export default new LoginPage();
