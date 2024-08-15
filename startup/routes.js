const express = require("express");
const users = require("../routes/user");
const roles = require("../routes/role");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use("/api/users", users);
  app.use("/api/roles", roles);
  app.use(error);
};
