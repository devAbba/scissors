const express = require('express');
const urlController = require('../controllers/url.controller');
const snipperRouter = express.Router();
const { CreateUrlValidationMW } = require('../validators/urls.validator')

// routes/snipper.js

/**
 * @swagger
 * /snipper:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder for Urls
 *     description: Retrieve a list of Urls created by the User
*/
snipperRouter.get('/', urlController.urlHistory);

snipperRouter.post('/', CreateUrlValidationMW, urlController.shortenUrl);

module.exports = snipperRouter;