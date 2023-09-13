class confirmBannerCookies {
    
    getCloseWekcomeBanner() {
        return cy.get("button[aria-label='Close Welcome Banner']");
    }

    
    getCookies() {
        return cy.get("a[aria-label='dismiss cookie message']");
    }

}
export default new confirmBannerCookies();