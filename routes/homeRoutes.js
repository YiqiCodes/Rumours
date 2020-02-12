const express = require("express");
const router = express.Router();
const twilioText = require("../apis/twilio.js");

module.exports = function(db) {
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
    Promise.all([db.getOrderSummary(req.query), db.getOrderTotal(req.query)])
      .then(([order, total]) => {
        res.render("order", { order: order, total });
      })
      .catch(e => {
        console.log.error(e);
        res.send(e);
      });
  });

  //to generate order in db
  router.post("/order", (req, res) => {
    // console.log("REQ BODY ==== > ", req.body);
    const customerId = req.session.customerId;
    db.generateOrder({ ...req.body, customerId })
      .then(order => Promise.all([db.generateOrderSummary(order)]))
      .then(([order, total]) => {
        res.redirect("order");
        return twilioText({ order, total });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
