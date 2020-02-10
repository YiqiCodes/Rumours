// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require('express');
const router  = express.Router();

module.exports = function(db) {
  //to display menu in homepage
    router.get('/', (req, res) => {
      db.getMenu(req.query,20)
      .then(dishes => res.send({dishes}))
      .catch(e => {
        console.error(e);
        res.send(e)
      });
    });

  //to send order summary to restaurant
    router.get('/order', (req, res) => {
      const customerId = req.session.customerId;
      db.getOrderSummary({...req.body,customerId})
        .then(order => {
          res.send(order);
        })
        .catch(e => {
          console.error(e);
          res.send(e)
        });
    });

    // to send order total to restaurant
    router.get('/order',(req,res) => {
      const customerId = req.session.customerID;
      db.getOrderTotal({...req.body,customerId})
      .then(total => {
        res.send(total);
      })
      .catch(e => {
        console.log.error(e);
        res.send(e);
      })
    });

  //to generate order in db
  router.post('/order', (req, res) => {
    const customerId = req.session.customerId;
    db.generateOrder({...req.body,customerId})
      .then(order => {
        res.send(order);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });


    return router;
  };






// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM widgets`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const widgets = data.rows;
//         res.json({ widgets });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
