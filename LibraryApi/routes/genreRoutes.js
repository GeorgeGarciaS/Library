const express = require('express');

const router = express.Router();
const genreController = require('../controllers/genreController');

// Delete request to delete Genre.
router.delete('/:id', genreController.genreDelete);

// Put request to update Genre.
router.put('/:id', genreController.genreUpdate);

// GET request for information in one Genre.
router.get('/:id', genreController.genreDetail);

// POST request for creating Genre.
router.post('/', genreController.genreCreate);

// GET request for list of all Genre.
router.get('/', genreController.genreList);

module.exports = router;
