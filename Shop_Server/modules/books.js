let books = [{
  id: "122",
  title: "Book of Ella",
  isbn: "2345-3223",
  publishedDate: "12/12/1212",
  author:"adfad",
  price : 33
},
{
  id: "2",
  title: "The Moon",
  isbn: "2345-345",
  publishedDate: "12/12/1212",
  author:"adfad",
  price : 25
}];

let count = 1;
class Books {
  constructor(id, title, isbn, publishedDate, author,price) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
    this.publishedDate = publishedDate;
    this.author = author;
    this.price = price;
  }
  static getAll() {
    return books;
  }
  save() {
     this.id = count++;
    books.push(this);
    return this;
  }
  update(){
      const index = books.findIndex(b=> b.id == this.id)
      if(index > -1){
          books.splice(index,1,this);
          return this;
      }else {
          throw new Error('Not Found')
      }
  }

  static findBookByID(bookId) {
      const index = books.findIndex(b => b.id == bookId);
   
      if(index >-1){
          return books[index];
      }else{
          throw new Error('Book Not found');
      }
  
  }

  static deleteById(bookId){
      const index = books.findIndex(b=>b.id == bookId);
      if(index > -1){
          books = books.filter(b=>b.id !== bookId);
      }else {
        throw new Error('Not Found');
    }
  }



}
module.exports = Books;



