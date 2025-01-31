/*
    OOP -> Programming paradigm that uses objects to structure code.
*/

// A. Object Creation -----------------------------------------------

// 1. Using Object Literal
const person = {
  name: "Shreyash",
  age: 30,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

person.greet(); // Hello, my name is Shreyash
/*
    Limitations:
    - No easy way to create multiple objects.
    - Methods are copied to each object, wasting memory.
*/

// 2. Object Constructor functions (prior to es6)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

const u1 = new Person("Shreyash", 30);
u1.greet(); // Hello, my name is Shreyash

// Prototype management is tedious 😓

// 3. ES6 Class Syntax
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, I am a CS student, My name is ${this.name}`);
  }
}

const s1 = new Student("Shreyash", 30);
s1.greet(); // Hello, my name is Shreyash

// Destructuring class properties and methods
const { name, age, greet } = new Student("Shreyash", 30);
console.log(name, age); // Shreyash 30

// Setting appropriate this binding
Reflect.apply(greet, s1, []);
