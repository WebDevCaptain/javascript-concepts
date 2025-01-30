/*
    Generator delegation (using yield*): A generator can delegate its execution to another generator.
*/

function* generateThreeNos() {
  console.log("Number generator started");

  yield 2;
  yield 3;
  yield 5;

  console.log("Number generator completed");
}

function* generateNames() {
  console.log("\nName generator started ................");

  yield "Shreyash";
  yield "Jenny";

  console.log("Name generator completed ................");
}

function* combined() {
  console.log("Combined generator started");

  yield* generateThreeNos();

  yield* generateNames();

  console.log("Combined generator completed");
}

const combinedGenerator = combined();

for (const val of combinedGenerator) {
  console.log(val);
}
