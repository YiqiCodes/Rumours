const express = require("express");
const router = express.Router();

module.exports = function(db) {
  router.get("/", (req, res) => {
    db.getMenu(req.query)
      .then(dishes => res.render("index", { dishes: dishes }))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //to send order summary to restaurant & to render "/home/order" page
  router.get("/order", (req, res) => {
    Promise.all([db.getOrderSummary(req.query),db.getOrderTotal(req.query)])
    .then(([order,total])=> res.render("order",{order: order,total}))
    .catch(e => {
      console.error(e);
      res.send(e);
    })
   }); //to generate order in db
  router.post("/order", (req, res) => {
    // const customerId = req.session.customerId;
    console.log(req.body);
    Promise.all([db.generateOrder(...req.body),db.getOrderSummary(...req.body)])
      .then(([order,total]) => {
        res.send(order,total);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });



  return router;
};
// //to generate orderSummary in db
// router.post("/order", (req, res) => {
//   const customerId = req.session.customerId;
//   db.generateOrderSummary({ ...req.body, customerId })
//     .then(order => {
//       res.send(order);
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e);
//     });
// });
