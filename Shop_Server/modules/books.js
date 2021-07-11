let books = [];
class Books {
  constructor(id, title, isbn, publishedDate, author) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
    this.publishedDate = publishedDate;
    this.author = author;
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

  static findBookByID(bookId) {
      const index = books.findIndex(b => b.id === bookId);
      if(index >-1){
          return books[index];
      }else{
          throw new Error('Book Not found');
      }
  
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



