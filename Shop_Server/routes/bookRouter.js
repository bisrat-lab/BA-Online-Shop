const express = require('express');
const router = express.Router();
const userController = require('../Controllers/rolecontroller');
const bookControllers = require('../Controllers/booksControllers');

//!Get all books
router.get('/',bookControllers.getAllBooks);

//!Get Book by ID
router.get('/:id',bookControllers.getBookById);

//!Add new Books
router.post('/',userController.authorizeAdmin,bookControllers.save);

//!Update existing Books
router.put('/:id',userController.authorizeAdmin,bookControllers.update);

//!Delete Books by id 
router.delete('/:id',userController.authorizeAdmin,bookControllers.deleteById);


module.exports = router;
