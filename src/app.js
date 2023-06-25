const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const userRouter = require('./routes/users.route');
const snipperRouter = require('./routes/snipper.route');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authenticate = require('./middlewares/auth');
const urlService = require('./services/url.service');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

//helmet middleware
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
            "style-src": ["'self'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
            "img-src": ["'self'", "data:", 'res.cloudinary.com']
        },
      },
    })
);

app.use(cookieParser());

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join('public', 'views'));


//define routes
app.use('/users', userRouter);
app.use('/snipper', authenticate, snipperRouter);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/:shortUrl', async (req, res, next) => {
    const shortUrl = await urlService.getUrl(req.params.shortUrl)
   
    if (shortUrl){
        res.redirect(shortUrl.full)
    } else {
        next()
    }
});

//handles invalid routes
app.use('*', (_req, res) => {
    res.status(404);
    res.render('invalidRoute');
});

//global error handler
app.use((err, _req, res, next) => {
    if (err){
        console.log(err)
        const errorStatus = err.status || 500
        res.status(errorStatus).send(err)
        next()
    }
});


module.exports = app;
