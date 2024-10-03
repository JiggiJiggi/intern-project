import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MeetingHome from './VideoPages/MeetingHome';
import MeetingRoom from './VideoPages/MeetingRoom';
import { SocketProvider } from './Context/SocketContext.jsx'

function VideoCall() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="" element={<MeetingHome />} />
        <Route path="room/:id" element={<MeetingRoom />} />
      </Routes>
    </SocketProvider>
  );
}

export default VideoCall;
