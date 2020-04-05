///<reference types="Cypress" />

describe('Test Suite for Locator Strategies', function () {

    it('Have Lenght for Visible products', function () {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.get('.product').should('have.length', 5) //there's one more element available but invisible
        cy.get('.product:visible').should('have.length', 4) //excluding the invisible element
    })

    it('Should Add to Cart via Click specific element', function () {
        //just find the element and click
        cy.get(':nth-child(2) > .product-action > button').click().should('contain', "ADDED")
    })

    it('Should Add to Cart element via EQ', function () {
        //using .eq you find and specific element in a array
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().should('contain', "ADDED")
    })

    it('Should Add to Cart via EACH', function () {
        //using each you interate with with the array structure
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')) {
                $el.find('button').click()
                cy.get(':nth-child(4) > .product-action > button').should('contain', "ADDED")
            }
        })

    })

})
