const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const userdb = require("/routes/registerModel");
const teamdb = require("/routes/teamModel");
app.use(cors());
app.use(express.json());

//body parser
app.use(express.urlencoded({ extended: false }));

// Connecting with database
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blogs")
  .then(() => console.log("Connection successful..."))
  .catch((err) => console.log(err));

app.get("/api/", (req, res) => console.log("Hello I got here"));

// deleting task
// app.post("/api/delete-task", (req, res) => {
//   const id = req.body.id;
//   User.findById(id, (err, response) => {
//     if (err) res.sendStatus(504).send(err);
//     else res.sendStatus(204).send(response);
//   });
// });

// updating-profile
app.post("/api/update-profile", (req, res) => {
  const uid = req.body.uid;
  const name = req.body.name;
  const email = req.body.email;
  const techid = req.body.techid;
  const gender = req.body.gender;
  const age = req.body.age;
  userdb.updateOne(
    { uid: uid },
    {
      name: name,
      email: email,
      age: age,
      gender: gender,
    },
    (err, response) => {
      if (err) res.send(err);
      else res.send(response);
    }
  );
});
//creating task
app.post("/api/teamRegister/:event/:uid", async (req, res) => {
  const uid = req.params.uid;
  const userDetail = await userdb.findOne({ id: uid });
  const teamName = req.body.teamName;
  const leaderName = userDetail.name;
  const leaderTechId = uid;
  const competitions = req.params.event;
  const newTeam = new teamdb({
    teamName: teamName,
    leaderName: leaderName,
    leaderTechId: leaderTechId,
    memberNames: req.body.memberName,
    memberTechIds: req.body.memberTechId,
    competitions: competitions,
  });

  newTeam.memberNames.push(userDetail.name);
  newTeam.memberTechIds.push(uid);
  var flag = false;
  for (var i = 0; i < newTeam.memberTechIds.length; i++) {
    var x = newTeam.memberTechIds[i];
    const userValidation = await userdb.findOne({ techId: x });
    if (userValidation == null) {
      res.send("member is not registered on the website");
      flag = true;
      break;
    }
  }
  if (!flag) {
    // const teamData = await teamdb.insertMany([apprec]);
    newTeam.save({}, (err, response) => {
      if (err) res.send(err);
      else res.send(response);
    });
  }
});
app.get("/api/tasks", (req, res) => {
  Task.find()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => res.send(err));
});

// module.exports = router;
app.listen(4000, () => {
  console.log("App listening on port: 4000");
});
Footer;
