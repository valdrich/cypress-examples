class checkoutPage {

    getCheckout() {
        return cy.get('.suggestions > ul > li > a')
    }

    getConfirmTC() {
        return cy.get('#checkbox2')
    }

    getConfirmCheckout() {
        return cy.get('input[type="submit"]')
    }

    getAlert() {
        return cy.get('.alert')
    }
}

//available in other files
export default checkoutPage;    