import { generarBookingDinamico } from "../support/utils/generar_datos"

describe('Flujo compelto', function(){

    beforeEach(function(){
        cy.fixture('datosBooking').as('datosBooking')
        cy.fixture('users').as('users')
        cy.fixture('fixtureAvanzado').as('avanzado')
    })

    it('Crud',function(){

        const booking = this.datosBooking.Booking
        const user =    this.users.usuarioAPI

        cy.loginAPI(user.username,user.password).then(()=>{
            const token = Cypress.env('token')
            cy.createBooking(booking).then(()=>{
                const bookingid = Cypress.env('bookingid')
                cy.getBooking(bookingid).then(()=>{
                    cy.updateBooking(bookingid).then(()=>{
                        cy.deleteBooking(bookingid)
                    })
                })
            })
        })

    })

    it('Booking con datos dinamicos',function(){
        cy.fixture('datosBooking').then(base =>{
            const bookingDinamico = generarBookingDinamico(base.Booking)

            cy.loginAPI(this.users.usuarioAPI.username,this.users.usuarioAPI.password).then(()=>{
                cy.createBooking(bookingDinamico).then(()=>{
                    const bookingid = Cypress.env('bookingid')
                    cy.getBooking(bookingid)
                })
            })

        })
    })

    it('Login con varios usuarios',function(){
        this.avanzado.usuariosAPI.forEach((usuario)=>{
            cy.log(`Probando: usuario ${usuario.descripcion}`)

            cy.loginAPI(usuario.username,usuario.password).then((resp)=>{
                if(usuario.esperado === 'success'){
                    expect(resp.body).to.have.property('token')
                    expect(resp.status).to.eq(200)
                }
                else{
                    expect(resp.status).to.eq(200)
                }
            })
        })
    })

})