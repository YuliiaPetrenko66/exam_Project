class RegisterPage {

    visit() {
        cy.visit('/register')
    }


    getNotYetCustomerLink() {
        return cy.get(".primary-link[routerlink='/register']");
    }


    getEmail() {
        return cy.get('#emailControl');
    }


    getPassword() {
        return cy.get('#passwordControl');
    }


    getPasswordConfirm() {
        return cy.get('#repeatPasswordControl');
    }


    getSecurityQuestion() {
        return cy.get('.mat-select-arrow-wrapper');
    }


    getSecurityAnswer() {
        return cy.get("#securityAnswerControl");
    }


    getRegisterButton() {
        return cy.get("button[id='registerButton'] i[class='material-icons']");
    }


    selectSecurityQuestion(question) {
        cy.contains(question).click();
    }


    getErrorEmail() {
        return cy.get('.error');
    }

    
    getErrorPassword() {
        return cy.get('#mat-error-10');
    }


    getErrorPasswordLength() {
        return cy.get('#mat-error-9');
    }
}
export default new RegisterPage();
