// Trapping a function call

const fetchUserData = (userId) => {
  // API call to fetch data ... .... .... ....

  return {
    id: userId,
    username: "webdevcaptain",
    age: 45,
    isAdmin: true,
  };
};

const handler = {
  apply(target, _thisArg, args) {
    console.log("Before fetching user data from API");

    return target(...args);
  },
};

// Proxying a function
const proxyFetchUserData = new Proxy(fetchUserData, handler);

const user1 = proxyFetchUserData(1);

console.log(user1);
// Console Output:
// Before fetching user data from API
// { id: 1, username: 'webdevcaptain', age: 45, isAdmin: true }

// ------------------------------------

// Trapping a constructor

class Asset {
  constructor(assetId, url, category) {
    this.assetId = assetId;
    this.url = url;
    this.category = category;
  }

  download() {
    console.log(`Downloading asset ${this.assetId} from ${this.url}`);
  }

  getSize() {
    return `Size of asset ${this.assetId} is 30 MB`;
  }
}

const constructorHandler = {
  construct(target, args) {
    console.log("Before creating a new asset instance with arguments:", args);

    return new target(...args);
  },
};

// Proxying a constructor
const AssetProxy = new Proxy(Asset, constructorHandler);

const asset1 = new AssetProxy(1, "https://threejs-assets.com/asset/1", "bed");
console.log(asset1);
// Console Output:
// Before creating a new asset instance with arguments: [ 1, 'https://threejs-assets.com/asset/1', 'bed' ]
// Asset { assetId: 1, url: 'https://threejs-assets.com/asset/1', category: 'bed' }

// ---

// Proxying an instance of a class

const asset1Proxy = new Proxy(asset1, {
  get(target, prop) {
    if (prop === "download") {
      return () => {
        console.log(
          "[FORBIDDEN]: Downloading assets is not allowed for security reasons"
        );
      };
    } else {
      return target[prop];
    }
  },
});

asset1Proxy.download(); // [FORBIDDEN]: Downloading assets is not allowed for security reasons
const size = asset1Proxy.getSize(); // Size method can be invoked as usual

console.log(size); // Size of asset 1 is 30 MB
