const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { checkAuthentication } = require("../controllers/auth.js");

const router = express.Router();

router.get("/status", authMiddleware, checkAuthentication);

module.exports = router;
