import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../Context/SocketContext'; // Adjust path if needed

function MeetingHome() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext); // Access socket from context

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            navigate(`/meeting/room/${roomId}`);
        } else {
            alert('Please enter a room ID');
        }
    };

    const initRoom = () => {
        if (socket) {
            socket.emit("create-room");
        } else {
            console.error('Socket is not available');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Meeting Home</h1>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-sm"
            />
            <div className="flex space-x-4">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleJoinRoom}
                >
                    Join Room
                </button>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={initRoom}
                >
                    Create Room
                </button>
            </div>
        </div>
    );
}

export default MeetingHome;
