const express = require("express");
const router = express.Router();
const twilioText = require("../apis/twilio.js");

module.exports = function(db) {
  router.get("/", (req, res) => {
    db.getMenu(req.query)
      .then(dishes => {
        const grouped = {
          starters: dishes.filter(dish => dish.type === "starters"),
          mains: dishes.filter(dish => dish.type === "mains"),
          desserts: dishes.filter(dish => dish.type === "desserts"),
          cocktails: dishes.filter(dish => dish.type === "cocktails")
        };
        res.render("index", { dishes: grouped });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //to send order summary to restaurant
  router.get("/order/:orderId", (req, res) => {
    Promise.all([db.getOrderSummary(req.params), db.getOrderTotal(req.params)])
      .then(([order, total]) => {
        res.render("order", { order: order, total });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //to generate order in db
  router.post("/order", (req, res) => {
    const customerId = 1;
    db.generateOrder({ ...req.body, customerId })
      .then(orderId => {
        db.generateOrderSummary(orderId, req.body).then(() => {
          res.redirect(`order/${orderId}`);
          return twilioText({ ...req.body });
        });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

// const customerId = 1;
// db.generateOrder({ ...req.body, customerId }) // good
//   .then(order => Promise.all([db.generateOrderSummary(order)]))
//   .then(([order, total]) => {
//     res.redirect("order");
//     // return twilioText({ order, total });
//   })
//   .catch(e => {
//     console.error(e);
//     res.send(e);
//   });
// });
