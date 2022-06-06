const express = require("express");
const router = express.Router();

//USER
const UserController = require("./controllers/UserController");
const OrderController = require("./controllers/OrderController");

router.get("/user", UserController.getAllUsers);
router.get("/user/:account", UserController.getUser);
router.post("/user", UserController.registerUser);
router.post("/session", UserController.sessionUser);

//ORDER
router.get("/order", OrderController.getAllOrders);
router.get("/order/:ticket", OrderController.getOrders);
router.post("/order", OrderController.newOrders);
router.put("/order", OrderController.updateOrders);

module.exports = router;
