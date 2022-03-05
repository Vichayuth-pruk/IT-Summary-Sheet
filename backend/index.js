const http = require("http");
const app = require("./app");
const server = http.createServer(app);

// Port Selection
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Server start
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
