const express = require("express");
const userdb = require("./../routes/registerModels");
const teamdb = require("./../routes/teamModel");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

//home page route
router.get("/events", ensureAuthenticated, (req, res) => {
  const profile = req.user;
  const events = [{ name: "Workshops" }, { name: "Competitions" }];
  res.render("events", { profile, events });
});

//competitions route
router.get("/:event", ensureAuthenticated, (req, res) => {
  const profile = req.user;
  var comp = [];
  var event = req.params.event;
  if (req.params.event == "Competitions") {
    comp = [
      { name: "Technology" },
      { name: "Entrepreneurial" },
      { name: "Miscellanous" },
    ];
  } else if (req.params.event == "Technology") {
    comp = [
      { name: "ROBOGAMES" },
      { name: "SOFTWARE CORNER" },
      { name: "TAKE OFF" },
      { name: "TECHNOVATION" },
      { name: "ECDC" },
    ];
  } else if (req.params.event == "Entrepreneurial") {
    comp = [
      { name: "FINTECH" },
      { name: "Entrepreneurial Events" },
      { name: "BUSINESS Events" },
    ];
  } else if (req.params.event == "Miscellanous") {
    comp = [
      { name: "DESIGN EVENTS" },
      { name: "MANDAKINI" },
      { name: "MODEL UNITED NATIONS" },
    ];
  }
  res.render("Competitions", { profile, comp, event });
});

router.get("/:events/:id", ensureAuthenticated, async (req, res) => {
  const userDetail = await userdb.findOne({ id: req.params.id });
  var x = {
    event: req.params.events,
    name: userDetail.name,
    id: req.params.id,
  };
  const teamDetail = await teamdb.find({
    competitions: req.params.events,
    memberTechIds: req.params.id,
  });
  console.log(teamDetail);
  res.render("teamregister", { x, teamDetail });
});

router.post("/teamregister/:event/:id", (req, res) => {
  let userId = req.params.id;
  const createDoc = async () => {
    try {
      const userDetail = await userdb.findOne({ id: userId });
      const apprec = new teamdb({
        teamName: req.body.teamName,
        leaderName: userDetail.name,
        leaderTechId: userId,
        memberNames: req.body.memberName,
        memberTechIds: req.body.memberTechId,
        competitions: req.params.event,
      });
      apprec.memberNames.push(userDetail.name);
      apprec.memberTechIds.push(userId);
      var flag = false;
      for (var i = 0; i < apprec.memberTechIds.length; i++) {
        var x = apprec.memberTechIds[i];
        const userValidation = await userdb.findOne({ techId: x });
        if (userValidation == null) {
          res.send("member is not registered on the website");
          flag = true;
          break;
        }
      }
      if (!flag) {
        const teamData = await teamdb.insertMany([apprec]);
      }
      res.redirect("/feed");
    } catch (err) {
      console.log(err);
    }
  };
  createDoc();
});
module.exports = router;
