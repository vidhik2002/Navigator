const socket = io("/game/lobby");

socket.on("request room", () => {
  console.log("Hey we got signal!!");
  let url = new URL(window.location);
  let roomId = url.searchParams.get("roomid");
  socket.emit("I'm here", roomId);

});

socket.on("new user", (user) => {
  var newplayer = document.createElement("div");
  newplayer.id = user;
  newplayer.innerHTML = user;
  document.getElementById("player-list").appendChild(newplayer)
  
})
socket.on("user list", (users) => {
  console.log(Array.from(users));
  for(let user of Array.from(users)){
    console.log(user)
    var newplayer = document.createElement("div");
    newplayer.id = user;
    newplayer.innerHTML = user;
    document.getElementById("player-list").appendChild(newplayer)

  }

})
