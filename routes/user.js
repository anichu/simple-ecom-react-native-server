const express = require("express");
const { registerUser, authUser, users } = require("../controllers/user");
const router = express.Router();

router.route("/").post(registerUser).get(users);
router.route("/login").post(authUser);

module.exports = router;
