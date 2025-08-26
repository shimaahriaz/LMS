import React from "react";
import { type Lesson } from "../Data/course";

interface LessonsSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessonIds: string[];
  onLessonSelect: (lesson: Lesson) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const LessonsSidebar: React.FC<LessonsSidebarProps> = ({
  lessons,
  currentLessonId,
  completedLessonIds,
  onLessonSelect,
  isOpen,
  onToggle,
}) => {
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getLessonStatus = (lesson: Lesson) => {
    if (lesson.locked) return "locked";
    if (lesson.id === currentLessonId) return "current";
    if (completedLessonIds.includes(lesson.id)) return "completed";
    return "available";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return (
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        );
      case "completed":
        return (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "locked":
        return (
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-lg border"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static top-0 right-0 h-full w-80 bg-white shadow-lg lg:shadow-none
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Lessons</h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {lessons.map((lesson) => {
                const status = getLessonStatus(lesson);
                const isDisabled = status === "locked";

                return (
                  <button
                    key={lesson.id}
                    onClick={() => !isDisabled && onLessonSelect(lesson)}
                    disabled={isDisabled}
                    className={`
                      w-full p-4 rounded-lg border transition-all duration-200
                      flex items-center space-x-3 text-left
                      ${
                        status === "current"
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : status === "completed"
                          ? "border-green-200 bg-green-50 text-green-900 hover:bg-green-100"
                          : status === "locked"
                          ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                      }
                    `}
                  >
                    {getStatusIcon(status)}

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`
                        font-medium truncate
                        ${isDisabled ? "text-gray-400" : "text-gray-900"}
                      `}
                      >
                        {lesson.title}
                      </h3>
                      <p
                        className={`
                        text-sm mt-1
                        ${isDisabled ? "text-gray-400" : "text-gray-500"}
                      `}
                      >
                        {formatDuration(lesson.durationSec)}
                      </p>
                    </div>

                    {status === "locked" && (
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>
                {completedLessonIds.length} /{" "}
                {lessons.filter((l) => !l.locked).length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (completedLessonIds.length /
                      lessons.filter((l) => !l.locked).length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonsSidebar;
