import { useEffect, useRef } from "react";

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
          // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          // type="video/mp4"
          className="videoPlayer"
        ></video>
      </div>
    </>
  );
}

export default App;
