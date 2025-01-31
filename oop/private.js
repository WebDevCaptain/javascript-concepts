/*
    Private Properties and Methods provide Encapsulation and Data Hiding.
*/
class User {
  #age = 0; // Private class field (ES6+)
  #password; // Private field
  address; // Public class field

  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  #encryptPassword() {
    // Private method
    return `***${this.#password}***`;
  }

  showPassword() {
    return this.#encryptPassword();
  }

  get age() {
    return this.#age * 100;
  }

  set age(value) {
    this.#age = value % 10;
  }
}

const user = new User("Shreyash", "mysupersecretpassword10010001001");
console.log(user.showPassword()); // ***mysupersecretpassword10010001001***
// console.log(user.#encryptPassword()); // ❌ Error

console.log(user.age); // 0
user.age = 42; // age is set to 2 (since we are taking modulus of age with 10 in the setter)
console.log(user.age); // 200 as we multiplied age by 100 in the getter
