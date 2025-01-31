/*
    Static Methods and Properties - Belong to the class itself, not the instances of the class.
*/

// Static Method (implementing singleton pattern)
class LogWriter {
  static instance;

  static getInstance() {
    if (!LogWriter.instance) {
      LogWriter.instance = new LogWriter();
    }
    return LogWriter.instance;
  }
}

const logWriter1 = LogWriter.getInstance();
const logWriter2 = LogWriter.getInstance();
console.log(logWriter1 === logWriter2); // true

// Static Property ------------------------------------------------------------------------------------------
class Circle {
  static PI = 3.14;

  static area(radius) {
    return Circle.PI * radius * radius;
  }

  static perimeter(radius) {
    return 2 * this.PI * radius; // this refers to the Circle class in a static method, so this.PI is equivalent to Circle.PI
  }
}

console.log(`Value of PI: ${Circle.PI}`); // Value of PI: 3.14

console.log(`Area of a circle with radius 5: ${Circle.area(5)}`); // Area of a circle with radius 5: 78.5

console.log(`Perimeter of a circle with radius 10: ${Circle.perimeter(10)}`); // Perimeter of a circle with radius 10: 62.8
