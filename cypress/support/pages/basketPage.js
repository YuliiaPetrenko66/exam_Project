class BasketPage {

    visit() {
        cy.visit('/basket');
    }


    getShowBasketButton() {
        return cy.get("button[aria-label='Show the shopping cart']");
    }


    userDataVerifying() {
        return cy.get(".mat-card.mat-focus-indicator.mat-elevation-z6");
    }


    getBasketProduct() {
        return cy.get(".cdk-column-product");
    }


    getCheckoutButton() {
        return cy.get("#checkoutButton");
    }


    getAddNewAddress() {
        return cy.get("button[aria-label='Add a new address'] span[class='mat-button-wrapper']");
    }


    getCountryField() {
        return cy.get('#mat-input-1');
    }


    getNameField() {
        return cy.get('#mat-input-2');
    }

    getPhoneNumberField() {
        return cy.get('#mat-input-3');
    }


    getZipCodeField() {
        return cy.get('#mat-input-4');
    }
    getAddressField() {
        return cy.get('#address');
    }


    getCityField() {
        return cy.get('#mat-input-6');
    }


    getRegionField() {
        return cy.get('#mat-input-7');
    }


    getSubmitButton() {
        return cy.get('#submitButton');
    }
    

    getSuccessMessage() {
        return cy.get("[id^='cdk-overlay-']");
    }
    

    getAddressSelecting() {
        return cy.get('.mat-radio-inner-circle');
    }


    getNextButton1() {
        return cy.get(".btn-next");
    }


    getNextButton2() {
        return cy.get(".nextButton");
    }

    getDeliveryMethod() {
        return cy.get("button[aria-label='Proceed to delivery method selection'] span[class='mat-button-wrapper'] span");
    }

    getRadioButton() {
        return cy.get('.mat-radio-inner-circle');
    }

    getPaymentForm() {
        return cy.get('#mat-expansion-panel-header-0');
    }
    getUserName() {
        return cy.get('#mat-input-8');
    }

    getCardNumber() {
        return cy.get('#mat-input-9');
    }


    getMonthCard() {
        return cy.get('#mat-input-10');
    }


    getYearCard() {
        return cy.get('#mat-input-11');
    }


    getSubmitPaymentButton() {
        return cy.get("#submitButton");
    }

    getRadioPaymentButton() {
        return cy.get('.mat-radio-inner-circle');
    }


    getCheckoutButton() {
        return cy.get("#checkoutButton");
    }


    getPurchaseMessage() {
        return cy.get( '[fxflex="60%"]');
    }
   
}  
export default new BasketPage();
