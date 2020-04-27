class productsPage {

getCheckoutButton(){
    return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
}

getCheckout(){
    return cy.contains('Checkout')
}

getCountry(){
    return cy.get('#country')
}

getSelectCountry(){
    return cy.get('.suggestions > ul > li > a')
}



}

//available in other files
export default productsPage;    