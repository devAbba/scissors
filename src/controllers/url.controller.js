const urlService = require('../services/url.service');
const Cache = require('../config/redis');
const QRCode = require('qrcode');


exports.shortenUrl = async (req, res) => {
    try {
            const { full, tag } = req.body
            const userId = req.user
            const shortUrl = await urlService.shortUrl(full, tag, userId)
            if (shortUrl){
                const data = req.headers.origin + '/' + shortUrl.short

                const qr_code = await QRCode.toDataURL(data);

                return res.status(201).json({
                    status: true,
                    shortUrl,
                    qr_code
                })
            }      
    } catch (error){
        console.log(error)
    }
}

exports.urlHistory = async (req, res) => {
    try {
        const userId = req.user

        const cachedData = await Cache.redis.get(userId);
        if (cachedData){
            const history = JSON.parse(cachedData);
            res.render('snipper', {history})
        } else {

            const history = await urlService.history(userId)

            if (history){
                const data = JSON.stringify(history)
                
                //set data to redis and expire in 10mins
                Cache.redis.set(userId, data, {
                    EX: 60 * 10,
                    NX: true
                })
            }

            res.render('snipper', {history})
        }
    } 
    catch (error){
        console.log(error)
    }
}