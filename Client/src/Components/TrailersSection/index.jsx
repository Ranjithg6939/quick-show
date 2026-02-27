import React, { useState } from "react";
import { dummyTrailers } from "../../assets/assets";
import BlurCircle from "../BlurCircle";
import YouTube from "react-youtube";
import { PlayCircle } from "lucide-react";
import "./index.css";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const videoId = currentTrailer.videoUrl.split("v=")[1];

  return (
    <div className="trailer-container">
      <p className="trailer-text">Trailers</p>

      <div className="player-container">
        <BlurCircle top="-100px" right="-100px" />
        <YouTube
          videoId={videoId}
          opts={{
            width: "95%",
            height: "480px",
            playerVars: {
              autoplay: 0,
              controls: 0,
            },
          }}
        />
      </div>

      <div className="video-image">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrailer(trailer)}
            className="thumbnail"
          >
            <img src={trailer.image} alt="trailer" className="trailer-image" />
            <PlayCircle strokeWidth={1.6} className="play-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
