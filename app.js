const express = require('express');
const bodyParser = require('body-parser');
const winston = require("winston");

const app = express();

app.use(bodyParser.json());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`Listening on port ${port}...`));