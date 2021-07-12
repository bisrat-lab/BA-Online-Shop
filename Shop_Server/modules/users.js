// const { getUsers } = require("../controllers/usersController");

let allUser = [];
// let x = 1;
module.exports = class User {
  constructor(id, username, firstname, lastname, password) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
  }
 

  static getUsers() {
    return allUser;
  }


  save() {
    this.id = Math.random().toString();
    // this.id = x++;
    // this.id = allUser.length+1;
    allUser.push(this);
    return this;
  }

  update() {
    const index = allUser.findIndex(u => u.id === this.id);
    if (index > -1) {
      allUser.splice(index, 1, this);// splice is like copying
      return this;
    } else {
      throw new Error("Not Found");
    }
  }
};


// exports = class Userrole extends User{
//   constructor(username, password, role) {
//     super(username,password)
//       this.role = role;
//   }

//   login() {
//       return allUsers.find(u => { return u.username === this.username && u.password === this.password });
//   }

//   static init() {
//       allUsers.push(new Userrole('john', 'admin', 'admin'));
//   }
// }
