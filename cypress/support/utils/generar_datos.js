

export function generarBookingDinamico(base){
    const random = Math.floor(Math.random()*1000)

    return {
        ...base,
        firstname: `${base.firstname}${random}`,
        lastname: `${base.firstname}${random}`,
        totalprice: base.totalprice + random,
        bookingdates: {
            checkin: new Date().toISOString().split('T')[0],
            checkout: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
    }
}