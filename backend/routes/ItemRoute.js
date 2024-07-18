const express = require("express");
const { getAllItems, createItem, updateItem, deleteItem, getItemDetail, itemReview, getItemsReviews, deleteItemReview, getAdminAllItems } = require("../controllers/ItemController");
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");
const router = express.Router();

router.route("/items").get(getAllItems);
router.route("/admin/item/create")
.post(isAuthenticatedUser,authorizeRoles("admin"), createItem);
router.route("/admin/item/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateItem)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteItem)
router.route("/admin/allItems").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminAllItems);

router.route("/item/:id").get(getItemDetail);
router.route("/review").put(isAuthenticatedUser,itemReview);
router.route("/reviews")
    .get(getItemsReviews)
    .delete(isAuthenticatedUser,deleteItemReview);

module.exports = router;