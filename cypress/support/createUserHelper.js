import { faker } from '@faker-js/faker';
export function userCreation(user) {

    user.email = faker.internet.email();

    cy.log('**Opening registration form ...**');
    cy.get("button[aria-label='Close Welcome Banner']").click();
    cy.get("#navbarAccount").click();
    cy.get("button[id='navbarLoginButton'] span").click();
    cy.get(".primary-link[routerlink='/register']").click();

    cy.log('**Filling out the user registration form ...**');
    cy.get('#emailControl').type(user.email);
    cy.get('#passwordControl').type(user.password);
    cy.get('#repeatPasswordControl').type(user.password);
    cy.get('.mat-select-arrow-wrapper').click()
    cy.contains("Mother's maiden name?").click();
    cy.get("#securityAnswerControl").type(user.answer);
    cy.get("button[id='registerButton'] i[class='material-icons']").click();

    cy.log('**Successfull registration message verifying**');
    cy.url().should('match', /\/login/)
    cy.get("[id^='cdk-overlay-']")
        .should('be.visible')
        .then(($element) => {
            const elementId = $element.attr('id');
            expect(elementId).to.include('cdk-overlay-')
            cy.get($element).should('contain', 'Registration completed successfully. You can now log in.')
        });
}
