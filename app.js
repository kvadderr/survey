const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const surveyRouter = require("./api/survey/router");
const userRouter = require("./api/users/router");
const dataRouter = require("./api/data/router");

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use("/api/survey", surveyRouter);
app.use("/api/users", userRouter);
app.use("/api/data", dataRouter);

app.listen(4000);
console.log("Сервер на порту 4000 запущен");