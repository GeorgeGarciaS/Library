const express = require('express');

const router = express.Router();
const bookController = require('../controllers/bookController');

// GET base information of amount of entries in the database
router.get('/', bookController.index);

module.exports = router;
