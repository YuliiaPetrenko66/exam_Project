export function findProductByName(productName) {
    cy.get('.mat-grid-list').then(body => {
        const matchingItem = body.find('.item-name:contains("' + productName + '")');
        if (matchingItem.length > 0) {
            const itemContainer = matchingItem.closest('.mat-grid-tile.ng-star-inserted');
            cy.wrap(itemContainer).should('exist').within(() => {
                cy.get('button[aria-label="Add to Basket"]').click();
            });
        } else {
            cy.get(".mat-paginator-navigation-next").click({ force: true });
            findProductByName(productName);
        }
    });
}


export function proceedToCheckout(user, productName) {
    let cityUser;
    cityUser = user.city

    cy.log('Open basket')
    cy.visit('/basket');
    cy.get("button[aria-label='Show the shopping cart']").click();

    cy.log('Basket data verifying')
    cy.get(".mat-card.mat-focus-indicator.mat-elevation-z6").should('contain', user.email)

    cy.log('Confirm order')
    cy.get("#checkoutButton").click();
    cy.get("button[aria-label='Add a new address'] span[class='mat-button-wrapper']").click();


    cy.log('**Fill in "Add New Address" form ...**');
    cy.get('#mat-input-1').type(user.country);
    cy.get('#mat-input-2').type(user.firstName);
    cy.get('#mat-input-3').type(user.phoneNumber);
    cy.get('#mat-input-4').type(user.zipCode);
    cy.get('#address').type(user.address);
    cy.get('#mat-input-6').type(user.city);
    cy.get('#mat-input-7').type(user.region);
    cy.get('#submitButton').click()

    cy.log('**Success message verifying**');
    cy.get("[id^='cdk-overlay-']")
        .should('be.visible')
        .then(($element) => {
            const elementId = $element.attr('id');
            expect(elementId).to.include('cdk-overlay-')
            cy.get($element).should('contain', `The address at ${cityUser} has been successfully added to your addresses.`)
        });

    cy.log('**Adress selecting**');
    cy.get('.mat-radio-inner-circle').click()
    cy.get(".btn-next").click()

    cy.log('**Delivery selecting**');
    cy.get("button[aria-label='Proceed to delivery method selection'] span[class='mat-button-wrapper'] span").click()
    cy.get("button[aria-label='Proceed to delivery method selection'] span[class='mat-button-wrapper'] span").click()
    cy.get('.mat-radio-inner-circle').first().click({ multiple: true })
    cy.get(".nextButton").click()


    cy.log('**Payment options form filling out**');
    cy.get('#mat-expansion-panel-header-0').click()
    cy.get('#mat-input-8').type(user.firstName)
    cy.get('#mat-input-9').type(user.cardName)
    cy.get('#mat-input-10').select(4)
    cy.get('#mat-input-11').select(5)
    cy.get("#submitButton").click()

    cy.get('.mat-radio-inner-circle').click()
    cy.get("[id^='cdk-overlay-']")
        .should('be.visible')
        .then(($element) => {
            const elementId = $element.attr('id');
            expect(elementId).to.include('cdk-overlay-')
            cy.get($element).should('contain', `Your card ending with 5432 has been saved for your convenience.`)
        });
    cy.get(".nextButton").click()

    cy.log('**Checkout verifying**');
    cy.get("#checkoutButton").click()
    cy.get('[fxflex="60%"]').should('contain', 'Thank you for your purchase!')
}