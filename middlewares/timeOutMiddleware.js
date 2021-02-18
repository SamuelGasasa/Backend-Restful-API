const express = require("express");
const timeOutMiddleware = express();

timeOutMiddleware.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
});

module.exports = timeOutMiddleware;
