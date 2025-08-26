import React, { useState, useEffect, useRef } from "react";
import { type TranscriptCue } from "../Data/course";

interface Note {
  id: string;
  timestamp: number;
  text: string;
  createdAt: Date;
}

interface BottomDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  transcript: TranscriptCue[];
  currentTime: number;
  onSeek: (time: number) => void;
  lessonId: string;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  onToggle,
  transcript,
  currentTime,
  onSeek,
  lessonId,
}) => {
  const [activeTab, setActiveTab] = useState<"transcript" | "notes">(
    "transcript"
  );
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeCueRef = useRef<HTMLDivElement>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${lessonId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [lessonId]);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem(`notes-${lessonId}`, JSON.stringify(notes));
  }, [notes, lessonId]);

  // Auto-scroll to active transcript cue
  useEffect(() => {
    if (activeCueRef.current && transcriptRef.current) {
      activeCueRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const addNote = () => {
    if (newNote.trim() && currentTime > 0) {
      const note: Note = {
        id: Date.now().toString(),
        timestamp: currentTime,
        text: newNote.trim(),
        createdAt: new Date(),
      };
      setNotes((prev) => [...prev, note]);
      setNewNote("");
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
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
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? "Hide" : "Show"} Transcript & Notes
      </button>

      {/* Drawer */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out z-30
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ height: "40vh" }}
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("transcript")}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === "transcript"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            Transcript
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === "notes"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            Notes ({notes.length})
          </button>
        </div>

        {/* Content */}
        <div className="h-full overflow-hidden">
          {activeTab === "transcript" && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4" ref={transcriptRef}>
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
            </div>
          )}

          {activeTab === "notes" && (
            <div className="h-full flex flex-col p-4">
              {/* Add Note Form */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
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
              <div className="flex-1 overflow-y-auto">
                {notes.length === 0 ? (
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
                          className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
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
                                  {note.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">
                                {note.text}
                              </p>
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomDrawer;
