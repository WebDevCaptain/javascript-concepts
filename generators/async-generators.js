// Async Generator allows yield to work with Promises

const getFriend = async (idx) => {
  const friends = ["Gaurav", "Surbhi", "Shashi", "Ananya"];

  // Wait for 1 second
  await new Promise((resolve) => setTimeout(resolve, 500));

  return friends[idx];
};

// async function* asyncFriendsGenerator() {
//   yield Promise.resolve("Gaurav");
//   yield Promise.resolve("Surbhi");
//   yield Promise.resolve("Shashi");
// }

async function* asyncFriendsGenerator() {
  for (let i = 0; i < 4; i++) {
    yield getFriend(i);
  }
}

(async () => {
  for await (const friend of asyncFriendsGenerator()) {
    console.log(friend);
  }
})();
