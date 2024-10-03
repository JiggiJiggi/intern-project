import React, { useEffect, useRef } from "react";

const UserFeedPlayer = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            if (stream) {
                videoRef.current.srcObject = stream;
                videoRef.current.style.display = 'block';
            } else {
                videoRef.current.srcObject = null;
                videoRef.current.style.display = 'none';
            }
        }
    }, [stream]);

    return (
        <div>
              <video
            ref={videoRef}
            autoPlay
            playsInline
            controls
            style={{ width: "300px", height: "200px", display: 'none' }}
             />
        </div>
        );
    }

export default UserFeedPlayer;