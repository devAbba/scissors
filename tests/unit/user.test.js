const { connect } = require('../testDb')
const userService = require('../../src/services/user.service')

describe('User services test suite', () => {
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

    test('Create user in db', async () => {
        const user = {
            email: 'person@domain.com',
            password: 'password123'
        }

        const savedUser = await userService.createUser(user.email, user.password)

        expect(savedUser.email).toBe(user.email)
    })

    test('find user in db', async () => {
        const email = 'person@domain.com'
        const password = 'password123'
        
        //create entry
        const user = await userService.createUser(email, password)

        const userInDb = await userService.findUser(email)
        expect(userInDb.email).toBe(email)
        expect(userInDb.shortUrl).toHaveLength(0);
    })
})