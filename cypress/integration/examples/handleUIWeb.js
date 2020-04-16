///<reference types="Cypress" />
///<reference types="Cypress-iframe" />
import 'cypress-iframe'

describe('How to handle Web UI Elements with Cypress', function () {

    it('Visit page', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('Checkbox', () => {
        //check one element and assert
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        //uncheck one element and assert
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        //check multiple checkboxes and assert
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked')
    })

    it('Dropdown', () => {
        //static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')
        //dynamic dropdown
        cy.get('#autocomplete').type('Can')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === 'Canada') {
                $el.click()
            }
        })
        cy.get('#autocomplete').should('have.value', 'Canada')
    })

    it('Visible and Invisible objects', () => {
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

    it('Radio', () => {
        cy.get('[value="radio2"]').should('be.not.be.checked')
        cy.get('[value="radio2"]').check().should('be.checked')
    })

    it('Alerts', () => {
        cy.get('#name').type('Poliane')
        cy.get('#alertbtn').click() //it'll be displayed an alert. Cypress automatically handles it.
        cy.on('window:alert', (str) => {
            expect(str).to.contains('Poliane')
        })
        cy.get('#confirmbtn').click()
    })

    it('Testing new tab using JQuery', () => {
        //testing using JQuery, removing the Target Attribute
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.go('back')
        cy.url().should('include', 'AutomationPractice')
    })

    it('Web Tables', () => {
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const text = $el.text()
            if (text.includes('Python')) {
                cy.get('tr td:nth-child(2)').eq(index).next().then(function (price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                }
                )
            }
        })
    })

    it('Mouse Hover Popus', () => {
        //Possible to use with the line below as well. With this way the element will open
        //and then click
        //cy.get('div.mouse-hover-content').invoke('show')   
        //Opt to use the line above, the {force : true} should be deleted   
        cy.contains('Top').click({ force: true }) //clicked without opening
        cy.url().should('include', 'top')
    })

    it('Frame', () => {
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })

    it('Child Window', () => {
        cy.get('#opentab').then(function (el) {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)
        })
    })

})
