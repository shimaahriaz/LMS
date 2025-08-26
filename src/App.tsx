import { useState, useRef, useEffect } from "react";
import { mockCourse, type Lesson } from "./Data/course";
import VideoPlayer, { type VideoPlayerRef } from "./Components/VideoPlayer";
import CourseProgress from "./Components/CourseProgress";
import Breadcrumbs from "./Components/Breadcrumbs";
import LessonsSidebar from "./Components/LessonsSidebar";
import LessonTabs from "./Components/LessonTabs";

function App() {
  const videoRef = useRef<VideoPlayerRef>(null);

  // Lesson state management
  const [currentLesson, setCurrentLesson] = useState<Lesson>(
    mockCourse.lessons[0]
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const availableLessons = mockCourse.lessons.filter(
    (lesson) => !lesson.locked
  );

  // Handle lesson selection
  const handleLessonSelect = (lesson: Lesson) => {
    if (lesson.locked) return;

    setCurrentLesson(lesson);
    setSidebarOpen(false); // Close sidebar on mobile after selection

    // Reset video player for new lesson
    if (videoRef.current) {
      videoRef.current.seekTo(0);
    }
  };

  // Handle video progress
  const handleVideoProgress = (percent: number) => {
    // Mark lesson as completed when reaching 90%
    if (percent >= 90 && !completedLessonIds.includes(currentLesson.id)) {
      setCompletedLessonIds((prev) => [...prev, currentLesson.id]);
    }
  };

  // Handle video time update
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  // Handle seek functionality
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(time);
    }
  };

  // Auto-advance to next lesson when current is completed
  useEffect(() => {
    if (completedLessonIds.includes(currentLesson.id)) {
      const currentIndex = availableLessons.findIndex(
        (lesson) => lesson.id === currentLesson.id
      );
      const nextLesson = availableLessons[currentIndex + 1];

      if (nextLesson && !nextLesson.locked) {
        // Auto-advance after a short delay
        const timer = setTimeout(() => {
          handleLessonSelect(nextLesson);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [completedLessonIds, currentLesson.id]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 lg:mr-80">
          <div className="container mx-auto px-4 py-8 space-y-6">
            {/* Breadcrumbs */}
            <Breadcrumbs
              courseTitle={mockCourse.title}
              currentLessonTitle={currentLesson.title}
            />

            {/* Video Player */}
            <VideoPlayer
              ref={videoRef}
              src={currentLesson.url}
              captionsSrc="/captions.vtt"
              onProgress={handleVideoProgress}
              onTimeUpdate={handleTimeUpdate}
            />

            {/* Course Progress */}
            <CourseProgress
              completedLessons={completedLessonIds.length}
              totalLessons={availableLessons.length}
            />
            
            {/* Lesson Tabs */}
            <LessonTabs
              lesson={currentLesson}
              transcript={mockCourse.transcriptByLessonId[currentLesson.id] || []}
              currentTime={currentTime}
              onSeek={handleSeek}
              lessonId={currentLesson.id}
            />

          </div>
        </div>

        {/* Lessons Sidebar */}
        <LessonsSidebar
          lessons={mockCourse.lessons}
          currentLessonId={currentLesson.id}
          completedLessonIds={completedLessonIds}
          onLessonSelect={handleLessonSelect}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
}

export default App;
