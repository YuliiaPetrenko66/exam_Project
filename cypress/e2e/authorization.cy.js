import user from '../fixtures/user.json';
import { userCreation } from '../support/createUserHelper.js';
import homePage from '../support/pages/homePage';
import loginPage from '../support/pages/loginPage';

beforeEach("New user registering", () => {
  homePage.visit();
  userCreation(user)
})

describe('Authorization verifying', () => {

  it('Login user with valid credentials', () => {
    loginPage.visit()

    cy.log('**Submit login form ...**');
    loginPage.getEmail().type(user.email);
    loginPage.getPassword().type(user.password);
    loginPage.getLoginButton().click();
    loginPage.getUrlMatchesPattern(/\/search/);
  })

  it('Attempt to login with not registered email', () => {

    homePage.visit();

    cy.log('**Opening Login form ...**');
    homePage.getAccountButton().click({ force: true });
    homePage.getAccountLoginButton().click();

    loginPage.visit();

    cy.log('**Submit login form with invalid email...**');
    loginPage.getEmail().type('test@gmail.com');
    loginPage.getPassword().type(user.password);
    loginPage.getLoginButton().click();

    cy.log('**Error message verifying**');
    loginPage.getErrorEmailPassword().should('contain', 'Invalid email or password.')
  })


  it('Attempt to login with not correct password', () => {
    homePage.visit();

    cy.log('**Opening Login form ...**');
    homePage.getAccountButton().click({ force: true });
    homePage.getAccountLoginButton().click();

    loginPage.visit();

    cy.log('**Submit login form with invalid email...**');
    loginPage.getEmail().type(user.email);
    loginPage.getPassword().type('test');
    loginPage.getLoginButton().click();

    cy.log('**Error message verifying**');
    loginPage.getErrorEmailPassword().should('contain', 'Invalid email or password.')
  })

})


