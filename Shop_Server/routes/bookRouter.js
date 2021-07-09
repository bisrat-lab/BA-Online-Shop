const express = require('express');
const router = express.Router();
const bookControllers = require('../Controllers/booksControllers');

//!Get all books
router.get('/',bookControllers.getAllBooks);

//!Get Book by ID
router.get('/:id',bookControllers.findBookById);

//!Add new Books
router.post('/',bookControllers.save);

//!Update existing Books
router.put('/:id',bookControllers.update);

//!Delete Books by id 
router.delete('/:id',bookControllers.deleteById);

module.exports = router;