const socketio = require("socket.io")

module.exports = (app) => {
    const io = socketio(app);
    const lobbyHandler = io.of("/game/lobby");
    lobbyHandler.on("connection", (socket) => {

    console.log("someone connected " + socket.id);
    lobbyHandler.to(socket.id).emit("request room");
    socket.on("I'm here", (roomid) => {
        lobbyHandler.to(roomid).emit("new user", socket.id)
        socket.join(roomid);
        let users = Array.from(lobbyHandler.adapter.rooms.get(roomid));
        console.log(users);
        lobbyHandler
            .to(socket.id)
            .emit("user list", users);
        
    });
    
    });
    return io;
};