import user from '../fixtures/user.json';
import { solveCaptcha } from '../support/solveCaptchaHelper.js';
import contactPage from '../support/pages/contactPage';
import confirmBannerCookies from '../support/pages/confirmBannerCookies';
import { messageFeedbackHelper } from '../support/successMessageVerifyingHelper.js';


it('"Customer Feedback" form filling out', () => {
    contactPage.visit();
    confirmBannerCookies.getCloseWekcomeBanner().click();

    cy.log('**Filling out form ...**');
    contactPage.getComment().type(user.comment, { force: true });
    contactPage.getRating().click();
    contactPage.getRating().type('{rightarrow}');

    cy.log('**Call the function to solve the CAPTCHA**');
    solveCaptcha();

    cy.log('**Submit form ...**');
    contactPage.getSubmitButton().click();

    cy.log('**Success message verifying**');
    messageFeedbackHelper()
});





