const express = require('express');
const urlController = require('../controllers/url.controller');
const snipperRouter = express.Router();
const { CreateUrlValidationMW } = require('../validators/urls.validator')

snipperRouter.get('/', urlController.urlHistory);

snipperRouter.post('/', CreateUrlValidationMW, urlController.shortenUrl);

module.exports = snipperRouter;