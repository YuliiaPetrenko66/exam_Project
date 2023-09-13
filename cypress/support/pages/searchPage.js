class SearchPage {

    visit() {
        cy.visit('/search');
    }


    getAddToBasketButton() {
        return cy.get(".mat-grid-list button .mat-button-wrapper");
    }


    getSearchField() {
        return cy.get('.mat-search_icon-search');
    }
}  
export default new SearchPage();