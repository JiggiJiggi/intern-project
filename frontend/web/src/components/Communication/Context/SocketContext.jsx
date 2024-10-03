import React, { createContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketIoClient from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as UUIDv4 } from 'uuid';
import { peerReducer } from '../Reducers/peerReducers';
import { addPeerAction } from '../Actions/peerAction';

const WS_Server = "http://localhost:7500";
export const SocketContext = createContext(null);
const socket = SocketIoClient(WS_Server);

export const SocketProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [stream, setStream] = useState(null);
    const [peers, dispatch] = useReducer(peerReducer, {});
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);

    const fetchUserFeed = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: isVideoEnabled, audio: true });
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    const fetchParticipants = ({ roomId, participants }) => {
        console.log("RoomId:", roomId, "Participants:", participants);
    };

    useEffect(() => {
        const userId = UUIDv4();
        const newPeer = new Peer(userId, {
            host: '/',
            port: 9000,
            path: '/myapp'
        });

        setUser(newPeer);
        fetchUserFeed();

        socket.on("room-created", ({ roomId }) => {
            navigate(`/meeting/room/${roomId}`);
        });

        socket.on("get-users", fetchParticipants);

        return () => {
            socket.off("room-created");
            socket.off("get-users");
        };
    }, [navigate, isVideoEnabled]);

    useEffect(() => {
        if (!user || !stream) return;

        const handleUserJoined = ({ peerId }) => {
            if (!peers[peerId]) {
                const call = user.call(peerId, stream);
                call.on("stream", (remoteStream) => {
                    dispatch(addPeerAction(peerId, remoteStream));
                });
                console.log("Calling new peer", peerId);
            }
        };

        const handleCall = (call) => {
            console.log("Answering call from", call.peer);
            call.answer(stream);
            call.on("stream", (remoteStream) => {
                dispatch(addPeerAction(call.peer, remoteStream));
            });
        };

        socket.on("user-joined", handleUserJoined);
        user.on("call", handleCall);

        socket.emit("ready");

        return () => {
            socket.off("user-joined", handleUserJoined);
            user.off("call", handleCall);
        };
    }, [user, stream, peers]);

    useEffect(() => {
        const toggleVideo = () => {
            setIsVideoEnabled(!isVideoEnabled);
            if (!isVideoEnabled) {
                const mediaStream = navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(mediaStream);
            } else {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    setStream(null);
                }
            }
    
            socket.emit("toggle-video", { peerId: user._id, isVideoEnabled: !isVideoEnabled });
    
            Object.keys(peers).forEach(peerId => {
                if (!isVideoEnabled) {
                    const blankStream = new MediaStream();
                    dispatch(addPeerAction(peerId, blankStream));
                } else {
                    const call = user.call(peerId, stream);
                    call.on("stream", (remoteStream) => {
                        dispatch(addPeerAction(peerId, remoteStream));
                    });
                }
            });
        };
        socket.on("toggle-video", toggleVideo);

        return () => {
            socket.off("toggle-video", toggleVideo);
        };
    }, [isVideoEnabled, user, stream, peers]);


    return (
        <SocketContext.Provider value={{ socket, user, stream, peers, isVideoEnabled, dispatch, addPeerAction }}>
            {children}
        </SocketContext.Provider>
    );
    
};
