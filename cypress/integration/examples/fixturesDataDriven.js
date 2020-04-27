///<reference types="Cypress" />
import HomePage from '../pageObjects/homePage'
import ProductsPage from '../pageObjects/productsPage'

describe('How to use Fixtures to control Data Driven', function () {

    const homePage = new HomePage()
    const productsPage = new ProductsPage()

    before(() => {
        cy.fixture('eCommerceData')
            .then((data) => {
                this.data = data
            })
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })

    it('Should input form data using Fixtures', () => {         
        homePage.getEditBox().type(this.data.name).should('have.value', this.data.name)
        homePage.getGenderSelect().select(this.data.gender).should('have.value',this.data.gender)
        homePage.getRequiredValidation().should('have.attr','minlength','2')
        homePage.getRadio().should('be.disabled')
    })

    it('Using multiple datas from Json with customized commands', () => {
        cy.get(':nth-child(2) > .nav-link').click()
        this.data.productName.forEach(element => {
            //selectProduct can be found in support/commands.js
            cy.selectProduct(element)
        });
    })

    it('Using POs to checkout', () => {
        productsPage.getCheckoutButton().click()
        productsPage.getCheckout().click()
        productsPage.getCountry().type('Iceland')
        cy.get('.suggestions > ul > li > a').click()
    })
})
