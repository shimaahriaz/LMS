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
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
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

        // Save current time to localStorage every 5 seconds
        if (Math.floor(video.currentTime) % 5 === 0) {
          localStorage.setItem("lastPlayedTime", video.currentTime.toString());
        }

        if (percent >= 90 && !completed) setCompleted(true);
        if (video.currentTime < video.duration - 2) setCompleted(false);
      };

      const handleLoadedMetadata = () => {
        onDuration?.(video.duration);
        setIsLoading(false);
        setError(null);
        console.log("Video loaded successfully:", src);
        console.log("Video duration:", video.duration);
      };

      const handleError = () => {
        setError("Failed to load video");
        setIsLoading(false);
        console.error("Video error:", video.error);
        console.error("Video src:", src);
      };

      const handleLoadStart = () => {
        setIsLoading(true);
        setError(null);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("error", handleError);
      video.addEventListener("loadstart", handleLoadStart);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadstart", handleLoadStart);
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

      // Also save time when video is paused or stopped
      const handlePause = () => {
        if (videoRef.current) {
          localStorage.setItem(
            "lastPlayedTime",
            videoRef.current.currentTime.toString()
          );
        }
      };

      const video = videoRef.current;
      if (video) {
        video.addEventListener("pause", handlePause);
      }

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (video) {
          video.removeEventListener("pause", handlePause);
        }
      };
    }, []);

    useEffect(() => {
      const savedTime = localStorage.getItem("lastPlayedTime");
      if (savedTime) {
        const time = parseFloat(savedTime);
        if (!isNaN(time) && time > 0) {
          setLastPlayedTime(time);
        }
      }
    }, []);

    const handleResume = () => {
      if (videoRef.current && lastPlayedTime !== null) {
        videoRef.current.currentTime = lastPlayedTime;
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    };

    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <div className="relative w-full bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Loading video...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-white text-center p-4">
                <svg
                  className="w-12 h-12 text-red-500 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-lg font-semibold mb-2">Video Error</p>
                <p className="text-sm text-gray-300 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Reload Page
                </button>
              </div>
            </div>
          )}

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

        {lastPlayedTime !== null && lastPlayedTime > 0 && (
          <div className="mt-4 p-4 bg-[#EFF6FF] rounded-lg flex justify-between items-center shadow-sm">
            {/* Left Section */}
            <div className="flex items-start space-x-2">
              {/* <Clock className="text-blue-600 w-5 h-5 mt-1" /> */}
              <div>
                <p className="text-gray-900 font-medium">
                  Resume from {Math.floor(lastPlayedTime / 60)}:
                  {Math.floor(lastPlayedTime % 60)
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
