const router = require("express").Router();
const mongoose = require("mongoose");
const generator = require("maze-generation");
const bodyParser = require("body-parser");
var uniqid = require("uniqid");
const Room = require("../models/roomModel");

//socket initialization
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

router.get("/create", async (req, res) => {
  const x = parseInt(req.query.x);
  const y = parseInt(req.query.y);
  const time = parseInt(req.query.time);

  if (!(x && y && time)){
    return res.json({
      "msg": "douche"
    })
  }

  const roomid = uniqid();
  const options = {
    width: x,
    height: y,
  };
  const maze = generator(options).toJSON();
  maze.rows[0][x - 1].right = false;
  maze.rows[y - 1][0].left = false;
  const room = await Room.create({ roomid: roomid, maze: maze });
  // res.redirect("/game/guide?maze="+JSON.stringify(maze))
  res.redirect("/game/lobby?roomid=" + roomid);
});

// router.get("/tester", async (req,res) => {
  //   const room = await Room.findOne({ roomid: "57ke0wqckrj5b9h2" });
  //   console.log(room.maze);
  //   res.json(room.maze)
  // })
  
  router.get("/menu", (req, res) => {
    res.render("./menu/main.ejs");
  });
  
  router.get("/setting", (req, res) => {
    res.render("./menu/settings.ejs");
  });
  
  router.get("/join", (req, res) => {
    res.render("./menu/join.ejs");
  });
  
  // var io = req.app.get("socketio");

  router.get("/lobby", async (req, res) => {
    const roomid = req.query.roomid;
    const room = await Room.findOne({ roomid: roomid });
    if (room) {
      res.render("./menu/lobby.ejs", { room: room });
    } else {
      res.json("roomid doesnot exist");
    }
  });

  
router.get("/guide", (req, res) => {
  res.render("guide", {
    maze: JSON.parse(req.query.maze),
  });
});

router.get("/blindfold", (req, res) => {
  res.json({
    msg: "u are accessing blindfold route",
  });
});

router.get("/vacancy", async (req,res) => {
  const { roomid } = req.query;
  const { userid } = req.query;
  const { role } = req.query;
  const room = await Room.findOne({ roomid: roomid });
    if(room[role] == ""){
      room[role] = userid
      room.save()
      return res.json({
        msg: "Selected the role",
      });
    }
    if(room[role] !== userid){
      return res.json({
        "msg": "the role is already taken" 
      })
      }
    if(room[role] == userid){
      room[role] = ""
      room.save()
      return res.json({
        "msg":"Deselected the role"
      })
      }
})

module.exports = router;
