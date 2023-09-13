import user from '../fixtures/user.json';
import { userCreation } from '../support/createUserHelper.js';
import { findProductByName } from '../support/searchProductHelper.js';
import { proceedToCheckout } from '../support/searchProductHelper.js';
import homePage from '../support/pages/homePage';
import loginPage from '../support/pages/loginPage';
import searchPage from '../support/pages/searchPage';

beforeEach("Login form opening", () => {
    
    homePage.visit();

    userCreation(user)

    loginPage.visit()

    cy.log('**Submit login form ...**');
    loginPage.getEmail().type(user.email);
    loginPage.getPassword().type(user.password);
    loginPage.getLoginButton().click();
    loginPage.getUrlMatchesPattern(/\/search/);
})

it('Product searching', () => {

    searchPage.getSearchField().type('OWASP{enter}');
    findProductByName("OWASP Juice Shop Hoodie");
    proceedToCheckout(user, "OWASP Juice Shop Hoodie")

})