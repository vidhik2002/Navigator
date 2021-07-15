const router = require("express").Router();
const mongoose = require("mongoose");
const generator = require("maze-generation");


router.get("/", (req, res) => {
  res.json({
    msg: "u are accessing maze route",
  });
});

module.exports = router;
