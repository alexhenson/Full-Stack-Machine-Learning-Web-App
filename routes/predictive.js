const path = require('path');

const express = require('express');

const predictiveController = require('../controllers/predictive')

const router = express.Router();

router.get('/predictive', predictiveController.getPredictive);
router.post('/predictive', predictiveController.makePrediction);
router.get('/predictions', predictiveController.getPredictions);

module.exports = router;