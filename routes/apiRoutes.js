// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

module.exports = function(db) {
  router.post("/homes", (req, res) => {
    // twilioText(); UNCOMMENT IF YOU WANT TO TEST WITH REAL #
    res.redirect("/home/order");
  });
  return router;
};
