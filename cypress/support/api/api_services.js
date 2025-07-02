
export function loginAPIRequest(username,password){
    return cy.request({
        method: 'POST',
        url : 'https://restful-booker.herokuapp.com/auth',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username: username,
            password: password
        }
    })
}

export function createBookingRequest(booking){
    return cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${Cypress.env('token')}`
        },
        body: booking  
    })
}

export function getBookingRequest(bookingid){
    return cy.request({
        method: 'GET',
        url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

export function updateBookingRequest(bookingid){
    return cy.request({
        method: 'PUT',
        url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
        headers:{
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Cookie': `token=${Cypress.env('token')}`
        },
        body: {
            "firstname" : "James",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }
    })
}

export function deleteBookingRequest(bookingid){
    return cy.request({
        method: 'DELETE',
        url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
        headers:{
            'Content-Type': 'application/json',
            'Cookie': `token=${Cypress.env('token')}`
        }
    })
}