/*
    Property Descriptors: Control how a property is accessed, deleted, iterated and modified.
*/

const user = {
  name: "Shreyash",
  age: 30,
};

// 1. Getting property descriptor  ------------------------------
const propDesc1 = Reflect.getOwnPropertyDescriptor(user, "name");
// console.log(propDesc1);

/*
{ 
    value: 'Shreyash', 
    writable: true, -> Property value can be changed

    enumerable: true, -> Property value can be iterated (appears in for...in loop, Object.keys(), Object.values(), Object.entries(), JSON.stringify(), etc.)

    configurable: true -> Property can be deleted or reconfigured
}
*/

// 2. Defining property descriptor ------------------------------
Reflect.defineProperty(user, "isAdmin", {
  value: true,
  writable: false, // Read-only
  enumerable: true, // Can be iterated
  configurable: false, // Cannot be deleted or modified
});

user.isAdmin = false; // No effect. Cannot change isAdmin as it is read-only
// console.log(user); // { name: 'Shreyash', age: 30, isAdmin: true }

// 3. Preventing property enumeration  ------------------------------
const employee = {
  name: "Shreyash",
  age: 30,

  getSalary() {
    return this.salary;
  },
};

Reflect.defineProperty(employee, "salary", {
  value: 50000,
  enumerable: false,
});

// console.log(Object.keys(employee)); // [ 'name', 'age' ]. salary is not iterated
// console.log(employee.getSalary()); // 50000

// 4. Preventing property deletion  ------------------------------
Reflect.defineProperty(employee, "role", {
  enumerable: true,
  configurable: false,
  value: "Staff Engineer",
});

Reflect.deleteProperty(employee, "role"); // Cannot delete role as it is not configurable
// console.log(employee); // { name: 'Shreyash', age: 30, getSalary: [Function: getSalary], role: 'Staff Engineer' }

// 5. Defining multiple properties at once  ------------------------------
const logger = {};

// NOTE: defineProperties is not available in Reflect API
Object.defineProperties(logger, {
  log1: {
    value: "Log 1",
    enumerable: true,
  },
  log2: {
    value: "Log 2",
    writable: false,
    enumerable: false,
  },
  log3: {
    value: "Log 3",
    enumerable: true,
    configurable: true,
  },
});

console.log(Object.values(logger)); // [ 'Log 1', 'Log 3' ]

// 6. Preventing extensions  ------------------------------
const adminUser = {
  name: "Shreyash",
  userId: 12121,
  password: "mysecretpassword",
};

const locked = Reflect.preventExtensions(adminUser); // Cannot add new properties to adminUser

adminUser.isAdmin = true; // Cannot add new properties to adminUser
delete adminUser.userId; // Deletion is allowed

console.log(adminUser, locked); // { name: 'Shreyash', password: 'mysecretpassword' }

// 7. Getter-Setter with property descriptors  ------------------------------
const student = {
  firstName: "Rajiv",
  lastName: "Agarwal",
};

Reflect.defineProperty(student, "fullName", {
  enumerable: false,

  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  },
});

console.log(student.fullName); // Rajiv Agarwal
student.fullName = "Ravi Prakash";
console.log(student.fullName); // Ravi Prakash

console.log(Object.keys(student)); // [ 'firstName', 'lastName' ]. fullName is not enumerable

// ---

Reflect.defineProperty(student, "COLLEGE", {
  value: "DTU",
  writable: false,
  enumerable: true,
  configurable: false,
});

console.log(Object.keys(student)); // [ 'firstName', 'lastName', 'COLLEGE' ]
console.log(student.COLLEGE); // DTU

// Freezing objects ---------- ------------ -------------- ------------
const party = {
  name: "Birthday Party",
  guests: ["Shreyash", "Jenny", "Rajiv"],
};

Object.freeze(party);

party.place = "Delhi"; // Cannot add new property

party.guests.push("Ravi Prakash"); // Guest array can change as it's a reference and we are not overriding that reference

party.guests = ["Sanya", "Krishna"]; // Cannot override guest array

console.log(party); // { name: 'Party', guests: [ 'Shreyash', 'Jenny', 'Rajiv', 'Ravi Prakash' ] }

// Sealing objects ---------- ------------ -------------- ------------
const gadget = {
  name: "Laptop",
  price: 50000,
};

Object.seal(gadget);

gadget.price = 60000; // Cannot change price

gadget.color = "Black"; // Cannot add new property

console.log(gadget); // { name: 'Laptop', price: 60000 }
