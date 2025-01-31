/*
    Inheritance - Allows child classes to reuse the properties/methods of a parent class.

    * Child classes can also override properties and methods of the parent class.
*/

class Employee {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  describe() {
    console.log(`${this.name} works as a ${this.role}`);
  }

  getBonus() {
    return 1000;
  }

  introduce() {
    console.log(`Hi, my name is ${this.name}`);
  }
}

class Manager extends Employee {
  constructor(name, role, department) {
    super(name, role); // Call parent constructor
    this.department = department;
  }

  describe() {
    super.describe(); // Call parent method
    console.log(`Manages the ${this.department} department`);
  }

  // Method overriding
  getBonus() {
    return 6000;
  }
}

const mgr = new Manager("Bobby", "Manager", "Engineering");
mgr.describe();

console.log(`Manager bonus: ${mgr.getBonus()}`); // 6000

const emp = new Employee("Shreyash", "Staff Engineer");
emp.describe();

console.log(`Employee bonus: ${emp.getBonus()}`); // 1000

// instanceof
console.log(mgr instanceof Employee); // true
console.log(mgr instanceof Manager); // true

console.log(emp instanceof Employee); // true
console.log(emp instanceof Manager); // false

// typeof
console.log(typeof mgr); // object
console.log(typeof Manager); // function

const allEmployees = [mgr, emp];

for (const employee of allEmployees) {
  employee.introduce();
}
// Hi, my name is Bobby
// Hi, my name is Shreyash
