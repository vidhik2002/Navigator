const socket = io();

document.querySelector("#lobby-select").addEventListener("click", () => {
  socket.emit("send-message");
});

socket.on("response", () => {
  console.log("Hey we got signal!!");
});
