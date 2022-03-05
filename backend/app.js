require("dotenv").config();
require("./config/db").connect();
const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");

const app = express();

// Routes
const Users = require("./routes/users.route");

// Settings
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Routes usage
app.use(Users);

module.exports = app;
