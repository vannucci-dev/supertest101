var express = require("express");
var router = express.Router();

//get all users
router.get("/", function (req, res, next) {
  return res.json("all users received");
});
//get specific user
router.get("/:id", function (req, res, next) {
  if (req.params.id === "001") {
    return res.json("user 001");
  }
  return res.status(404).json("user not found");
});
//add user
router.post("/", function (req, res, next) {
  let content = req.body;
  if (content.id && content.name && content.surname && content.phone) {
    return res.status(201).json("user added");
  }
  return res.status(400).json("could not add user");
});

module.exports = router;
