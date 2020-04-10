///<reference types="Cypress" />

describe('How to handle Web UI Elements with Cypress', function () {

    it('Visit page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('Checkbox', () => {        
        //check one element and assert
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        //uncheck one element and assert
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        //check multiple checkboxes and assert
        cy.get('input[type="checkbox"]').check(['option2','option3']).should('be.checked')
    })

    it('Dropdown', () => {
        //static dropdown
        cy.get('select').select('option2').should('have.value','option2')
        //dynamic dropdown
        cy.get('#autocomplete').type('Can')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === 'Canada') {
                $el.click()
                //cy.get(':nth-child(4) > .product-action > button').should('contain', "ADDED")
            }
        })
        cy.get('#autocomplete').should('have.value','Canada')
    })

})
