const express = require("express");
const userdb = require("./../routes/registerModels");
const router = express.Router();
const app = express();
router.put("/save/:id", async (req, res) => {
  try {
    const art = userdb.findById(req.params.id);

    await userdb.updateMany(art, {
      $set: {
        name: req.body.name,
        techId: req.params.id,
        gender: req.body.gender,
        age: req.body.age,
      },
    });
    res.redirect("/feed");
  } catch (err) {
    console.log(err);
    res.send("Error!!!");
  }
});

module.exports = router;
