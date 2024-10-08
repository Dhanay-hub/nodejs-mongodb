const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const process = require("process");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, {
    filename: "logfile.log",
    level: "error",
  });
};
