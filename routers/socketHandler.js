const socketio = require("socket.io")

module.exports = (app) => {
    const io = socketio(app);
    const lobbyHandler = io.of("/game/lobby");
    lobbyHandler.on("connection", (socket) => {
        console.log("someone connected " + socket.id);
        lobbyHandler.to(socket.id).emit("request room");
        
        // Client joins lobby
        socket.on("I'm here", (roomid) => {
            lobbyHandler.to(roomid).emit("new user", socket.id)
            socket.join(roomid);
            let users = Array.from(lobbyHandler.adapter.rooms.get(roomid));
            console.log(users);
            lobbyHandler
                .to(socket.id)
                .emit("user list", users); 

        //Client chooses from 4 options
    
        // Client disconnects from lobby
        socket.on("disconnect", () => {
            console.log(socket.id)

            socket.broadcast.emit(
              "user disconnecting",
              socket.id
            );
            console.log(socket.rooms)
        });

        socket.on("togglerole", (roleinfo) => {
            socket.broadcast.to(roleinfo[0]).emit("togglerole", roleinfo[1])
        });
    });
    return io;
})
};
