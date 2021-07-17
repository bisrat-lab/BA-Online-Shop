const Book = require("../modules/books");
// const Cart = require("../model/cart");
//!Get all Books
module.exports.getAllBooks = (req, res, next) => {
  res.status(200).json(Book.getAll());
};

//!save
exports.save = async (req, res, next) => {
  const book = req.body;
  console.log(book);
  try {
    const savedBook = await new Book(
      null,
      book.title,
      book.isbn,
      book.publishedDate,
      book.author,
      book.price
    ).save();

    res.json(savedBook);
  } catch (error) {
    next(error);
  }
};

//!find By ID
exports.getBookById = (req, res, next) => {
  res.status(200).json(Book.findBookByID(req.params.id));
};

//!Update By ID
exports.update = (req, res) => {
  const book = req.body;
  const updatebook = new Book(
    req.params.id,
    book.title,
    book.isbn,
    book.publishedDate,
    book.author,
    book.price
  ).update();
  res.status(200).json(updatebook);
};

//!Delete By ID
exports.deleteById = (req, res, next) => {
  Book.deleteById(req.params.id);
  res.status(200).end();
};

//!Add to Cart ID

