const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env")})

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors")

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const jobsRouter = require("./router/router.router")

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}));
app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;

