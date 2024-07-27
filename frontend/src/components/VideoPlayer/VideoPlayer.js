// components/VideoPlayer.js
import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
    const videoOptions = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0, // Set to 1 to autoplay the video
        },
    };

    return (
        <div className="youtube-player">
            <YouTube videoId={videoId} opts={videoOptions} />
        </div>
    );
};

export default VideoPlayer;
