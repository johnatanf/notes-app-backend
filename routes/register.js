const express = require("express");
const { createUserAccount } = require("../controllers/register.js");

const router = express.Router();

router.post("/", createUserAccount);

module.exports = router;
