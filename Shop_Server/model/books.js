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

  static getBooksByID(BooksID) {
    return books.find((prod) => prod.id === BooksID);
  }

  static deleteById(BooksId){
      const index = books.findIndex(b=>b.id === BooksId);
      if(index > -1){
          books = books.filter(b=>b.id !== BooksId);
      }else {
        throw new Error('Not Found');
    }
  }
}
module.exports = Books;



