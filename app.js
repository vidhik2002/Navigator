const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const socket = require('socket.io-client')
const mongoose = require('mongoose');
const path = require('path');
const socketio = require("socket.io");
require('dotenv').config();

const mazeRouter = require('./routers/mazeRouter');
const gameRouter = require("./routers/gameRouter");
const socketHandler = require("./routers/socketHandler");

const PORT = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);
socketHandler(server);
// const io = socketio(server);

// mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// mongoose.Promise = global.Promise;

// Setting template Engine
app.set('view engine', 'ejs');
// app.set("socketio", io);
app.use('/public', express.static(path.join(__dirname,'public')))

// parse application/x-www-form-urlencoded aka your HTML <form> tag stuff
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json aka whatever you send as a json object
app.use(bodyParser.json())


app.use("/maze", mazeRouter);
app.use("/game", gameRouter);

app.get('/ping', (req, res) => {
    res.json({ msg: 'pong' });
})

app.get('/', (req, res) => {
    res.render('index');
})

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
);

mongoose.connection
    .once('open', () => {
        console.log('Connection to mongoDB established');
    })
    .on('error', (err) => {
        console.log('Error connecting to mongoDB:', err);
    });
app.use((req, res, next) => {
	const error = new Error("Request not found");
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})