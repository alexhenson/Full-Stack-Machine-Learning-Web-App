const path = require('path');

const express = require('express');

const descriptiveController = require('../controllers/index');

const router = express.Router();

// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(rootDir, 'views', 'index.html'));
// });

router.get('/', descriptiveController.getDescriptive);

module.exports = router;