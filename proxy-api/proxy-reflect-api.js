/* 
  Proxy API works seamlessly with Reflect API
*/

// Example showing basic traps like get, set, delete and has

const user = {
  username: "webdevcaptain",
  password: "mysupersecretpassword10010001001",
  age: 45,
  isAdmin: true,
};

const handler = {
  get(target, prop) {
    // Cannot access password
    if (prop === "password") {
      return "***";
    }

    //   return target[prop];
    return Reflect.get(target, prop);
  },

  set(target, prop, value) {
    // Cannot change username or isAdmin
    if (prop === "username" || prop === "isAdmin") {
      return false;
    }

    //   target[prop] = value;
    //   return true;
    return Reflect.set(target, prop, value);
  },

  deleteProperty(target, prop) {
    // Cannot delete username and password
    if (prop === "username" || prop === "password") {
      return false;
    }

    // delete target[prop];
    // return true;
    return Reflect.deleteProperty(target, prop);
  },

  has(target, prop) {
    // Cannot access password
    if (prop === "password") {
      return false;
    }

    // return prop in target;
    return Reflect.has(target, prop);
  },
};

// Creating a proxy
const proxy = new Proxy(user, handler);

// --------------

// Driver code

// Triggers get trap
console.log(proxy.username); // webdevcaptain
console.log(proxy.password); // *** - password is intercepted by handler and replaced with ***
console.log(proxy.isAdmin); // true
console.log(proxy.age); // 45

// Triggers set trap
proxy.username = "captainwebdev";
proxy.isAdmin = false;
proxy.age = 48;

console.log(proxy.username); // webdevcaptain - username remained unchanged
console.log(proxy.isAdmin); // true - isAdmin remained unchanged because of set trap logic in proxy handler
console.log(proxy.age); // 48 - age changed as handler forwards the change to target object (user)

// Triggers delete trap
delete proxy.username; // username cannot be deleted
delete proxy.password; // password cannot be deleted
delete proxy.age; // age will be deleted

console.log(proxy.username, proxy.password, proxy.age); // webdevcaptain *** undefined

// Triggers has trap
console.log("username" in proxy); // true
console.log("password" in proxy); // false - password cannot be accessed but it is present in the target object

/* 
    console.log(proxy);
  
  ->  {
        username: 'webdevcaptain',
        password: 'mysupersecretpassword10010001001',
        isAdmin: true
      }
  */
