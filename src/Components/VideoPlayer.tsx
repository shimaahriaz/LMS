import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";

type VideoPlayerProps = {
  src: string;
  captionsSrc?: string;
  onProgress?: (percent: number) => void;
};

export interface VideoPlayerRef {
  seekTo: (time: number) => void;
  play: () => void;
  pause: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src, captionsSrc, onProgress }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [showCustomCaptions, setShowCustomCaptions] = useState(false);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      seekTo: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
          setCurrentTime(time);
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
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
        const percent = (video.currentTime / video.duration) * 100;
        onProgress?.(percent);

        if (percent >= 90 && !completed) setCompleted(true);
        if (video.currentTime < video.duration - 2) setCompleted(false);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [onProgress, completed]);

    // Custom captions data
    const customCaptions = [
      { time: 0, text: "مرحباً بكم في الدرس الأول من دورة React" },
      { time: 5, text: "في هذا الدرس سنتعلم أساسيات React" },
      { time: 10, text: "سنبدأ بفهم المكونات والـ JSX" },
      { time: 15, text: "ثم ننتقل إلى الـ Hooks والـ State Management" },
      { time: 20, text: "هذا الدرس سيكون أساساً قوياً لبناء تطبيقات React" },
      { time: 25, text: "دعنا نبدأ بالتعلم!" },
    ];

    // Get current caption based on video time
    const getCurrentCaption = () => {
      const currentCaption = customCaptions.find(caption => 
        currentTime >= caption.time && 
        (caption.time + 5) > currentTime
      );
      return currentCaption?.text || "";
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

          {/* Custom Captions Overlay */}
          {showCustomCaptions && getCurrentCaption() && (
            <div className="absolute bottom-20 left-0 right-0 flex justify-center">
              <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg text-center max-w-2xl">
                {getCurrentCaption()}
              </div>
            </div>
          )}

          {/* Custom Captions Toggle Button */}
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setShowCustomCaptions(!showCustomCaptions)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                showCustomCaptions 
                  ? 'bg-yellow-500 text-black' 
                  : 'bg-gray-800 text-white'
              }`}
            >
              ترجمة مخصصة
            </button>
          </div>

          {/* Completed Status */}
          {completed && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              ✅ مكتمل
            </div>
          )}
        </div>

        {/* Progress Info */}
        <div className="bg-white p-4 border-t">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              {Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60).toString().padStart(2, "0")} / {Math.floor(duration / 60)}:{(Math.floor(duration) % 60).toString().padStart(2, "0")}
            </span>
            <span>{Math.floor((currentTime / duration) * 100) || 0}% مكتمل</span>
          </div>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
