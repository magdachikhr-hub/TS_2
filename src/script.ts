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

//
// 1.  define  'Pizza' type/interface with 'name' (string) and 'price' (number)
// // 2. define  'Order' type/interface with 'id' (number), 'pizza' (Pizza), and 'status' ("ordered" | "completed")

// interface Pizza {
//   name: string;
//   price: number;
// }
// interface Order {
//   id: number;
//   pizza: Pizza;
//   status: "ordered" | "completed";
// }

// let cashInRegister = 0;
// let nextOrderId = 1;

// //set types to these arrays
// const menu: Pizza[] = [];
// const orderQueue: Order[] = [];

// function addNewPizza(pizzaObj: Pizza) {
//   menu.push(pizzaObj);
// }

// function placeOrder(pizzaName: string) {
//   const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
//   if (!selectedPizza) {
//     console.error(`${pizzaName} does not exist in the menu`);
//     return;
//   }
//   cashInRegister += selectedPizza.price;
//   const newOrder: Order = {
//     id: nextOrderId++,
//     pizza: selectedPizza,
//     status: "ordered",
//   };
//   orderQueue.push(newOrder);
//   return newOrder;
// }

// // TypeScript warns that 'order' might be 'undefined' because .find() can fail

// function completeOrder(orderId: number) {
//   const order: Order | undefined = orderQueue.find(
//     (order) => order.id === orderId,
//   );

//   // fix the red line under 'order.status', check if the order exists, if not - return

//   if (!order) {
//     return;
//   }

//   order.status = "completed";

//   return order;
// }

// // --- test data & execution ---

// addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
// addNewPizza({ name: "BBQ Chicken", price: 12 });
// addNewPizza({ name: "Spicy Sausage", price: 11 });

// placeOrder("Chicken Bacon Ranch");
// completeOrder(1);

// console.log("Menu:", menu);
// console.log("Cash in register:", cashInRegister);
// console.log("Order queue:", orderQueue);
