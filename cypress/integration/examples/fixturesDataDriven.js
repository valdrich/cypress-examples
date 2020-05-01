///<reference types="Cypress" />
import HomePage from '../pageObjects/homePage'
import ProductsPage from '../pageObjects/productsPage'
import CheckoutPage from '../pageObjects/checkoutPage'

describe('How to use Fixtures to control Data Driven', function () {

    const homePage = new HomePage()
    const productsPage = new ProductsPage()
    const checkoutPage = new CheckoutPage()


    before(() => {
        cy.fixture('eCommerceData')
            .then((data) => {
                this.data = data
            })
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })

    it('Should input form data using Fixtures', () => {
        homePage.getEditBox().type(this.data.name).should('have.value', this.data.name)
        homePage.getGenderSelect().select(this.data.gender).should('have.value', this.data.gender)
        homePage.getRequiredValidation().should('have.attr', 'minlength', '2')
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
        checkoutPage.getCheckout().click()
        checkoutPage.getConfirmTC().click({ force: true })
        checkoutPage.getConfirmCheckout().click()
        //cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
        checkoutPage.getAlert().then(function (element) {
            const actualText = element.text()
            expect(actualText.includes('Success')).to.be.true
        })
    })

    it('Should sum the cart value', () => {
        var sum = 0
        productsPage.getCheckout().click()
        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            const amout = $el.text()
            var res = amout.split(" ")
            res = res[1].trim()
            sum = Number(sum) + Number(res)
        }).then(function () {
            cy.log(sum)
        })
        cy.get('h3 strong').then(function (element) {
            const totalamout = element.text()
            var total = totalamout.split(" ")
            total = total[1].trim()
            expect(Number(total)).to.equal(Number(sum))
        })
    })
})
