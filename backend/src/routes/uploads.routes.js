const express = require("express");
const path = require("path");

const routes = express.static(path.resolve(__dirname, "..", "..", "uploads"));

module.exports = routes;
