/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = function(db) {

  // Create a new customer
  router.post('/', (req, res) => {
    const customer = req.body;
    customer.password = bcrypt.hashSync(customer.password, 12);
    db.registerCustomer(customer)
    .then(customer => {
      if (!customer) {
        res.send({error: "error"});
        return;
      }
      req.session.customerId = customer.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return db.getCustomerWithEmail(email)
    .then(customer => {
      if (bcrypt.compareSync(password, customer.password)) {
        return customer;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(customer => {
        if (!customer) {
          res.send({error: "error"});
          return;
        }
        req.session.customerId = customer.id;
        res.send({customer: {name: customer.name, email: customer.email, id: customer.id}});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session.customerId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const customerId = req.session.customerId;
    if (!customerId) {
      res.send({message: "not logged in"});
      return;
    }

    db.getCustomerWithId(customerId)
      .then(customer => {
        if (!customer) {
          res.send({error: "no customer with that id"});
          return;
        }

        res.send({customer: {name: customer.name, email: customer.email, id: customerId}});
      })
      .catch(e => res.send(e));
  });

  return router;
};
// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
