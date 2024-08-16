Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('adicionarProdutoCarrinho', () => {
    cy.get('.button-variable-item').eq(1).click()
    cy.get('.button-variable-item').eq(6).click()
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho')
    cy.get(':nth-child(1) > .item > .products-grid > .product-block > .block-inner > .image > .product-image > .image-hover').click()
});

