const winston = require("winston");
const config = require('../config');
// Imports the Google Cloud client library for Winston
const { LoggingWinston } = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
  level: config.get('winston.level'),
  format: winston.format.json(),
  defaultMeta: { service: "nodejs-sample" },
  transports: [new winston.transports.Console(),
    // // Add Stackdriver Logging
    // loggingWinston,
  ],
});

module.exports = logger;
