const winston = require("winston");
const mongoose = require("mongoose");
const config = require('../config/development.json');

module.exports = function () {
  mongoose
    .connect(config.dbconnectionstring, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to MongoDB..."));
};
