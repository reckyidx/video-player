import { useEffect, useRef } from "react";
import PauseSharpIcon from "@mui/icons-material/PauseSharp";
import Forward10SharpIcon from "@mui/icons-material/Forward10Sharp";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";
import Replay10SharpIcon from "@mui/icons-material/Replay10Sharp";

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    // videoRef.current.play();
  }, []);
  return (
    <>
      <div className="videoContainer">
        <video
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          type="video/mp4"
          className="videoPlayer"
        ></video>
        <div className="controls">
          <div className="rewind">
            <Replay10SharpIcon fontSize="large" style={{ color: "#fff" }} />
          </div>
          <div className="play">
            <PlayArrowSharpIcon fontSize="large" style={{ color: "#fff" }} />
          </div>
          <div className="forward">
            <Forward10SharpIcon fontSize="large" style={{ color: "#fff" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
