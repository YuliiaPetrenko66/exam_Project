class ContactPage {

    visit() {
        cy.visit('#/contact');
    }


    getComment() {
        return cy.get('#comment');
    }
    

    getRating() {
        return cy.get('.mat-slider-thumb-label-text');
    }

    
    getSubmitButton() {
        return cy.get('#submitButton');
    }
}

    
export default new ContactPage();