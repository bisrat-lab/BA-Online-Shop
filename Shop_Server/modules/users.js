let users = [];
class User {
  constructor(id, username, firstname, lastname, password,role) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.role=role;
  }


  static getUsers() {
    return users;
  }


  save() {
    this.id = Math.random().toString();
    // this.id = x++;
    // this.id = users.length+1;
    users.push(this);
    return this;
  }

  update() {
    const index = users.findIndex(u => u.id === this.id);
    if (index > -1) {
      users.splice(index, 1, this);// splice is like copying
      return this;
    } else {
      throw new Error("Not Found");
    }
  }
 login() {
    return users.find(u => u.username == this.username && u.password == this.password);
}

};


// class Userrole{
//   constructor(username, password, role) {
//     this.username = username
//     this.password=password
//     this.role = role;
//   }

//   login() {
//       return users.find(u => { return u.username === this.username && u.password === this.password});
//   }
// }

// const users = [new users('hello', '123', 'admin'),new Userrole('hello', '456', 'user')];


users.push(new User(null,'hello',null,null,'123','admin'))
users.push(new User(null,'hello',null,null, '456', 'user'))
users.push(new User(null,'aa',null,null,'c', 'user'))
// { username: 'aa', firstname: 'jd', lastname: 'b', password: 'c' }

// module.exports = Userrole;
module.exports = User;