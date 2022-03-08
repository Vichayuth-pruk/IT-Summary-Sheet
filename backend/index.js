require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require('./middlewares')
app.use(cors());
app.use(logger)

// Statics
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const userRouter = require("./routes/user");

app.use(userRouter.router);

// Port Selection
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
