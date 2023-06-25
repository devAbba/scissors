const request = require('supertest')
const { connect } = require('../testDb')
const userService = require('../../src/services/user.service')
const app = require('../../src/app');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/users/signup')
        .set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        .send({ 
            email: 'person@domain.com', 
            password: 'password123', 
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', 'person@domain.com')      
    })


    it('should login a user', async () => {
        //create db entry
        const user = {
            email: 'person@domain.com',
            password: 'password123'
        }
        await userService.createUser(user.email, user.password)

        // login user
        const response = await request(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'person@domain.com', 
            password: 'password123'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})