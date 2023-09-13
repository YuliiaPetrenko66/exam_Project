export function messageRegistrationHelper() {
    cy.url().should('match', /\/login/)
    cy.get("[id^='cdk-overlay-']")
        .should('be.visible')
        .then(($element) => {
            const elementId = $element.attr('id');
            expect(elementId).to.include('cdk-overlay-')
            cy.get($element).should('contain', 'Registration completed successfully. You can now log in.')
        });
}

export function messageFeedbackHelper() {
    cy.get("[id^='cdk-overlay-']")
        .should('be.visible')
        .invoke('attr', 'id')
        .should('include', 'cdk-overlay-')
        .then((elementId) => {
            expect(elementId).to.include('cdk-overlay-');
        });

    cy.get("[id^='cdk-overlay-']").should('contain', 'Thank you for your feedback.');
}


export function messageProductPlaced() {
    cy.get("[id^='cdk-overlay-']")
        .should('be.visible')
        .invoke('attr', 'id')
        .should('include', 'cdk-overlay-')
        .then((elementId) => {
            expect(elementId).to.include('cdk-overlay-');
        });
    cy.get("[id^='cdk-overlay-']").should('contain', 'Placed Apple Juice (1000ml) into basket.');
}