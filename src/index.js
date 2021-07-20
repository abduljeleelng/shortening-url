const express = require('express');
const dbConnection = require('./config');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const swaggerUi = require('swagger-ui-express')
const cors = require("cors");
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require("dotenv");
const path = require('path')
dotenv.config();
dbConnection();


const swagerFile = require('../docs/swagger_output.json');
const router = require('./app');

app.use(compression()); //Compress all routes
app.use(helmet()); //vulerabiliy  manage
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swagerFile));

app.use("/api/v1", router);

app.use("/api", (req, res)=>{
    res.json({message:"shortening url", doc:"https://short-url-dev.herokuapp.com/api/v1/doc/", app:"https://short-url-dev.herokuapp.com/api/v1"});
});

app.use("/", (req, res)=>{
    res.json({message:"shortening url", doc:"https://short-url-dev.herokuapp.com/api/v1/doc/", app:"https://short-url-dev.herokuapp.com/api/v1"});
});

module.exports = app;