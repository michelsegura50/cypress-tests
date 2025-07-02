describe('GET + POST de la API JSONPlaceholder', function(){
    
    let userId
    let userData
    
    beforeEach(()=>{
        cy.fixture('users').then((data)=>{
            userData = data.usuarioAPI
        })
    })
    
    it('Crea un usuario y valida sus datos',()=>{
        //POST - Crear usuario
        cy.request({
            method : 'POST',
            url: 'https://jsonplaceholder.typicode.com/users',
            body: {
                name: userData.name,
                email: userData.email,
                address : {
                    street: userData.ciudad
                }
            }
        }).then((resp)=>{
            expect(resp.status).to.eq(201)
            expect(resp.body).to.have.property('id')
            userId = resp.body.id
        })

        //GET - Obtener y validar ususario
        cy.request({
            method : 'GET',
            url: `https://jsonplaceholder.typicode.com/users/1`
        }).then((resp)=>{
            expect(resp.status).to.eq(200)
            expect(resp.body).to.have.property('name')
            expect(resp.body).to.have.property('email')
            expect(resp.body).to.have.property('address')
        })


    })
})