import React from "react";
import { type Chapter } from "../Data/course";

interface ChapterMarkersProps {
  chapters: Chapter[];
  currentTime: number;
  onSeek: (time: number) => void;
}

const ChapterMarkers: React.FC<ChapterMarkersProps> = ({
  chapters,
  currentTime,
  onSeek,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCurrentChapterIndex = () => {
    return chapters.findIndex((chapter, index) => {
      const nextChapter = chapters[index + 1];
      return (
        currentTime >= chapter.atSec &&
        (!nextChapter || currentTime < nextChapter.atSec)
      );
    });
  };

  const currentChapterIndex = getCurrentChapterIndex();

  if (chapters.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Chapters</h3>
      <div className="flex flex-wrap gap-2">
        {chapters.map((chapter, index) => {
          const isActive = index === currentChapterIndex;
          const isPast = currentTime >= chapter.atSec;

          return (
            <button
              key={index}
              onClick={() => onSeek(chapter.atSec)}
              className={`
                px-3 py-2 rounded-full text-sm font-medium transition-all duration-200
                flex items-center space-x-2
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : isPast
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              <span className="text-xs font-mono">
                {formatTime(chapter.atSec)}
              </span>
              <span className="truncate max-w-32">{chapter.label}</span>
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterMarkers;
