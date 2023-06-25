const request = require('supertest');
const app = require('../../src/app');
const { connect } = require('../testDb')


describe('Home Route', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('Should return status true', async () => {
        const response = await request(app).get('/').set('content-type', 'application/json')
        expect(response.status).toBe(200)
        
    })

    it('Should return error when routed to undefined route', async () => {
        const response = await request(app).get('/undefined').set('content-type', 'application/json')
        expect(response.status).toBe(404)
    })
});