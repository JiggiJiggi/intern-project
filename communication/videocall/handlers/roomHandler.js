const { v4: UUIDv4 } = require("uuid");

const rooms = {}; // { roomId: { [peerId]: { stream: Stream, ...otherData } } }

const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        rooms[roomId] = {};
        socket.join(roomId);
        console.log("Room created with", roomId);
        socket.emit("room-created", { roomId });
    };

    const joinRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            console.log("New user has room joined", roomId, "with peerId", peerId);
            rooms[roomId][peerId] = {}; // Add peerId to room

            socket.join(roomId);
            socket.emit("get-users", {
                roomId,
                participants: Object.keys(rooms[roomId])
            });

            socket.to(roomId).emit("user-joined", { peerId });

            socket.on("ready", () => {
                socket.to(roomId).emit("user-ready", { peerId });
            });

            socket.on("disconnect", () => {
                if (rooms[roomId]) {
                    delete rooms[roomId][peerId];
                    if (Object.keys(rooms[roomId]).length === 0) {
                        delete rooms[roomId];
                    }
                    socket.to(roomId).emit("user-left", { peerId });
                }
            });
        } else {
            console.error("Room does not exist:", roomId);
        }
    };

    const handleToggleVideo = ({ peerId, isVideoEnabled, roomId }) => {
        console.log("hello")
        socket.to(Object.keys(rooms[roomId])).emit("toggle-video", { peerId, isVideoEnabled, roomId });
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on("toggle-video", handleToggleVideo);
};

module.exports = roomHandler;
