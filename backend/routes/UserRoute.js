const express = require("express");
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllusers, getsingleuserdetails, updateRole, deleteuser } = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword); //Nodemailer Done 
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me/profile").get(isAuthenticatedUser ,getUserDetails);
router.route("/me/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/updateprofile").put(isAuthenticatedUser,updateProfile);

//Admin Route
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllusers);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser,authorizeRoles("admin"),getsingleuserdetails)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateRole)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteuser);


module.exports = router;