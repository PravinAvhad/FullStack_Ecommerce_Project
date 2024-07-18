const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { createnewOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser,createnewOrder);
router.route("/myorders").get(isAuthenticatedUser,myOrders);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrderDetails);

//Admin Routes
router.route("/admin/allorders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.route("/admin/order/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);
module.exports = router;