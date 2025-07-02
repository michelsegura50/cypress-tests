
describe('Intercepcion de usuarios',function(){

    beforeEach(function(){
        cy.fixture('mock').as('usuariosMock')
    })

    it('Intercepta y muestra los usuarios mock',function(){
        cy.intercept('GET','https://jsonplaceholder.typicode.com/users',{
            statusCode: 200,
            body: [
                    {
                        id:1,
                        name:'Usuario mock 1',
                        username: 'mockuser1',
                        email: 'mock1@mail.com'
                    },
                    {
                        id:2,
                        name:'Usuario mock 2',
                        username: 'mockuser2',
                        email: 'mock2@mail.com'
                    },
                ]
        }).as('getUsuarios')

        cy.visit('http://127.0.0.1:5500/cypress/fixtures/html/usuarios.html')

        cy.wait('@getUsuarios')

        cy.get('#user-container').within(()=>{
            cy.contains('Usuario mock 1').should('exist')
            cy.contains('mock1@mail.com').should('exist')
            cy.contains('Usuario mock 2').should('exist')
            cy.contains('mock2@mail.com').should('exist')
        })
    })

    it('Lista vacia',function(){
        cy.intercept('GET','https://jsonplaceholder.typicode.com/users',{
            statusCode: 200,
            body: [
                
                ]
        }).as('getUsuarios')

        cy.visit('http://127.0.0.1:5500/cypress/fixtures/html/usuarios.html')

        cy.wait('@getUsuarios')

        cy.get('#user-container').within(()=>{
            cy.contains('Usuario mock 1').should('not.exist')
            cy.contains('mock1@mail.com').should('not.exist')
            cy.contains('Usuario mock 2').should('not.exist')
            cy.contains('mock2@mail.com').should('not.exist')
        })
    })

    it('Mandar error de servidor',function(){
        cy.intercept('GET','https://jsonplaceholder.typicode.com/users',{
            statusCode: 500,
            body: 'Error interno del servidor'

            
                
                
        }).as('errorUsuarios')

        cy.visit('http://127.0.0.1:5500/cypress/fixtures/html/usuarios.html')

        cy.wait('@errorUsuarios')

        cy.contains('Error al cargar usuarios').should('exist')
    })

    it('Intercepta y muestra los usuarios mock con fixture',function(){

        const user = this.usuariosMock

        cy.intercept('GET','https://jsonplaceholder.typicode.com/users',{
            statusCode: 200,
            body: [
                    {
                        id:user.usuario1.id,
                        name:user.usuario1.name,
                        username: user.usuario1.username,
                        email: user.usuario1.email
                    },
                    {
                        id:user.usuario2.id,
                        name:user.usuario2.name,
                        username: user.usuario2.username,
                        email: user.usuario2.email
                    },
                ]
        }).as('getUsuarios')

        cy.visit('http://127.0.0.1:5500/cypress/fixtures/html/usuarios.html')

        cy.wait('@getUsuarios')

        cy.get('#user-container').within(()=>{
            cy.contains('Usuario 1').should('exist')
            cy.contains('mock1@mail.com').should('exist')
            cy.contains('Usuario 2').should('exist')
            cy.contains('mock2@mail.com').should('exist')
        })
    })


})