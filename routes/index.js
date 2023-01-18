const index = require('../controllers/index');
const express = require('express');
const router = express.Router();

router.get('/', index.renderIndex);

