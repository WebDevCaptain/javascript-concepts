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
console.log(Reflect.get(myself, "name"), Reflect.get(myself, "age"));

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
console.log("My keys", Reflect.ownKeys(myself));
