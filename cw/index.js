// class AsynChain {
//   constructor() {
//     console.log(arguments);
//   }
// }

// const asynChain = new AsynChain();

// const request = fetch('https://api.github.com/repositories');

// // Каждый геттер или метод возвращают промис
// const p = asynChain(request).data.user.name[0].toLowerCase();

// p.then((result) => {
//   // andrey
//   console.log(result);
// });



// Create a constructor that uses `Promise` as its super and does the `super` call
// via `Reflect.construct`
// const MyPromise = function(executor) {
//   return Reflect.construct(Promise, [executor], MyPromise);
// };
// // Make `MyPromise` inherit statics from `Promise`
// Object.setPrototypeOf(MyPromise, Promise);
// // Create the prototype, add methods to it
// MyPromise.prototype = Object.create(Promise.prototype);
// MyPromise.prototype.constructor = MyPromise;
// MyPromise.prototype.myMethod = function() {
//   return this.then(str => str.toUpperCase());
// };

// // Usage example 1
// MyPromise.resolve("it works")
//   .myMethod()
//   .then(result => console.log(result))
//   .catch(error => console.error(error));
  

// class AsynChain {
//   constructor() {
//     console.log(arguments);
//   }
// }

function AsynChain() {
  console.log(arguments);
}

const asynChain = new AsynChain();

AsynChain(5);
// const request = fetch('https://api.github.com/repositories');

// Каждый геттер или метод возвращают промис
// const p = asynChain(request).data.user.name[0].toLowerCase();

// p.then((result) => {
//   // andrey
//   console.log(result);
// });