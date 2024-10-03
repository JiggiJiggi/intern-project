import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../Context/SocketContext';
import UserFeedPlayer from '../VideoComponents/UserFeedPlayer';


const MeetingRoom = () => {
    const { id } = useParams();
    const { socket, user, stream, peers, dispatch, addPeerAction } = useContext(SocketContext);
    const [myStream, setMyStream] = useState(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false); // Video default off
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        if (user && socket) {
            console.log("New user with id:", user._id, "joined room:", id);
            socket.emit("join-room", { roomId: id, peerId: user._id });

            // Handle receiving messages
            socket.on("receive-message", handleMessageReceive);

            // Listen for when participants toggle their video on/off
            socket.on("toggle-video", handleParticipantVideoToggle);
        }

        return () => {
            socket.off("receive-message", handleMessageReceive);
            socket.off("toggle-video", handleParticipantVideoToggle);
        };
    }, [id, user, socket]);

    const handleMessageReceive = ({ message, sender }) => {
        if (sender !== user._id) {
            setMessages(prevMessages => [...prevMessages, { message, sender }]);
        }
    };

    const handleParticipantVideoToggle = ({ peerId, isVideoEnabled }) => {
        if (peers[peerId]) {
            if (!isVideoEnabled) {
                // Replace the peer stream with a blank stream (video off)
                const blankStream = new MediaStream();
                dispatch(addPeerAction(peerId, blankStream));
            } else {
                // If video is re-enabled, handle accordingly
                console.log(`${peerId} turned video on.`);
            }
        }
    };

    const toggleVideo = async () => {
        if (!isVideoEnabled) {
            // Turn video ON
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setMyStream(mediaStream);
                setIsVideoEnabled(true);

                // Notify other participants about video toggle
                socket.emit("toggle-video", { peerId: user._id, isVideoEnabled: true, roomId: id });

                // Call existing users
                Object.keys(peers).forEach(peerId => {
                    const call = user.call(peerId, mediaStream);
                    call.on('stream', (remoteStream) => {
                        dispatch(addPeerAction(peerId, remoteStream));
                    });
                });
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        } else {
            // Turn video OFF
            setMyStream(null);
            setIsVideoEnabled(false);

            // Notify other participants about video toggle
            socket.emit("toggle-video", { peerId: user._id, isVideoEnabled: false, roomId: id });

            // Notify peers that video is off by replacing your stream with a blank stream
            Object.keys(peers).forEach(peerId => {
                const blankStream = new MediaStream();
                dispatch(addPeerAction(peerId, blankStream));
            });
        }
    };

    const sendMessage = () => {
        if (messageInput.trim()) {
            const newMessage = { message: messageInput, sender: user._id };
            socket.emit("send-message", { roomId: id, ...newMessage });
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessageInput("");
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-blue-800">Meeting Room: {id}</h1>

            <div className="flex w-full max-w-6xl space-x-4">
                {/* Video Section */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-md mb-6 p-4">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-700">You:</h2>
                        <div className="w-full max-w-md mx-auto">
                            {isVideoEnabled ? (
                                <UserFeedPlayer stream={myStream || stream} />
                            ) : (
                                <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
                                    Video Off
                                </div>
                            )}
                        </div>
                        <button
                            onClick={toggleVideo}
                            className={`mt-4 px-4 py-2 rounded-lg text-white ${
                                isVideoEnabled ? 'bg-red-500' : 'bg-green-500'
                            } hover:bg-opacity-80`}
                        >
                            {isVideoEnabled ? 'Turn Video Off' : 'Turn Video On'}
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Other Participants:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Object.keys(peers).map((peerId) => (
                                <div key={peerId} className="bg-gray-200 rounded-lg p-2">
                                    <UserFeedPlayer stream={peers[peerId].stream} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Section */}
                <div className="flex flex-col w-1/3 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Chat</h2>
                    <div className="flex-1 mb-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <strong>{msg.sender === user._id ? "You" : msg.sender}:</strong>{" "}
                                <span>{msg.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingRoom;
