import express from "express";
import path from "path";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
	console.log("Connection succesfully");
	socket.on("disconnect", () => {
		console.log("Disconnected succesfully :(");
	});

	socket.on("message", (data) => {
		socket.broadcast.emit("message", data);
	});
});

app.set("port", port);

app.use(express.static(path.join(__dirname, "public")));

server.listen({ port }, () => {
	console.log(`Listen at port: ${app.get("port")}`);
});
