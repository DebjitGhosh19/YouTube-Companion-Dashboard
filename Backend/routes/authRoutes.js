const express = require("express");
const router = express.Router();
const { auth, oauth2callback } = require("../controllers/authController");

router.get("/auth", auth);
router.get("/oauth2callback", oauth2callback);

module.exports = router;
