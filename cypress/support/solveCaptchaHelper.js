export function solveCaptcha() {
    cy.get('#captcha').invoke('text').then(captchaText => {
        const expression = captchaText.trim();
        cy.get('span[translate=""]').should('exist').invoke('text').then(whatIsText => {
            const result = evaluateMathExpression(expression.replace(whatIsText, ''));
            cy.get('#captchaControl').type(result);
        });
    })
    function evaluateMathExpression(expression) {
        return eval(expression);
    }
}
