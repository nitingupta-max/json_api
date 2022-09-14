const express = require("express");
const route = express.Router();
const controller = require("../controller/controller");

route.get("/todos", controller.todos);
route.get("/user/:id", controller.user);

module.exports = route;
