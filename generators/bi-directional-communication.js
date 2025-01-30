/* Bi-directional communication using generators

  Generators allow input to be sent to a generator, and output from a generator to be sent back to the caller.
*/

function* greet() {
  const name = yield "What's your name?";
  yield `Hello, ${name}!`;
}

const greeter = greet();

console.log(greeter.next().value); // What's your name?
console.log(greeter.next("Shreyash").value); // Hello, Shreyash!
