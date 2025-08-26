import { useState, useRef } from "react";
import { mockCourse } from "./Data/course";
import Header from "./Components/Header";
import VideoPlayer, { type VideoPlayerRef } from "./Components/VideoPlayer";
import CourseProgress from "./Components/CourseProgress";

function App() {
  const firstLesson = mockCourse.lessons[0];
  const videoRef = useRef<VideoPlayerRef>(null);
  
  // Dynamic state for course progress
  const [completedLessons, setCompletedLessons] = useState(0);
  const [currentLessonTime, setCurrentLessonTime] = useState(0);
  
  const totalLessons = mockCourse.lessons.length;
  
  const handleVideoProgress = (percent: number) => {
    // Calculate current time based on progress percentage
    // Assuming video duration is 10 minutes (600 seconds) for demo
    const estimatedDuration = 600; // 10 minutes in seconds
    const currentTime = (percent / 100) * estimatedDuration;
    setCurrentLessonTime(currentTime);
    
    console.log(`Lesson progress: ${percent}%`);
    
    // Mark lesson as completed when reaching 90%
    if (percent >= 90 && completedLessons === 0) {
      setCompletedLessons(1);
    }
  };

  const handleResume = () => {
    console.log("Resuming from saved position...", currentLessonTime);
    
    // Use the VideoPlayer ref to seek and play
    if (videoRef.current) {
      videoRef.current.seekTo(currentLessonTime);
      videoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <VideoPlayer 
          ref={videoRef}
          src={firstLesson.url} 
          captionsSrc="/captions.vtt"
          onProgress={handleVideoProgress}
        />
        
        <CourseProgress
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          currentLessonTime={currentLessonTime}
          onResume={handleResume}
        />
      </div>
    </div>
  );
}

export default App;
