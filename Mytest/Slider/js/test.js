// "use strict";

// function getPizza() {
//   return new Promise((resolved) => {
//     var https = new XMLHttpRequest(); // Create an XMLHttpRequest Object

//     // method https --> GET , POST , PUT , DELETE
//     https.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pizza"); // connection established
//     https.send(); // send request
//     https.addEventListener("load", (e) => {
//       console.log("getPizza----->", "done");
//       // console.log(e);
//       // console.log(https.readyState);

//       // recipesList=  JSON.parse(https.response).recipes
//       // displayData();
//     });

//     resolved();
//   });
// }

// function getCorn() {
//   return new Promise((resolved) => {
//     var https = new XMLHttpRequest(); // Create an XMLHttpRequest Object

//     // method https --> GET , POST , PUT , DELETE
//     https.open("GET", "https://forkify-api.herokuapp.com/api/search?q=corn"); // connection established
//     https.send(); // send request
//     https.addEventListener("load", (e) => {
//       console.log("getCorn----->", "done");
//       // console.log(e);
//       // console.log(https.readyState);

//       // recipesList=  JSON.parse(https.response).recipes
//       // displayData();
//     });
//     resolved();
//   });
// }

// function getPasta(callback) {
//   return new Promise((resolve) => {
//     var https = new XMLHttpRequest(); // Create an XMLHttpRequest Object

//     // method https --> GET , POST , PUT , DELETE
//     https.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pasta"); // connection established
//     https.send(); // send request
//     https.addEventListener("load", (e) => {
//       console.log("getPasta----->", "done");
//       // console.log(e);
//       // console.log(https.readyState);

//       // recipesList=  JSON.parse(https.response).recipes
//       // displayData();
//     });
//     resolve();
//   });
// }

// function allDone() {
//   console.log("All  Done");
// }

// // console.log("start")
// // getPizza()
// // getCorn()
// // getPasta()
// // console.log("End")

// //---------------------CALLBACK FUNCTIONS---------------------

// // getPizza(function () {
// //   getPasta(function () {
// //     getCorn(allDone);
// //   });
// // });

// // function one(callback) {
// //     console.log("one")
// //    callback();
// //    }

// //    function two(callback) {
// //     console.log("two")
// //    callback();
// //    }

// //    function three(callback) {
// //     console.log("three")
// //    callback();
// //    }

// //    function finish(){
// //     console.log("finish")
// //    }

// //    three(function(){

// //            two(function(){

// //                                one(function(){
// //                                        finish()

// //                                    })
// //                    })
// //      })

// //--------promise functions----------------
// // getCorn().then(()=>{getPasta()}).then(()=>{getPizza()}).finally(()=>{allDone()})

// let person = {
//   fullName: "ahmed",
//   age: 30,
//   salary: 3000,
//   son: {
//     fullName: "ali ahmed",
//     age: 10,
//     gender: "male",
//   },
// };

// // aliase name & default value      aliase name     aliase name                                     default value
// let {
//   fullName: moName = "mo",
//   fullName: parentName,
//   age: parentAge,
//   salary,
//   son,
//   son: { gender, fullName, age = 86 },
// } = person;

// console.log(parentName, age, son, fullName, gender, moName);

// // ---------------------------

// let [x, y, z, m] = ["ah", "mo", "mk"];

// console.log(x, y, z, m);

// let [, , ff] = ["ah", "mo", "mk"];
// console.log(ff);

// // ----------------------
// // this قيمتها بتتغير حسب المكان الموجودة فية
// //في 5 و 6  حالات ليها
// // 1- this in top-level ----> point to (window)

// console.log(" 1- this in top-level ", this);

// // 2- this in function ----> point to (علي حسب )
// // ولا لا  (use strict) علي حسب ما استخدم
// //function (use strict)----> point to (undfine)
// //function (not use strict)----> point to (window)
// function moTest() {
//   console.log("2- this in function ", this);
// }
// moTest();

// //3- this in event ----> point to (ele where  event work on it )  == event.currentTarget.

// document.body.addEventListener("click", function (e) {
//   // point to (ele where  event work on it ) ---> body in this case
//   console.log("3- this in event ", this);
//   console.log("3- this in event ", e.currentTarget);
// });

// //4- this in function and fun. in obj ----> point to (obj that hold fun. )

// let person33 = {
//   fullName: "ahmed",
//   age: 30,
//   salary: 3000,
//   son: {
//     fullName: "ali ahmed",
//     age: 10,
//     gender: "male",
//   },
//   test: function () {
//     console.log("4- this in function and fun. in obj  ", this);
//     console.log("4- this in function and fun. in obj  ", this.salary);
//   },
// };
// person33.test();
// // why using this while can use obj direct?
// //ans: if obj name can change , we will change it inside code

