class HomePage {

getEditBox(){
    return cy.get(':nth-child(1) > .form-control')
}

getGenderSelect(){
    return cy.get('#exampleFormControlSelect1')
}

getRequiredValidation(){
    return cy.get('input[name="name"]:nth-child(2)')
}

getRadio(){
    return cy.get('#inlineRadio3')
}

}

//available in other files
export default HomePage;    