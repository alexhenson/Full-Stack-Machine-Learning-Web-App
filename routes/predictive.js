const path = require('path');

const express = require('express');

const predictiveController = require('../controllers/predictive')

const router = express.Router();

router.get('/predictive', predictiveController.getPredictive);

module.exports = router;