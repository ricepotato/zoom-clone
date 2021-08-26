import WebSocket from "ws";
import http from "http";
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"))

app.get("/", (req, res) => res.render("home"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);
//app.listen(3000, handleListen); 
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) =>{
    sockets.push(socket);
    console.log("connected to Browser ❤️")
    socket.on("close", () => console.log("Disconnected from the browser 😅"));
    socket.on("message", (message) => {
        sockets.forEach(aSocket => aSocket.send(message.toString("utf8")));
        // socket.send(message.toString("utf8"));
    });
    socket.send("hello");
});

server.listen(3000, handleListen);
