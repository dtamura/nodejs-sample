'use strict';

const convict = require('convict');
const convict_format_with_validator = require('convict-format-with-validator');
const fs = require('fs');
const path = require('path');

convict.addFormats(convict_format_with_validator);

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  winston: {
    level: {
      doc: 'winston log level',
      format: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'],
      default: 'info',
      env: 'WINSTON_LOG_LEVEL',
    },
  },
  ci: {
    doc: `Flag indicating whether we're running on a CI server`,
    format: Boolean,
    default: false,
    env: 'CI',
  },
});

const configFilePath = path.join(__dirname, `${config.get('env')}.json`);
if (fs.existsSync(configFilePath)) {
  config.loadFile(configFilePath);
}
config.validate({allowed: 'strict'});

module.exports = config;
