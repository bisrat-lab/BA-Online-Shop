let books = [];
class Books {
  constructor(id, title, price, info) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.info = info;
  }
  static getAll() {
    return books;
  }
  save() {
    this.id = Math.random().toString();
    books.push(this);
    return this;
  }
  update(){
      const index = books.findIndex(b=> b.id === this.id)
      if(index > -1){
          books.splice(index,1,this);
          return this;
      }else {
          throw new Error('Not Found')
      }
  }

  static getBookByID(bookId) {
    return books.find((book) => book.id === bookId);
  }

  static deleteById(bookId){
      const index = books.findIndex(b=>b.id === bookId);
      if(index > -1){
          books = books.filter(b=>b.id !== bookId);
      }else {
        throw new Error('Not Found');
    }
  }
}
module.exports = Books;



