const path = require('path');

const express = require('express');

// const indexController = require('../controllers/index');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

module.exports = router;