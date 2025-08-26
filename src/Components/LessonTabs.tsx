import React, { useState, useEffect, useRef } from "react";
import { type TranscriptCue, type Lesson } from "../Data/course";

interface Note {
  id: string;
  timestamp: number;
  text: string;
  createdAt: Date;
}

interface LessonTabsProps {
  lesson: Lesson;
  transcript: TranscriptCue[];
  currentTime: number;
  onSeek: (time: number) => void;
  lessonId: string;
}

const LessonTabs: React.FC<LessonTabsProps> = ({
  lesson,
  transcript,
  currentTime,
  onSeek,
  lessonId,
}) => {
  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };
  const [activeTab, setActiveTab] = useState<
    "overview" | "transcript" | "notes"
  >("overview");
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeCueRef = useRef<HTMLDivElement>(null);

  // Load notes from localStorage on mount and when lessonId changes
  useEffect(() => {
    setIsLoading(true);

    if (!isLocalStorageAvailable()) {
      console.warn("localStorage is not available");
      setIsLoading(false);
      return;
    }

    try {
      const savedNotes = localStorage.getItem(`notes-${lessonId}`);
      console.log(`Checking localStorage for lesson ${lessonId}:`, savedNotes);

      if (savedNotes && savedNotes !== "null" && savedNotes !== "undefined") {
        const parsedNotes: Note[] = JSON.parse(savedNotes);
        // Convert string dates back to Date objects
        const notesWithDates: Note[] = parsedNotes.map((note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        }));
        setNotes(notesWithDates);
        console.log(
          `Loaded ${notesWithDates.length} notes for lesson ${lessonId}:`,
          notesWithDates
        );
      } else {
        console.log(
          `No saved notes found for lesson ${lessonId}, setting empty array`
        );
        setNotes([]);
      }
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId]);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.warn("localStorage is not available for saving");
      return;
    }

    // Don't save if we're still loading
    if (isLoading) {
      console.log(`Skipping save while loading for lesson ${lessonId}`);
      return;
    }

    // Don't save if notes array is empty and we're just initializing
    if (notes.length === 0) {
      console.log(`Skipping save for empty notes array for lesson ${lessonId}`);
      return;
    }

    // Don't save if we're just loading from localStorage
    if (
      notes.length === 0 &&
      localStorage.getItem(`notes-${lessonId}`) === null
    ) {
      console.log(
        `Skipping save for initial empty state for lesson ${lessonId}`
      );
      return;
    }

    try {
      localStorage.setItem(`notes-${lessonId}`, JSON.stringify(notes));
      console.log(`Saved ${notes.length} notes for lesson ${lessonId}:`, notes);

      // Verify the save worked
      const savedData = localStorage.getItem(`notes-${lessonId}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log(
          `Verified save: ${parsedData.length} notes in localStorage for lesson ${lessonId}`
        );
      }
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  }, [notes, lessonId, isLoading]);

  // Auto-scroll to active transcript cue
  useEffect(() => {
    if (
      activeCueRef.current &&
      transcriptRef.current &&
      activeTab === "transcript"
    ) {
      activeCueRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTime, activeTab]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const addNote = () => {
    if (newNote.trim() && currentTime > 0 && !isLoading) {
      const note: Note = {
        id: Date.now().toString(),
        timestamp: currentTime,
        text: newNote.trim(),
        createdAt: new Date(),
      };
      setNotes((prev) => {
        const newNotes = [...prev, note];
        // Immediately save to localStorage
        if (isLocalStorageAvailable()) {
          try {
            localStorage.setItem(`notes-${lessonId}`, JSON.stringify(newNotes));
            console.log(
              `Immediately saved note: ${note.text} at ${currentTime}s`
            );

            // Verify the save worked
            const savedData = localStorage.getItem(`notes-${lessonId}`);
            if (savedData) {
              const parsedData = JSON.parse(savedData);
              console.log(
                `Verified immediate save: ${parsedData.length} notes in localStorage`
              );
            }
          } catch (error) {
            console.error("Error saving note immediately:", error);
          }
        }
        return newNotes;
      });
      setNewNote("");
    }
  };

  const deleteNote = (noteId: string) => {
    if (!isLoading) {
      setNotes((prev) => {
        const newNotes = prev.filter((note) => note.id !== noteId);
        // Immediately save to localStorage
        if (isLocalStorageAvailable()) {
          try {
            localStorage.setItem(`notes-${lessonId}`, JSON.stringify(newNotes));
            console.log(
              `Deleted note ${noteId}, saved ${newNotes.length} remaining notes`
            );

            // Verify the save worked
            const savedData = localStorage.getItem(`notes-${lessonId}`);
            if (savedData) {
              const parsedData = JSON.parse(savedData);
              console.log(
                `Verified delete save: ${parsedData.length} notes in localStorage`
              );
            }
          } catch (error) {
            console.error("Error saving after delete:", error);
          }
        }
        return newNotes;
      });
    }
  };

  const getCurrentCueIndex = () => {
    return transcript.findIndex((cue, index) => {
      const nextCue = transcript[index + 1];
      return (
        currentTime >= cue.atSec && (!nextCue || currentTime < nextCue.atSec)
      );
    });
  };

  const currentCueIndex = getCurrentCueIndex();

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("overview")}
          className={`
            flex-1 flex flex-col items-center py-4 px-2 transition-colors
            ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          <svg
            className={`w-5 h-5 mb-1 ${
              activeTab === "overview" ? "text-blue-600" : "text-gray-400"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("transcript")}
          className={`
            flex-1 flex flex-col items-center py-4 px-2 transition-colors
            ${
              activeTab === "transcript"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          <svg
            className={`w-5 h-5 mb-1 ${
              activeTab === "transcript" ? "text-blue-600" : "text-gray-400"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Transcript</span>
        </button>

        <button
          onClick={() => setActiveTab("notes")}
          className={`
            flex-1 flex flex-col items-center py-4 px-2 transition-colors
            ${
              activeTab === "notes"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          <svg
            className={`w-5 h-5 mb-1 ${
              activeTab === "notes" ? "text-blue-600" : "text-gray-400"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">
            Notes ({isLoading ? "..." : notes.length})
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
            <p className="text-gray-600 leading-relaxed">
              {lesson.description ||
                "Learn essential React concepts and best practices in this comprehensive lesson."}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{formatDuration(lesson.durationSec)}</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{lesson.instructor || "Sarah Johnson"}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "transcript" && (
          <div className="max-h-96 overflow-y-auto" ref={transcriptRef}>
            {transcript.map((cue, index) => {
              const isActive = index === currentCueIndex;
              return (
                <div
                  key={index}
                  ref={isActive ? activeCueRef : null}
                  className={`
                    mb-4 p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : "hover:bg-gray-50"
                    }
                  `}
                  onClick={() => onSeek(cue.atSec)}
                >
                  <div className="flex items-start space-x-3">
                    <span
                      className={`
                        text-xs font-mono px-2 py-1 rounded
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {formatTime(cue.atSec)}
                    </span>
                    <p
                      className={`
                        flex-1 text-sm leading-relaxed
                        ${isActive ? "text-blue-900" : "text-gray-700"}
                      `}
                    >
                      {cue.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-4">
            {/* Add Note Form */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note at current time..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addNote()}
                />
                <button
                  onClick={addNote}
                  disabled={!newNote.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Current time: {formatTime(currentTime)}
              </div>
            </div>

            {/* Notes List */}
            {isLoading ? (
              <div className="text-center text-gray-500 py-8">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No notes yet. Add your first note above!
              </div>
            ) : (
              <div className="space-y-3">
                {notes
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((note) => (
                    <div
                      key={note.id}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <button
                              onClick={() => onSeek(note.timestamp)}
                              className="text-xs font-mono px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            >
                              {formatTime(note.timestamp)}
                            </button>
                            <span className="text-xs text-gray-500">
                              {note.createdAt.toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{note.text}</p>
                        </div>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonTabs;
