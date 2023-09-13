class HomePage {
    visit() {
        cy.visit('/');
    }


    getAccountButton() {
        return cy.get('#navbarAccount');
    }
    

    getAccountLoginButton() {
        return cy.get("button[id='navbarLoginButton'] span");
    }


    getAddToCartQuickButton() {
        return cy.get('.quick_basket');
    }


    getSearchField() {
        return  cy.get('input#filter_keyword')
    }
    

    getOrdersPaymentMenu() {
        return  cy.get("button[aria-label='Show Orders and Payment Menu'] span")
    }
}
export default new HomePage();