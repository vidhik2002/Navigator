const router = require("express").Router();
const mongoose = require("mongoose");
const generator = require("maze-generation");
const bodyParser = require("body-parser");


router.get("/", (req, res) => {
  const x = parseInt(req.query.x);
  const y = parseInt(req.query.y);
  const time = parseInt(req.query.time);

  const options = {
    width: x,
    height: y
  }
  const maze = generator(options);
  res.redirect("/game/guide?maze="+JSON.stringify(maze.toJSON()))
});

router.get("/guide", (req, res) => {
  res.render("guide",{
      maze: JSON.parse(req.query.maze),
  })
});

router.get("/blindfold", (req, res) => {
  res.json({
    msg: "u are accessing blindfold route",
  });
});

module.exports = router;
