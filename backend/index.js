require("dotenv").config();
const colors = require("colors");
const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middlewares");
app.use(cors());
app.use(logger);

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const usersRouter = require("./routes/users");

// Routers Using
app.use(usersRouter.router);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server is started and Connected to port ${port}`.rainbow);
});
