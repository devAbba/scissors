const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    
    if (req && req.cookies){
        token = req.cookies["api-auth"];
        return token
    } 
    return null
}


module.exports = async function (req, res, next){
    try {
        
        const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

        if (!decodedToken.id) {
            res.redirect('/users/login')
            // return response.status(401).json({ error: 'token invalid' })
        }
    
        const user = await User.findById(decodedToken.id)

        req.user = user.id

        next()
         
    }
    
    catch (error){
        const { TokenExpiredError } = jwt
        if (error instanceof TokenExpiredError){
           return res.status(401).json({message: "Unathorized! Access token expired"})
        }
        return res.redirect('/users/login')
        // res.status(401).json({message: "Unathorized! invalid token"})
    }
}