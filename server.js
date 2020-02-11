// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const usersRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
const homeRoutes = require("./routes/homeRoutes");

// Require API's
const twilioText = require("./apis/twilio");
const db = require("./database");

// cookie-session for customer
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"]
  })
);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Mount all resource routes
// /user/endpoints
app.use("/user", usersRoutes(db));
// /api/endpoints
app.use("/api", apiRoutes(db));

// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// Home page
app.get("/", (req, res) => {
  res.render("index");
});
// when order placed
app.post("/", (req, res) => {
  // twilioText(); UNCOMMENT IF YOU WANT TO TEST WITH REAL #
  res.redirect("order");
});
// this will show the page after order placed with maps on it
app.get("/order", (req, res) => {
  res.render("order");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
