const express = require('express');

const router = express.Router();
const bookController = require('../controllers/bookController');

// DELETE request to delete Book.
router.delete('/:id', bookController.bookDelete);

// PUT request to update Book.
router.put('/:id', bookController.bookUpdate);

// GET request for information on one Book.
router.get('/:id', bookController.bookDetail);

// POST request for creating Book.
router.post('/', bookController.bookCreate);

// GET request for list of all Book items.
router.get('/', bookController.bookList);

module.exports = router;
