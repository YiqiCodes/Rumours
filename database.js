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
 * @param {string} menu .
 * @return {Promise<[{}]>} A promise to the required function.
 */
const getMenu = function(menu) {
  return pool
    .query(
      `
      SELECT * FROM dishes
  `,
      [menu]
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

const getUserWithEmail = function(email) {
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
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single customer from the database given their id.
 * @param {string} id The id of the customer.
 * @return {Promise<{}>} A promise to the id.
 */
const getUserWithId = function(id) {
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
exports.getUserWithId = getUserWithId;

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
      [order_id]
    )
    .then(res => res.rows);
  // return getOrderSummary
};
exports.getOrderSummary = getOrderSummary;
///orderSummary send to the restaurant

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
      select SUM(total) FROM (
        SELECT order_id,dishes.name AS item,quantity,price,price*quantity as total
        FROM ordered_items
        JOIN dishes ON dishes.id = dish_id
        WHERE order_id = 3
        GROUP BY order_id,dishes.name,quantity,price
        ) as tot;
  `,
      [order_id]
    )
    .then(res => res.rows);
  // return getOrderSummary
};

exports.getOrderTotal = getOrderTotal;
///orderSummary send to the restaurant

/**
 * Add a dish to the database
 * @param {{}} dish An object containing all of the dish details.
 * @return {Promise<{}>} A promise to the dish.
 */
const addDish = function(dish) {
  console.log(dish);
  return pool
    .query(
      `
      INSERT INTO dishes (name,thumbnail_photo_url,price) VALUES ('Chicken Burger','pic1',8);
      VALUES ($1,$2,$3) RETURNING *
      `,
      [
        dish.name,
        dish.thumbnail_photo_url,
        dish.price
      ]
    )
    .then(res => res.rows);
};
exports.addDish = addDish;