// //5- this in function in another fun. in obj ----> point to (علي حسب )

// let person55 = {
//   fullName: "ahmed",
//   age: 30,
//   salary: 3000,
//   son: {
//     fullName: "ali ahmed",
//     age: 10,
//     gender: "male",
//   },
//   test: function () {
//     function testIn() {
//       //----------> create foق itself new context
//       console.log("5- this in function in another fun. in obj ", this);

//       // ولا لا  (use strict) علي حسب ما استخدم
//       //function (use strict)----> point to (undfine)
//       //function (not use strict)----> point to (window)
//     }
//     testIn();
//   },
// };
// person55.test();

// // SOLVE PROBLEM FRO NUM.5 before ES6

// let person55A = {
//   fullName: "ahmed",
//   age: 30,
//   salary: 3000,
//   son: {
//     fullName: "ali ahmed",
//     age: 10,
//     gender: "male",
//   },
//   test: function () {
//     let that = this; //------>point to obj
//     function testIn() {
//       //----------> create foق itself new context
//       console.log("5- this in function in another fun. in obj ", this);
//       console.log("5- solve the problem ", that);

//       // ولا لا  (use strict) علي حسب ما استخدم
//       //function (use strict)----> point to (undfine)
//       //function (not use strict)----> point to (window)
//     }
//     testIn();
//   },
// };
// person55A.test();

// let nums = [10, 20, 30, 40, 50, 60, 70];

// for (const item of nums) {
//   console.log(item);
// }

// for (const key in person55A) {
//   console.log(key);
// }

// let personMap = new Map();

// personMap.set("name", "ahmed");
// personMap.set("age", 30);
// personMap.set("salary", 5000);
// personMap.set("isMarried", false);

// console.log(personMap);
// console.log(personMap.get("salary"));
// console.log(personMap.has("age"));
// console.log(personMap.values());

// for (const iterator of personMap.values()) {
//   console.log(iterator);
// }
// console.log(personMap.keys());
// console.log(personMap.entries());

// for (const entery of personMap) {
//   console.log(entery); //array of [key , value]
// }
// for (const [x, y] of personMap) {
//   console.log(x, y); //array of [key , value]
// }

// console.log(personMap.delete("salary"));

// console.log(personMap);

// personMap.clear();

// console.log(personMap);

// for (const iterator of personMap) {
//   console.log("------>", iterator);
// }

// // 1- obj -----> Map
// //map taake only entries

// let pMap = new Map(Object.entries(person55A));

// // 2- map ---> obj
// Object.fromEntries(pMap);

// // -----------------------------------------

// let per1 = {
//   fullName: "ahmed",
//   age: 30,
//   salary: 3000,
// };

// delete per1.salary;
// console.log(per1);

// console.log("salary" in per1);

// let nums2 = new Set();
// nums2.add(10);
// nums2.add(20);
// nums2.add(30);
// nums2.add(40);
// nums2.add(40);
// nums2.add(40);
// nums2.add(40);
// nums2.add(40);

// console.log(nums2); //[ 10, 20, 30, 40 ]
// console.log(nums2.has(30));
// console.log(nums2.delete(50));
// console.log(nums2.values());
// console.log(nums2.keys());

// // -------------

// // array ---> set
// const letters = new Set(["a", "b", "c"]);

// // set ---> array

// Array.from(letters);

// //another way
// let yy = [...letters];

// let pro = new Promise((resolve, reject) => {
//   let x = 2;
//   if (x == 1) {
//     resolve("success");
//     return 55;
//   } else {
//     reject("failed");
//   }
// });

// let data2 = pro
//   .then((meg) => {
//     console.log("inside then --->", meg);
//     return 55;
//   })
//   .then((x) => {
//     console.log(5);
//   })
//   .catch((mse) => {
//     console.log(mse);
//   });
// console.log(pro);

// let promiseRes = fetch("https://forkify-api.herokuapp.com/api/search?q=corn").json();



// fetch("https://forkify-api.herokuapp.com/api/search?q=corn")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

//   async function getRecipes2() {
//     var response = await fetch("https://forkify-api.herokuapp.com/api/search?q=corn");//----by defuate is GET 
//     var data = await response.json();//-----------------------------------------------> await لازم تعمل 
  
//       console.log(data )
//   }



// async function testMo222(params) {
//   let data2 = await pro
  
  
// console.log(pro);
// }




