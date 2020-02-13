/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const VoiceResponse = require("twilio").twiml.VoiceResponse;

module.exports = function() {
  // Create a new customer in db
  router.post("/test", (req, res) => {
    const twiml = new VoiceResponse();
    twiml.say(
      { voice: "alice" },
      "Thank you for ordering. Your order will be ready in twenty minutes."
    );

    // Render the response as XML in reply to the webhook request
    res.type("text/xml");
    res.send(twiml.toString());
  });

  return router;
};
