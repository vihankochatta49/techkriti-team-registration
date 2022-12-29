const express = require("express");
const userdb = require("./../routes/registerModels");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

//home page
router.get("/", async (req, res) => {
  const profile = req.user;
  res.render("login", { profile });
});

//home page route
router.get("/feed", ensureAuthenticated, async (req, res) => {
  const profile = req.user;
  res.render("dashboard", { profile });
});
module.exports = router;
