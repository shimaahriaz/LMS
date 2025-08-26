import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

type VideoPlayerProps = {
  src: string;
  captionsSrc?: string;
  onProgress?: (percent: number) => void;
  onDuration?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
};

export interface VideoPlayerRef {
  seekTo: (time: number) => void;
  play: () => void;
  pause: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src, captionsSrc, onProgress, onDuration, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [completed, setCompleted] = useState(false);
    const [lastPlayedTime, setLastPlayedTime] = useState<number | null>(null);
    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      seekTo: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      play: () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      },
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleTimeUpdate = () => {
        const percent = (video.currentTime / video.duration) * 100;
        onProgress?.(percent);
        onTimeUpdate?.(video.currentTime);

        if (percent >= 90 && !completed) setCompleted(true);
        if (video.currentTime < video.duration - 2) setCompleted(false);
      };

      const handleLoadedMetadata = () => {
        onDuration?.(video.duration);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }, [onProgress, onDuration, completed]);

    useEffect(() => {
      const handleBeforeUnload = () => {
        if (videoRef.current) {
          localStorage.setItem(
            "lastPlayedTime",
            videoRef.current.currentTime.toString()
          );
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    // أول ما الصفحة تفتح رجع آخر وقت
    useEffect(() => {
      const savedTime = localStorage.getItem("lastPlayedTime");
      if (savedTime) {
        setLastPlayedTime(parseFloat(savedTime));
      }
    }, []);

    // Resume من آخر وقت
    const handleResume = () => {
      if (videoRef.current && lastPlayedTime !== null) {
        videoRef.current.currentTime = lastPlayedTime;
        videoRef.current.play();
      }
    };

    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <div className="relative w-full bg-black">
          <video
            ref={videoRef}
            src={src}
            className="w-full"
            controls={true}
            preload="metadata"
          >
            {captionsSrc && <track kind="captions" src={captionsSrc} default />}
          </video>
        </div>

        {/* Progress Info */}

        {lastPlayedTime !== null && (
          <div className="mt-4 p-4 bg-[#EFF6FF] rounded-lg flex justify-between items-center shadow-sm">
            {/* Left Section */}
            <div className="flex items-start space-x-2">
              {/* <Clock className="text-blue-600 w-5 h-5 mt-1" /> */}
              <div>
                <p className="text-gray-900 font-medium">
                  Resume from {Math.floor(lastPlayedTime / 60)}:
                  {(Math.floor(lastPlayedTime) % 60)
                    .toString()
                    .padStart(2, "0")}
                </p>
                <p className="text-gray-500 text-sm">
                  You left off here last time
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Resume
            </button>
          </div>
        )}

        {/* Progress */}
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
