import "cloudinary-video-player/dist/cld-video-player.min.js";
import "cloudinary-video-player/dist/cld-video-player.min.css";
import { useEffect } from "react";

const VideoPlayer = ({ cloudname, cta, video, products }) => {
  useEffect(() => {
    const videoPlayer = cloudinary.videoPlayer("shoppable-video-player", {
      cloud_name: cloudname,
      muted: true,
      controls: true,
      fluid: true,
    });

    var source = {
      shoppable: {
        startState: "openOnPlay",
        bannerMsg: cta,
        showPostPlayOverlay: true,
        products,
      },
    };

    if (products.length > 0) {
      videoPlayer.source(video, source);
    } else {
      videoPlayer.source(video);
    }
  }, [video, products, cloudname, cta]);

  return (
    <div>
      <video
        id="shoppable-video-player"
        className="cld-video-player cld-video-player-skin-light"
      />
    </div>
  );
};

export default VideoPlayer;
