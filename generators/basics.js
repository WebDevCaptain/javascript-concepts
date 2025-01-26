/*
  A generator is a special type of function that can pause its execution and resume later.

  It is defined using the function* keyword instead of the function keyword, and uses `yield` statements to pause and resume its execution.
*/

function* generateThreeNos() {
  console.log("Generator started");

  yield 1;

  console.log("1st no already generated, moving to 2nd");

  yield 2;

  console.log("2nd no already generated, moving to 3rd");

  yield 3;

  console.log("Generator completed");
}

const gen = generateThreeNos();

console.log(gen.next());
// Generator started
// { value: 1, done: false }

console.log(gen.next());
// 1st no already generated, moving to 2nd
// { value: 2, done: false }

console.log(gen.next());
// 2nd no already generated, moving to 3rd
// { value: 3, done: false }

console.log(gen.next());
// Generator completed
// { value: undefined, done: true }

//
//

// NOTE: We can use a `for...of` loop to iterate over a generator -----------------------------------------
const gen2 = generateThreeNos();

for (let val of gen2) {
  console.log("For-of loop for generator: ", val); // 1 2 3
}

// Console output (iteration wise):
/*
Generator started
For-of loop for generator:  1

1st no already generated, moving to 2nd
For-of loop for generator:  2

2nd no already generated, moving to 3rd
For-of loop for generator:  3

Generator completed
*/

// ------------- Fibonacci generator -------------

function* fibonacciGenerator() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibs = fibonacciGenerator();

// Let's generate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibs.next().value); // 0 1 1 2 3 5 8 13 21 34
}

// 11th Fibonacci number
console.log("11th Fibonacci number: ", fibs.next().value); // 55
