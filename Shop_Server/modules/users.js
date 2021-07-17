
class User {
  constructor(id, username, firstname, lastname, password, role) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.role = role;
  }

  static getUsers() {
    return users;
  }

  checkUserName() {
    if (users.length === 0) {
      return -1;
    } else {
      return users.findIndex((item) => item.username === this.username);
    }
  }

  save() {
    this.id = Math.random().toString();
    // this.id = x++;
    // this.id = users.length+1;
    users.push(this);
    return this;
  }

  update() {
    const index = users.findIndex((u) => u.id === this.id);
    if (index > -1) {
      users.splice(index, 1, this); // splice is like copying
      return this;
    } else {
      throw new Error("Not Found");
    }
  }
  login() {
    return users.find(
      (u) => u.username == this.username && u.password == this.password
    );
  }
}

let users = [new User(null, "username", null, null, "password", "admin"),new User(null, "hello", null, null, "456", "user"),new User(null, "aa", null, null, "c", "user")];

// users.push(new User(null, "hello", null, null, "123", "admin"));
// users.push(new User(null, "hello", null, null, "456", "user"));
// users.push(new User(null, "aa", null, null, "c", "user"));

module.exports = User;
