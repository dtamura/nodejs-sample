const tracer = require("./tracer");

const logger = require("./logger");

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const indexRouter = require('./routes/index');
const healthzRouter = require('./routes/healthz');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/healthz', healthzRouter);
app.use('/users', usersRouter);

module.exports = app;
