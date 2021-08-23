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
  document.getElementById("player-list").appendChild(newplayer);
});

socket.on("user list", (users) => {
  // console.log(Array.from(users));
  for (let user of Array.from(users)) {
    // console.log(user)
    var newplayer = document.createElement("div");
    newplayer.id = user;
    newplayer.innerHTML = user;
    document.getElementById("player-list").appendChild(newplayer);
  }
});

function selectRole(role) {
  let url = new URL(window.location);
  let roomid = url.searchParams.get("roomid");
  switch (role) {
    case 0:
      role = "Blindfolda";
      break;
    case 1:
      role = "Guidea";
      break;
    case 2:
      role = "Blindfoldb";
      break;
    case 3:
      role = "Guideb";
      break;
    default:
      return;
  }
  const userAction = async (roomid, userid, role) => {
    const response = await fetch(`/game/vacancy?roomid=${roomid}&userid=${userid}&role=${role}`);
    const myJson = await response.json();
    console.log(myJson)
  };
  userAction(roomid,socket.id,role)
}

socket.on("user disconnecting", (user) => {
  document.getElementById(user).remove();
});
