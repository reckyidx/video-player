import { useEffect, useRef, useState } from "react";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";
import Forward10SharpIcon from "@mui/icons-material/Forward10Sharp";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import Replay10SharpIcon from "@mui/icons-material/Replay10Sharp";
import VolumeUpSharpIcon from "@mui/icons-material/VolumeUpSharp";
import VolumeOffSharpIcon from "@mui/icons-material/VolumeOffSharp";

const qualitySources = {
  "360p": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "720p": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "1080p": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
};

function App() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [quality, setQuality] = useState("360p");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setDuration(video.duration || 0);
      setCurrentTime(video.currentTime || 0);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateTime);
    video.addEventListener("ended", () => setPlaying(false));

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isPlaying = !video.paused && !video.ended;
    const current = video.currentTime;
    video.src = qualitySources[quality];

    if (isPlaying) {
      video.currentTime = current;
      video.play().catch(() => {});
    }
  }, [quality]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const skipTime = (amount) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + amount));
  };

  const handleProgressChange = (event) => {
    const video = videoRef.current;
    if (!video) return;

    const nextValue = Number(event.target.value);
    setProgress(nextValue);
    video.currentTime = (duration * nextValue) / 100;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="appRoot">
      <header className="playerHeader">
        <h1>Video Player</h1>
        <p>Streaming video from cloud</p>
      </header>

      <div className="videoContainer">
        <video
          ref={videoRef}
          src={qualitySources[quality]}
          className="videoPlayer"
          preload="metadata"
        />

        <div className="playerOverlay">
          <button type="button" className="controlButton" onClick={() => skipTime(-10)} aria-label="Rewind 10 seconds">
            <Replay10SharpIcon fontSize="large" />
          </button>

          <button type="button" className="playButton" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
            {playing ? <PauseSharpIcon fontSize="large" /> : <PlayArrowSharpIcon fontSize="large" />}
          </button>

          <button type="button" className="controlButton" onClick={() => skipTime(10)} aria-label="Forward 10 seconds">
            <Forward10SharpIcon fontSize="large" />
          </button>
        </div>

        <div className="progressControl">
          <div className="timeGroup">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            aria-label="Video progress"
          />

          <select className="videoQuality" value={quality} onChange={(event) => setQuality(event.target.value)} aria-label="Video quality">
            {Object.keys(qualitySources).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button type="button" className="muteButton" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
            {muted ? <VolumeOffSharpIcon fontSize="small" /> : <VolumeUpSharpIcon fontSize="small" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
