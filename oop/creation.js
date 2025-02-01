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

// ----------   --------    ---------     --------     --------     --------     --------
// Prototype Chaining

// student object -> Student.prototype -> Object.prototype

class Fruit {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log(`Eat me. I am a ${this.color} fruit.`);
  }
}

class Apple extends Fruit {
  constructor(color) {
    super(color);
  }

  describe() {
    console.log(`I am a ${this.color} colored apple.`);
  }
}

const a1 = new Apple("Red");
console.dir(a1);

// Currently a1 -----> Apple.prototype -----> Fruit.prototype -----> Object.prototype

console.log(Reflect.getPrototypeOf(a1)); // Apple.prototype

console.log(Reflect.getPrototypeOf(Reflect.getPrototypeOf(a1))); // Fruit.prototype

console.log(
  Reflect.getPrototypeOf(Reflect.getPrototypeOf(Reflect.getPrototypeOf(a1)))
); // Object.prototype

// Let's add one more method to a1's prototype

Reflect.setPrototypeOf(a1, {
  // ...Reflect.getPrototypeOf(a1), // Doesn't work in strict mode
  healthBenefits() {
    console.info(`${this.color} apple is good for health.`);
  },
});

// a1.eat(); // Doesn't work in strict mode

console.log(Reflect.getPrototypeOf(a1)); // { healthBenefits() }

const a2 = new Apple("Yellow");
console.log(Reflect.getPrototypeOf(a2)); // { healthBenefits() } is missing as we didn't modified a2's prototype
