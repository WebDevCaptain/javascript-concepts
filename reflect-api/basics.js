/*
    Reflect API - Built-in JS Object that provides utilities for working with objects.

    Uses:
    - Manipulating objects
    - Calling constructors & functions
    - Interacting with Prototypes
    - Handling metadata

    Purpose:
    1. Standardize object operations
    2. Support Proxy API
    
    
    Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
*/

const myself = {
  name: "Shreyash",
  age: 50,
};

// 1. Getting a property value ------------------------------
console.log(Reflect.get(myself, "name"), Reflect.get(myself, "age")); // Shreyash 50

// 2. Setting an object's property ------------------------------
Reflect.set(myself, "age", 51);
Reflect.set(myself, "isAdmin", true);

console.log(myself);
// console.log(Reflect.get(myself, "age"), Reflect.get(myself, "isAdmin"));

// 3. Checking if an object has a property ------------------------------
console.log("Salary is there: ", Reflect.has(myself, "salary"));
console.log("Name is there: ", Reflect.has(myself, "name"));

// 4. Deleting a property  ------------------------------
Reflect.deleteProperty(myself, "isAdmin");

console.log(myself);

// 5. Listing all the properties (non-inherited) of an object  ------------------------------
console.log("My keys", Reflect.ownKeys(myself)); // [ 'name', 'age' ]

// 6. Calling a function with a specific this value  ------------------------------
const user = {
  name: "Shreyash",
  age: 50,
};

function sayHello(greeting1, greeting2) {
  return `Hello, ${this.name}!. ${greeting1}, ${greeting2}`;
}

const val = Reflect.apply(sayHello, user, [
  "How are you?",
  "Hope you are doing well.",
]); // Hello, Shreyash!. How are you?, Hope you are doing well.

console.log(val);

// 7. Checking and modifying prototypes  ------------------------------
const person = {
  role: "User",
};
const admin = {
  permissions: ["read", "write"],
};

Reflect.setPrototypeOf(admin, person); // admin.__proto__ = person

console.log("Admin role:", admin.role); // User
console.log("Admin permissions", admin.permissions); // ["read", "write"]

console.log(Reflect.getPrototypeOf(admin), admin.__proto__); // { role: 'User' } { role: 'User' }

console.log(Reflect.ownKeys(admin)); // ['permissions']

// 8. Calling a constructor  ------------------------------
class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  get rgb() {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  }
}

const color = Reflect.construct(Color, [255, 200, 128]);
console.log(Reflect.get(color, "rgb"));
