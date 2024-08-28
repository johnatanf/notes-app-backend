const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { checkAuthentication, logoutUser } = require("../controllers/auth.js");

const router = express.Router();

router.get("/status", authMiddleware, checkAuthentication);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
