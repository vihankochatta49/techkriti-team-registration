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

// edit route
// router.get("/edit/:slug/:blogNumber", async (req, res) => {
//   const blogs = await blogdb.findOne({ blogNumber: req.params.blogNumber });
//   if (blogs != null) res.render("edit", { blogs });
//   else res.render("404Page");
// });

// // delete route
// router.delete("/:id", async (req, res) => {
//   const blog = await blogdb.findById(req.params.id);
//   const profile = await userdb.findOne({ registerNumber: blog.registerNumber });
//   await blogdb.findByIdAndDelete(req.params.id);
//   res.redirect(`/${profile.slugName}`);
// });

module.exports = router;
