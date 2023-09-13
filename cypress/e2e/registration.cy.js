import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import confirmBannerCookies from '../support/pages/confirmBannerCookies';
import homePage from '../support/pages/homePage';
import loginPage from '../support/pages/loginPage';
import registerPage from '../support/pages/registerPage';
import { messageRegistrationHelper } from '../support/successMessageVerifyingHelper.js';

beforeEach("Gegistration form opening", () => {
  homePage.visit();

  cy.log('**Opening registration form ...**');
  confirmBannerCookies.getCloseWekcomeBanner().click();
  loginPage.getAccountButton().click();
  loginPage.getLoginButton1().click();
  registerPage.getNotYetCustomerLink().click();

  cy.log('**Cookies confirming**');
  confirmBannerCookies.getCookies().click();
})

describe('Registration verifying', () => {
  let password;
  let passwordLength;
  let uniqueEmail;
  const securityQuestion = "Mother's maiden name?";

  before(() => {
    user.email = faker.internet.email();
    user.password = faker.internet.password({ length: 8 });
    password = user.password;
    passwordLength = faker.internet.password({ length: 4 });
    uniqueEmail = faker.internet.email();
  });

  after(() => {
    user.email = '';
    user.password = '';
    password = '';
    passwordLength = '';
    uniqueEmail = '';
  });

  it('Successful registration', () => {

    cy.log('**Filling out the user registration form ...**');
    registerPage.getEmail().type(user.email);
    registerPage.getPassword().type(password);
    registerPage.getPasswordConfirm().type(password);
    registerPage.getSecurityQuestion().click()
    registerPage.selectSecurityQuestion(securityQuestion);
    registerPage.getSecurityAnswer().type(user.answer);
    registerPage.getRegisterButton().click();

    cy.log('**Successfull registration message verifying**');
    messageRegistrationHelper()
  })

  it('Email uniqueness verifying', () => {

    cy.log('**Filling out the user registration form ...**');
    registerPage.getEmail().type(uniqueEmail);
    registerPage.getPassword().type(password);
    registerPage.getPasswordConfirm().type(password);
    registerPage.getSecurityQuestion().click()
    registerPage.selectSecurityQuestion(securityQuestion);
    registerPage.getSecurityAnswer().type(user.answer);
    registerPage.getRegisterButton().click();

    cy.log('**Successfull registration message verifying**');
    messageRegistrationHelper()

    cy.log('**Opening registration form ...**');
    registerPage.getNotYetCustomerLink().click();

    cy.log('**Filling out the user registration form with not unique email...**');
    registerPage.getEmail().type(uniqueEmail);
    registerPage.getPassword().type(password);
    registerPage.getPasswordConfirm().type(password);
    registerPage.getSecurityQuestion().click()
    registerPage.selectSecurityQuestion(securityQuestion);
    registerPage.getSecurityAnswer().type(user.answer);
    registerPage.getRegisterButton().click();

    cy.log('**Error message verifying**');
    registerPage.getErrorEmail().should('contain', 'Email must be unique')

  })

  it('Password matching verifying', () => {

    cy.log('**Filling out the user registration form with different passwords...**');
    registerPage.getEmail().type(user.email);
    registerPage.getPassword().type(password);
    registerPage.getPasswordConfirm().type("Password");
    registerPage.getSecurityQuestion().click()
    registerPage.selectSecurityQuestion(securityQuestion);
    registerPage.getSecurityAnswer().type(user.answer);
    registerPage.getRegisterButton().click();

    cy.log('**Error message verifying**');
    registerPage.getErrorPassword().should('contain', ' Passwords do not match ')
  })

  it('Password length verifying', () => {

    cy.log('**Filling out the user registration form with not appropriate characters long**');
    registerPage.getEmail().type(user.email);
    registerPage.getPassword().type(passwordLength);
    registerPage.getPasswordConfirm().type(passwordLength);
    registerPage.getSecurityQuestion().click()
    registerPage.selectSecurityQuestion(securityQuestion);
    registerPage.getSecurityAnswer().type(user.answer);
    registerPage.getRegisterButton().click();

    cy.log('**Error message verifying**');
    registerPage.getErrorPasswordLength().should('contain', 'Password must be 5-40 characters long. ')
  })
})


