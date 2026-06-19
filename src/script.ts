// //iterface vs type

// //სინტაქსი

// interface Menu {
//   //working only on objects
//   //key: value-type
//   dishes: string[];
//   sum: number;
// }

// const menu1: Menu = {
//   dishes: ["lobster", "fish"],
//   sum: 80,
// };
// console.log(menu1);

// //

// type Bill = {
//   finalSum: number;
//   date?: string;
//   isPayed: boolean;
// };

// const billOne: Bill = {
//   finalSum: 34,
//   date: "jan",
//   isPayed: true,
// };

// console.log(billOne);

// const billTwo: Bill = {
//   finalSum: 90,
//   isPayed: false,
// };
// console.log(billTwo);

// // type bill = []

// //type -ების გაერთიანება

// type User = {
//   name: string;
// };
// type Admin = {
//   password: string;
// };

// type AdminUser = User & Admin;

// const admin1: AdminUser = {
//   name: "magda",
//   password: "hi",
// };
// console.log(admin1);

// //interface - ების გაერთიანება

// interface Pizza {
//   ingredients: string[];
// }

// interface CookingBook {
//   time: number;
// }

// interface CookingBook extends Pizza {}

// const recipt: CookingBook = {
//   ingredients: ["eggs", "salt"],
//   time: 5,
// };
// console.log(recipt);

// //interface merging

// interface Test {
//   grade: number;
// }

// interface Test {
//   date: string;
// }

// const exam: Test = {
//   grade: 10,
//   date: "30",
// };
// console.log(exam);

// //union types

// type Hat = "red" | "green" | "blue";

// const hat: Hat = "green";

// // generics

// function postData<T>(x: T): T {
//   let newX = 45;
//   return x;
// }

// postData<number>(32);

// // let num: number = 56;
