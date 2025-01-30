/*
  An iterator is an object that adheres to the iterator protocol, which means it must have a next() method that:

  Returns an object with two properties:
      value: The current value of the iteration.
      done: A boolean indicating whether the iteration is complete.
*/

const simpleIterator = {
  current: 0,
  limit: 4,

  // next() method defines how the iteration progresses
  next() {
    if (this.current < this.limit) {
      return {
        value: this.current++,
        done: false,
      };
    } else {
      return {
        done: true,
        // value: undefined,
      };
    }
  },
};

console.log(simpleIterator.next()); // { value: 0, done: false }
console.log(simpleIterator.next()); // { value: 1, done: false }
console.log(simpleIterator.next()); // { value: 2, done: false }
console.log(simpleIterator.next()); // { value: 3, done: false }
console.log(simpleIterator.next()); // { done: true }

// --------------  Making Objects Iterable --------------

const iterableObject = {
  current: 0,
  limit: 4,

  [Symbol.iterator]() {
    let current = this.current;
    let limit = this.limit;

    return {
      next() {
        if (current < limit) {
          return {
            value: current++,
            done: false,
          };
        } else {
          return {
            done: true,
            // value: undefined,
          };
        }
      },
    };
  },
};

// Using the `for...of` loop
for (let val of iterableObject) {
  console.log(val); // 0 1 2 3
}

// ----------------- Iterating over a custom object's internal collection -----------------

const shoppingCart = {
  cartItems: ["Bread", "Milk", "Eggs", "Cheese"],

  [Symbol.iterator]() {
    let idx = 0;

    return {
      next: () => {
        if (idx < this.cartItems.length) {
          return { value: this.cartItems[idx++], done: false };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};

for (let cartItem of shoppingCart) {
  console.log(cartItem); // Bread, Milk, Eggs, Cheese
}

// Using generators
const shoppingCart2 = {
  cartItems: ["smartphone", "laptop", "tablet"],

  [Symbol.iterator]: function* () {
    for (let item of this.cartItems) {
      yield item;
    }
  },
};

for (let cartItem of shoppingCart2) {
  console.log("Gadget", cartItem);
}
