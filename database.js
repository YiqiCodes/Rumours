// const properties = require("./json/properties.json");
// const users = require("./json/users.json");
const { Pool } = require("pg");

//****connect database using node-postgress****//
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm"
});

/**
 * Get all dishes to dashboard.
 * @param {string}  .
 * @return {Promise<[{}]>} A promise to the required function.
 */
const getMenu = function() {
  return pool
    .query(
      `
      SELECT * FROM dishes
  `,
      []
    )
    .then(res => res.rows);
  // return getmenu
};
exports.getMenu = getMenu;

/**
 * Add a new customer to the database.
 * @param {{name: string, password: string, email: string, phone: string}} customer
 * @return {Promise<{}>} A promise to the customer.
 */
const registerCustomer = function(customer) {
  console.log(customer);
  return pool
    .query(
      `
  INSERT INTO users(name,email,password,phone)
  values($1,$2,$3,$4) RETURNING *
  `,
      [customer.name, customer.email, customer.password, customer.phone]
    )
    .then(res => console.log(res.rows));
};
exports.registerCustomer = registerCustomer;

/**
 * Get a single customer from the database given their email.
 * @param {String} email The email of the customer.
 * @return {Promise<{}>} A promise to the customer.
 */

const getCustomerWithEmail = function(email) {
  console.log(email);
  return pool
    .query(
      `
  SELECT * FROM customers
  WHERE email = $1
  `,
      [email.toLowerCase()]
    )
    .then(res => res.rows[0]);
};
exports.getCustomerWithEmail = getCustomerWithEmail;

/**
 * Get a single customer from the database given their id.
 * @param {string} id The id of the customer.
 * @return {Promise<{}>} A promise to the id.
 */
const getCustomerWithId = function(id) {
  return pool
    .query(
      `
  SELECT * FROM customers
  WHERE id = $1
  `,
      [id]
    )
    .then(res => res.rows[0]);
};
exports.getCustomerWithId = getCustomerWithId;

/**
 * Add a new order to the database.
 * @param {{customer_id: INTEGER}} order
 * @return {Promise<{}>} A promise to the order.
 */
const generateOrder = function(order) {
  console.log(order);
  return pool
    .query(
      `
      INSERT INTO orders (customer_id) VALUES ($1) RETURNING *
  `,
      [order.customer_id]
    )
    .then(res => res.rows);
};
exports.generateOrder = generateOrder;

/**
 * Add a new item to ordered-items database.
 * @param {{order_id: INTEGER,dish_id: INTEGER,quantity: price}} item
 * @return {Promise<{}>} A promise to the order.
 */
const generateOrderSummary = function(item) {
  console.log(item);
  return pool
    .query(
      `
      INSERT INTO ordered_items (order_id,dish_id,quantity) VALUES ($1,$2,$3) RETURNING *
  `,
      [item.order_id, item.dish_id, item.quantity]
    )
    .then(res => res.rows);
};
exports.generateOrderSummary = generateOrderSummary;

///to send orderSummary to restaurant
/**
 * Get all order items for a single order.
 * @param {string} order_id The id of the order.
 * @return {Promise<[{}]>} A promise to the order_id
 */
const getOrderSummary = function(order_id) {
  return pool
    .query(
      `
      SELECT order_id,dishes.name AS item,quantity,price,price*quantity AS sum
      FROM ordered_items
      JOIN dishes ON dishes.id = dish_id
      WHERE order_id = $1
      GROUP BY order_id,dishes.name,quantity,price;

  `,
      [3]
    )
    .then(res => res.rows);
  // return getOrderSummary
};
///orderSummary send to the restaurant
exports.getOrderSummary = getOrderSummary;

///to send total price to restaurant
/**
 * Get all order items for a single order.
 * @param {string} order_id The id of the order.
 * @return {Promise<[{}]>} A promise to the order_id
 */
const getOrderTotal = function(order_id) {
  return pool
    .query(
      `
      SELECT SUM(total) FROM (
        SELECT order_id,dishes.name AS item,quantity,price,price*quantity as total
        FROM ordered_items
        JOIN dishes ON dishes.id = dish_id
        WHERE order_id = $1
        GROUP BY order_id,dishes.name,quantity,price
        ) AS tot;
  `,
      [3]
    )
    .then(res => res.rows);
  // return getOrderSummary
};

exports.getOrderTotal = getOrderTotal;
///orderSummary send to the restaurant

// /**
//  * Add a dish to the database
//  * @param {{}} dish An object containing all of the dish details.
//  * @return {Promise<{}>} A promise to the dish.
//  */
// const addDish = function(dish) {
//   console.log(dish);
//   return pool
//     .query(
//       `
//       INSERT INTO dishes (name,thumbnail_photo_url,price) VALUES ('Chicken Burger','pic1',8);
//       VALUES ($1,$2,$3) RETURNING *
//       `,
//       [
//         dish.name,
//         dish.thumbnail_photo_url,
//         dish.price
//       ]
//     )
//     .then(res => res.rows);
// };
// exports.addDish = addDish;
