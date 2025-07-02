import { createBookingRequest } from "./api/api_services"
import { loginAPIRequest } from "./api/api_services"
import { getBookingRequest } from "./api/api_services"
import { updateBookingRequest } from "./api/api_services"
import { deleteBookingRequest } from "./api/api_services"

Cypress.Commands.add('loginAPI',function(username,password){

    loginAPIRequest(username,password).then((resp)=>{
        expect(resp.status).to.eq(200)
        Cypress.env('token', resp.body.token)
    })

})

Cypress.Commands.add('createBooking',function(booking){

    createBookingRequest(booking).then((resp)=>{
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('bookingid')
        Cypress.env('bookingid', resp.body.bookingid)
        cy.log(`Booking creado con el id:${resp.body.bookingid}`)
    })

})

Cypress.Commands.add('getBooking',function(bookingid){

    getBookingRequest(bookingid).then((resp)=>{
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('firstname')
        expect(resp.body).to.have.property('depositpaid')
        expect(resp.body.bookingdates).to.have.property('checkin')
        expect(resp.body.bookingdates).to.have.property('checkout')
    })

})

Cypress.Commands.add('updateBooking',function(bookingid){

    updateBookingRequest(bookingid).then((resp)=>{
        expect(resp.status).to.eq(200)
        expect(resp.body).to.have.property('firstname')
        expect(resp.body).to.have.property('depositpaid')
        expect(resp.body.bookingdates).to.have.property('checkin')
        expect(resp.body.bookingdates).to.have.property('checkout')
        cy.log(`Nombre actualizado: ${resp.body.firstname}`)
    })

})

Cypress.Commands.add('deleteBooking',function(bookingid){

    deleteBookingRequest(bookingid).then((resp)=>{
        expect(resp.status).to.eq(201)
        cy.log(`Se elimino el siguiente registro: ${bookingid}`)
    })

})