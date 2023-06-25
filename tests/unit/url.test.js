const { connect } = require('../testDb')
const urlService = require('../../src/services/url.service')

const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;

describe('Url services test suite', () => {
    let conn;
    let userId = new ObjectId()

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })
    
    
    afterAll(async () => {
        await conn.disconnect()
    })

    test('shorten Url', async() => {
        let tag = ''
        const url = 'https://developer.mozilla.org/en-US/docs/Web/Accessibility'

        const savedUrl = await urlService.shortUrl(url, tag, userId)
        expect(savedUrl.full).toBe(url)
        expect(savedUrl.short).not.toBeNull()
        expect(savedUrl.createdBy).not.toBeNull()
        expect(savedUrl.createdAt).not.toBeNull()
        expect(savedUrl.updatedAt).not.toBeNull()
    })

    test('get Url data', async() => {
        //create entry
        let tag = ''
        const url = 'https://developer.mozilla.org/en-US/docs/Web/Accessibility'
        const savedUrl = await urlService.shortUrl(url, tag, userId)

        const shortId = savedUrl.short
        const res = await urlService.getUrl(shortId)
        expect(res.full).toBe(url)
        expect(res.short).toBe(shortId)   

    })


})