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

function selectRole(roleno) {
  let url = new URL(window.location);
  let roomid = url.searchParams.get("roomid");
  switch (roleno) {
    case 0:
      role = "Guidea";
      break;
    case 1:
      role = "Blindfolda";
      break;
    case 2:
      role = "Guideb";
      break;
    case 3:
      role = "Blindfoldb";
      break;
    default:
      return;
  }

  let button = document.querySelectorAll(`div.lobby-boxes > a > div`).item(roleno)
  console.log(button)
  
  if (button.classList.contains('green')){
    console.log("Already taken: frontend")
  } else {
    button.classList.toggle('blue')
    roleChange(roomid,socket.id,role)
    socket.emit("togglerole", [roomid, roleno])
  }
}

const roleChange = async (roomid, userid, role) => {
  const response = await fetch(`/game/vacancy?roomid=${roomid}&userid=${userid}&role=${role}`);
  const myJson = await response.json();
  console.log(myJson)
};

socket.on("user disconnecting", (user) => {
  document.getElementById(user).remove();
});

socket.on("togglerole", (role) => {
  let button = document.querySelectorAll(`div.lobby-boxes > a > div`).item(role)
  button.classList.toggle('green')
});