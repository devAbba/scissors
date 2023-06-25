const Url = require('../models/shortUrl.model')
const User = require('../models/user.model')

exports.shortUrl = async function(url, tag, user){
    try{
        switch (tag){
            case 'empty':
                const shortUrl = new Url({
                    full: url,
                    createdBy: user
                })
    
                const savedUrl = await shortUrl.save()

                //get user details in db and add note to user's collection
                const userInDb = await User.findById(user)
                if(userInDb){
                    userInDb.shortUrl = userInDb.shortUrl.concat(savedUrl._id)
                    await userInDb.save()
                }

                return savedUrl;

            default:
                const url_data = new Url({
                    full: url,
                    createdBy: user,
                    short: tag
                })

                const savedURL = await url_data.save()

                //get user details and save note to profile
                const userInDB = await User.findById(user)
                if (userInDB){
                    userInDB.shortUrl = userInDB.shortUrl.concat(savedURL._id)
                }

                return savedURL;

        }


    } catch (error){
        console.log(error)
    }
    
}

exports.history = async function(userId){
    try {
        const urls = await Url.find({createdBy: userId}).sort({createdAt: 'desc'})
        return urls 
    } catch (error){
        console.log(error)
    }
}

exports.getUrl = async function(shortId){
    try {
        const shortUrl = await Url.findOne({short: shortId})
        return shortUrl 
    } catch (error){
        console.log(error)
    }
}