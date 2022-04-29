const path = require('path');

const express = require('express');

const descriptiveController = require('../controllers/index');

const router = express.Router();

router.get('/', descriptiveController.getDescriptive);

module.exports = router;