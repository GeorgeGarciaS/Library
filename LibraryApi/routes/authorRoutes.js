const express = require('express');

const router = express.Router();
const authorController = require('../controllers/authorController');

// DELETE request to delete Author.
router.delete('/:id', authorController.authorDelete);

// PUT request to update Author.
router.put('/:id', authorController.authorUpdate);

// GET request for details of one Author.
router.get('/:id', authorController.authorDetail);

// POST request for creating Author.
router.post('/', authorController.authorCreate);

// GET request for list of all Authors.
router.get('/', authorController.authorList);

module.exports = router;
