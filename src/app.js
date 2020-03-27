const { errors } = require("celebrate");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(errors());
app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;