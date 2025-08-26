export type Lesson = {
  id: string;
  title: string;
  durationSec: number;
  url: string;
  locked?: boolean;
  description?: string;
  instructor?: string;
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
      title: "Lesson 1: Introduction to React",
      durationSec: 180,
      url: "/video1.mp4",
      description: "Learn the fundamentals of React, including what it is, why it's popular, and how to set up your development environment. We'll create your first React component and understand the basics of JSX.",
      instructor: "Sarah Johnson",
    },
    {
      id: "l2",
      title: "Lesson 2: JSX & Components",
      durationSec: 240,
      url: "/video2.mp4",
      description: "Dive deep into JSX syntax and component architecture. Learn how to create reusable components, pass props, and compose complex user interfaces from simple building blocks.",
      instructor: "Sarah Johnson",
    },
    {
      id: "l3",
      title: "Lesson 3: State & Props",
      durationSec: 300,
      url: "/video1.mp4",
      description: "Master state management and props in React. Learn how to make components dynamic and interactive, handle events, and implement conditional rendering.",
      instructor: "Sarah Johnson",
    },
    {
      id: "l4",
      title: "Lesson 4: Hooks Deep Dive",
      durationSec: 360,
      url: "/video2.mp4",
      description: "Learn how to handle side effects in React components using the useEffect hook. We'll cover cleanup functions, dependency arrays, and common patterns for managing component lifecycle.",
      instructor: "Sarah Johnson",
    },
    {
      id: "l5",
      title: "Lesson 5: Advanced Topics",
      durationSec: 420,
      url: "/video1.mp4",
      locked: true,
      description: "Explore advanced React concepts including Context API, performance optimization techniques, and testing strategies for building robust applications.",
      instructor: "Sarah Johnson",
    },
    {
      id: "l6",
      title: "Lesson 6: Performance Optimization",
      durationSec: 480,
      url: "/video2.mp4",
      locked: true,
      description: "Learn techniques to make your React applications faster and more efficient, including memoization, code splitting, and bundle optimization.",
      instructor: "Sarah Johnson",
    },
  ],
  chaptersByLessonId: {
    l1: [
      { label: "Welcome", atSec: 0 },
      { label: "What is React", atSec: 30 },
      { label: "Setup Environment", atSec: 90 },
      { label: "First Component", atSec: 150 },
    ],
    l2: [
      { label: "JSX Basics", atSec: 0 },
      { label: "Components", atSec: 60 },
      { label: "Props", atSec: 120 },
      { label: "Component Composition", atSec: 180 },
    ],
    l3: [
      { label: "State Management", atSec: 0 },
      { label: "Props Deep Dive", atSec: 60 },
      { label: "Event Handling", atSec: 120 },
      { label: "Conditional Rendering", atSec: 180 },
    ],
    l4: [
      { label: "useState Hook", atSec: 0 },
      { label: "useEffect Hook", atSec: 60 },
      { label: "Custom Hooks", atSec: 120 },
      { label: "Hook Rules", atSec: 180 },
    ],
    l5: [
      { label: "Context API", atSec: 0 },
      { label: "Performance", atSec: 120 },
      { label: "Testing", atSec: 240 },
    ],
    l6: [
      { label: "Memoization", atSec: 0 },
      { label: "Code Splitting", atSec: 120 },
      { label: "Bundle Optimization", atSec: 240 },
    ],
  },
  transcriptByLessonId: {
    l1: [
      { atSec: 0, text: "Welcome to React Fundamentals! In this course, we'll explore the core concepts that make React such a powerful library for building user interfaces." },
      { atSec: 30, text: "React was developed by Facebook and has become the most popular JavaScript library for building user interfaces. It's component-based, declarative, and efficient." },
      { atSec: 60, text: "Let's start by understanding what React is and why it's so popular. React allows you to build complex UIs from simple, reusable components." },
      { atSec: 90, text: "Now let's set up our development environment. We'll need Node.js, a code editor, and we'll create our first React project using Create React App." },
      { atSec: 120, text: "Great! Now that we have our environment set up, let's create our first React component. We'll start with a simple Hello World example." },
      { atSec: 150, text: "This is the foundation of React development. In the next lesson, we'll dive deeper into JSX and component composition." },
    ],
    l2: [
      { atSec: 0, text: "Welcome to Lesson 2! Today we're diving into JSX and Components, the building blocks of React applications." },
      { atSec: 30, text: "JSX stands for JavaScript XML. It allows you to write HTML-like code directly in your JavaScript files, making it easier to visualize your component structure." },
      { atSec: 60, text: "Let's create our first functional component. Components are reusable pieces of UI that can accept props and return JSX." },
      { atSec: 90, text: "Props are how we pass data from parent components to child components. They're read-only and help make our components reusable." },
      { atSec: 120, text: "Now let's explore component composition - how we can combine multiple components to create complex user interfaces." },
      { atSec: 180, text: "Understanding JSX and components is crucial for React development. In the next lesson, we'll learn about state management." },
    ],
    l3: [
      { atSec: 0, text: "Welcome to Lesson 3! Today we're exploring State and Props in depth - the core concepts that make React components dynamic and interactive." },
      { atSec: 30, text: "State is what makes React components dynamic. It's data that can change over time and causes the component to re-render when it updates." },
      { atSec: 60, text: "Props are passed down from parent components and are immutable. They're perfect for passing data and configuration to child components." },
      { atSec: 90, text: "Event handling in React is straightforward. We use camelCase event names and pass functions as event handlers." },
      { atSec: 120, text: "Conditional rendering allows us to show different content based on certain conditions. This is essential for creating dynamic user interfaces." },
      { atSec: 180, text: "State and props work together to create powerful, interactive components. Next, we'll explore React Hooks for even more functionality." },
    ],
    l4: [
      { atSec: 0, text: "Welcome to Lesson 4! Today we're diving deep into React Hooks - the modern way to add state and side effects to functional components." },
      { atSec: 30, text: "The useState hook is the most fundamental hook. It allows functional components to have local state that can change over time." },
      { atSec: 60, text: "useEffect is another essential hook that handles side effects in functional components. It's perfect for API calls, subscriptions, and DOM manipulation." },
      { atSec: 90, text: "Custom hooks allow us to extract component logic into reusable functions. This promotes code reuse and keeps components clean." },
      { atSec: 120, text: "There are important rules to follow when using hooks. Always call hooks at the top level and only in React functions." },
      { atSec: 180, text: "Hooks have revolutionized React development by making functional components as powerful as class components. In the next lesson, we'll explore advanced topics." },
    ],
    l5: [
      { atSec: 0, text: "Welcome to Advanced React Topics! In this lesson, we'll explore the Context API, performance optimization, and testing strategies." },
      { atSec: 60, text: "The Context API provides a way to pass data through the component tree without having to pass props down manually at every level." },
      { atSec: 120, text: "Performance optimization is crucial for large React applications. We'll learn about React.memo, useMemo, and useCallback." },
      { atSec: 180, text: "Testing is essential for maintaining code quality. We'll explore different testing strategies and tools for React applications." },
      { atSec: 240, text: "These advanced concepts will help you build more robust and maintainable React applications." },
    ],
    l6: [
      { atSec: 0, text: "Welcome to Performance Optimization! In this final lesson, we'll learn techniques to make your React applications faster and more efficient." },
      { atSec: 60, text: "Memoization is a key technique for preventing unnecessary re-renders. We'll explore React.memo and useMemo in detail." },
      { atSec: 120, text: "Code splitting allows you to split your bundle into smaller chunks that can be loaded on demand, improving initial load times." },
      { atSec: 180, text: "Bundle optimization involves techniques like tree shaking, minification, and compression to reduce bundle size." },
      { atSec: 240, text: "Congratulations! You've completed the React fundamentals course. You now have a solid foundation for building React applications." },
    ],
  },
};
