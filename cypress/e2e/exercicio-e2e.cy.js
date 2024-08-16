/// <reference types="cypress" />
let dadosLogin

function quatroVezes(comando) {
    for (let i = 0; i < 4; i++) {
        comando();
    }
}

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
        cy.visit('minha-conta')
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
    });

    beforeEach(() => {
        cy.visit('/produtos')
    });
    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
        cy.get('.post-2559 > .product-block').click()
        cy.get('.product_title').should('contain', 'Abominable Hoodie')
        quatroVezes(() => cy.adicionarProdutoCarrinho());
        cy.get('#cart > .dropdown-toggle').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.wait(5000)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
})