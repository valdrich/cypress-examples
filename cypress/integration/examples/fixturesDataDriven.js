///<reference types="Cypress" />

describe('How to use Fixtures to control Data Driven', function () {

    before(() => {
        cy.fixture('eCommerceData')
            .then((data) => {
                this.data = data
            })
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })

    it('Should input form data using Fixtures', () => {
        cy.get(':nth-child(1) > .form-control').type(this.data.name).should('have.value', this.data.name)
        cy.get('#exampleFormControlSelect1').select(this.data.gender).should('have.value',this.data.gender)
        cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2')
        cy.get('#inlineRadio3').should('be.disabled')
    })

    it('Using multiple datas from Json with customized commands', () => {
        cy.get(':nth-child(2) > .nav-link').click()
        this.data.productName.forEach(element => {
            //selectProduct can be found in support/commands.js
            cy.selectProduct(element)
        });
    })
})
