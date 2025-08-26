export type Lesson = {
  id: string;
  title: string;
  durationSec: number;
  url: string;
  locked?: boolean;
};

export type Chapter = { label: string; atSec: number };
export type TranscriptCue = { atSec: number; text: string };

export type Course = {
  id: string;
  title: string;
  lessons: Lesson[];
  chaptersByLessonId: Record<string, Chapter[]>;
  transcriptByLessonId: Record<string, TranscriptCue[]>;
};

// Mock course data
export const mockCourse: Course = {
  id: "course-1",
  title: "React LMS Video Course",
  lessons: [
    {
      id: "l1",
      title: "Lesson 1: Intro",
      durationSec: 60,
      url: "/video1.mp4",
    },
    {
      id: "l2",
      title: "Lesson 2: JSX & Components",
      durationSec: 45,
      url: "/video2.mp4",
    },
    {
      id: "l3",
      title: "Lesson 3: Hooks Deep Dive",
      durationSec: 90,
      url: "/video1.mp4",
    },
    {
      id: "l4",
      title: "Lesson 4: Advanced Topics",
      durationSec: 120,
      url: "/video2.mp4",
      locked: true,
    },
  ],
  chaptersByLessonId: {
    l1: [
      { label: "Welcome", atSec: 0 },
      { label: "Setup", atSec: 15 },
      { label: "Hello World", atSec: 30 },
      { label: "Next Steps", atSec: 45 },
    ],
    l2: [
      { label: "JSX Basics", atSec: 0 },
      { label: "Components", atSec: 20 },
      { label: "Props", atSec: 35 },
    ],
    l3: [
      { label: "useState", atSec: 0 },
      { label: "useEffect", atSec: 30 },
      { label: "Custom Hooks", atSec: 60 },
    ],
    l4: [
      { label: "Context API", atSec: 0 },
      { label: "Performance", atSec: 40 },
      { label: "Testing", atSec: 80 },
    ],
  },
  transcriptByLessonId: {
    l1: [
      { atSec: 0, text: "Welcome to the first lesson." },
      { atSec: 10, text: "Let's set up the environment." },
      { atSec: 20, text: "Here's our Hello World example." },
      { atSec: 30, text: "Understanding JSX syntax." },
      { atSec: 40, text: "Next steps for learning React." },
    ],
    l2: [
      { atSec: 0, text: "Starting JSX basics." },
      { atSec: 15, text: "Creating functional components." },
      { atSec: 30, text: "Passing props between components." },
      { atSec: 40, text: "Wrapping up JSX & Components." },
    ],
    l3: [
      { atSec: 0, text: "Introduction to useState." },
      { atSec: 20, text: "Exploring useEffect." },
      { atSec: 50, text: "Custom hooks for reuse." },
      { atSec: 70, text: "Conclusion of hooks lesson." },
    ],
    l4: [
      { atSec: 0, text: "Using Context API effectively." },
      { atSec: 30, text: "Performance optimizations." },
      { atSec: 70, text: "Testing React applications." },
    ],
  },
};
