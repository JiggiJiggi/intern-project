const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const roomHandler = require("./handlers/roomHandler");
const ServerConfig = require("./config/serverConfig");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");
    roomHandler(socket);

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    // Chat message handler
    socket.on("send-message", ({ roomId, message, sender }) => {
        // Broadcast message to other users in the room
        io.to(roomId).emit("receive-message", { message, sender });
    });

    // Chat message handler for all users
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    // Typing notification handler
    socket.on("typing", (username) => {
        socket.broadcast.emit("typing", username);
    });
});

server.listen(ServerConfig.PORT, () => {
  console.log(`Server running on port ${ServerConfig.PORT}`);
});
