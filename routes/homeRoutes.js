const express = require("express");
const router = express.Router();

module.exports = function(db) {
  router.get("/order", (req, res) => {
    res.render("order");
  });

  router.get("/", (req, res) => {
    db.getMenu(req.query)
      .then(dishes => res.render("index", { dishes: dishes }))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //to send order summary to restaurant
  router.get("/order", (req, res) => {
    db.getOrderSummary(req.query)
      .then(order => {
        db.getOrderTotal(req.query)
          .then(total => res.json({ total, order }))
          .catch(e => {
            console.log.error(e);
            res.send(e);
          });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //to generate order in db
  router.post("/order", (req, res) => {
    const customerId = req.session.customerId;
    db.generateOrder({ ...req.body, customerId })
      .then(order => {
        res.send(order);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
