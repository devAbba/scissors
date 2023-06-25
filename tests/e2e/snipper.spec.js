const request = require('supertest')
const { connect } = require('../testDb')
const userService = require('../../src/services/user.service')
const app = require('../../src/app');


describe('Snipper Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await userService.createUser('person@domain.com', 'password123')

        const loginResponse = await request(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'person@domain.com', 
            password: 'password123'
        });

        token = loginResponse.body.token;
    })


    afterAll(async () => {
        await conn.cleanup()
        await conn.disconnect()
    })

    it('should not authorize without token', async () => {
        
        const url = 'https://developer.mozilla.org/en-US/docs/Web/Accessibility'

        const response = await request(app)
        .get('/snipper')
        .set('content-type', 'application/json')
        .send({ full: url })

        expect(response.status).toEqual(302)
        expect(response.headers.location).toMatch('/users/login')
    })

    it('should return shortUrl', async () => {
        
        const url = 'https://developer.mozilla.org/en-US/docs/Web/Accessibility'

        const response = await request(app)
        .post('/snipper')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({ full: url })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('status', true)
        expect(response.body).toHaveProperty('shortUrl')
        expect(response.body).toHaveProperty('qr_code')
        
    })

})