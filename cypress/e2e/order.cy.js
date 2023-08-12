import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import { userCreation } from '../support/createUserHelper.js';
import homePage from '../support/pages/homePage';
import loginPage from '../support/pages/loginPage';
import searchPage from '../support/pages/searchPage';
import basketPage from '../support/pages/basketPage';
import { messageProductPlaced } from '../support/successMessageVerifyingHelper.js';

let cityUser;
let userFirstName;
let last4Digits;

user.address = faker.location.streetAddress();
user.city = faker.location.city();
user.firstName = faker.person.firstName();
user.phoneNumber = faker.phone.number('380#######');
user.cardName = faker.finance.creditCardNumber('################')
cityUser = user.city
userFirstName = user.firstName
last4Digits = user.cardName.slice(-4);

beforeEach("Login form opening", () => {
    cy.log('**Registration...**');
    homePage.visit();
    userCreation(user)

    homePage.visit();

    cy.log('**Opening Login form ...**');
    homePage.getAccountButton().click({ force: true });
    homePage.getAccountLoginButton().click();

    loginPage.visit()

    cy.log('**Submit login form ...**');
    loginPage.getEmail().type(user.email);
    loginPage.getPassword().type(user.password);
    loginPage.getLoginButton().click();
    loginPage.getUrlMatchesPattern(/\/search/);
})

after(() => {
    user.address = '';
    user.city = '';
    user.firstName = '';
    user.phoneNumber = '';
    user.cardName = '';
    cityUser = '';
    userFirstName = '';
    last4Digits = '';
});


it('Place order verifying', () => {

    cy.log('Add random product to cart')

    searchPage.visit();

    searchPage.getAddToBasketButton().should('contain', 'Add to Basket').first().click({ force: true });
    messageProductPlaced()

    cy.log('Open basket')
    basketPage.visit();
    basketPage.getShowBasketButton().click();

    cy.log('Basket data verifying')
    basketPage.getBasketProduct().should('contain', 'Apple Juice (1000ml)');
    basketPage.userDataVerifying().should('contain', user.email)

    cy.log('Confirm order')
    basketPage.getCheckoutButton().click();
    basketPage.getAddNewAddress().click();

    cy.log('**Fill in "Add New Address" form ...**');
    basketPage.getCountryField().type(user.country);
    basketPage.getNameField().type(user.firstName);
    basketPage.getPhoneNumberField().type(user.phoneNumber);
    basketPage.getZipCodeField().type(user.zipCode);
    basketPage.getAddressField().type(user.address);
    basketPage.getCityField().type(user.city);
    basketPage.getRegionField().type(user.region);
    basketPage.getSubmitButton().click()
    basketPage.getSuccessMessage()
        .should('be.visible')
        .then(($element) => {
            const elementId = $element.attr('id');
            expect(elementId).to.include('cdk-overlay-')
            cy.get($element).should('contain', `The address at ${cityUser} has been successfully added to your addresses.`)
        });

    cy.log('**Adress selecting**');
    basketPage.getAddressSelecting().click()
    basketPage.getNextButton1().click()

    cy.log('**Delivery selecting**');
    basketPage.getDeliveryMethod().click()
    basketPage.getDeliveryMethod().click()
    basketPage.getRadioButton().first().click({ multiple: true })
    basketPage.getNextButton2().click()

    cy.log('**Payment options form filling out**');
    basketPage.getPaymentForm().click()
    basketPage.getUserName().type(userFirstName)
    basketPage.getCardNumber().type(user.cardName)
    basketPage.getMonthCard().select(4)
    basketPage.getYearCard().select(5)
    basketPage.getSubmitPaymentButton().click()
    basketPage.getRadioPaymentButton().click()
    basketPage.getSuccessMessage()
        .should('be.visible')
        .then(($element) => {
            const elementId = $element.attr('id');
            expect(elementId).to.include('cdk-overlay-')
            cy.get($element).should('contain', `Your card ending with ${last4Digits} has been saved for your convenience.`)
        });
    basketPage.getNextButton2().click()

    cy.log('**Checkout verifying**');
    basketPage.getCheckoutButton().click()
    basketPage.getPurchaseMessage().should('contain', 'Thank you for your purchase!')
})





