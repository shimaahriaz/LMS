# LMS Course Video Application

A modern, responsive Learning Management System (LMS) video course application built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive learning experience with interactive video lessons, progress tracking, and note-taking capabilities.

## Features

### Course Management
- **Multiple Lessons**: 6 comprehensive React lessons with realistic content
- **Lesson States**: Current, completed, and locked lesson indicators
- **Progress Tracking**: Visual progress indicators and completion status
- **Auto-advance**: Automatically moves to the next lesson when current is completed

### Video Player
- **HTML5 Video Player**: Native browser video controls
- **Progress Tracking**: Real-time video progress monitoring
- **Resume Functionality**: Remembers last played position across sessions
- **Seek Integration**: Seamless seeking from transcript and notes
- **Time Synchronization**: Precise timestamp tracking for all features

### Interactive Transcript
- **Auto-scrolling**: Automatically follows video progress
- **Click to Seek**: Click any transcript segment to jump to that time
- **Visual Highlighting**: Current segment is highlighted in blue
- **Rich Content**: Detailed, educational transcript content for each lesson
- **Smooth Animations**: Smooth scrolling and transitions

### Smart Notes System
- **Timestamped Notes**: Add notes at specific video timestamps
- **Persistent Storage**: Notes saved in localStorage with timestamps and dates
- **Click to Seek**: Click note timestamp to jump to that video time
- **Date Preservation**: Notes show creation date and survive page refresh
- **Delete Functionality**: Remove notes with trash icon
- **Real-time Updates**: Notes count updates in tab header

### Chapter Markers
- **Visual Navigation**: Small chapter pills under the video
- **Active State**: Current chapter highlighted with pulsing indicator
- **Progress States**: Visual indication of completed, current, and upcoming chapters
- **Click to Seek**: Click chapter to jump to that time
- **Responsive Design**: Adapts to different screen sizes

### Navigation & UI
- **Responsive Sidebar**: Collapsible lessons sidebar with mobile support
- **Breadcrumbs**: Clear navigation path showing course structure
- **Tabbed Interface**: Clean tabs for Overview, Transcript, and Notes
- **Modern Design**: Professional UI with smooth animations
- **Mobile-First**: Fully responsive design for all devices

## Architecture

### Core Components

#### `App.tsx`
- Main application component
- State management for lessons, progress, and video
- Integration of all components
- Auto-advance logic for completed lessons

#### `LessonTabs.tsx`
- Tabbed interface with Overview, Transcript, and Notes
- localStorage integration for persistent notes
- Auto-scrolling transcript functionality
- Real-time note management

#### `LessonsSidebar.tsx`
- Responsive sidebar with lesson list
- Lesson state indicators (current, completed, locked)
- Progress summary with visual bar
- Mobile-friendly slide-out design

#### `VideoPlayer.tsx`
- HTML5 video player wrapper
- Progress tracking and time synchronization
- Resume functionality with localStorage
- Seek integration for external controls

#### `Breadcrumbs.tsx`
- Navigation breadcrumbs
- Course and lesson path display
- Responsive design

#### `CourseProgress.tsx`
- Visual progress indicator
- Completion percentage display
- Lesson count tracking

### Data Structure

#### Course Data (`course.ts`)
```typescript
interface Lesson {
  id: string;
  title: string;
  durationSec: number;
  url: string;
  locked?: boolean;
  description?: string;
  instructor?: string;
}

interface Course {
  id: string;
  title: string;
  lessons: Lesson[];
  chaptersByLessonId: Record<string, Chapter[]>;
  transcriptByLessonId: Record<string, TranscriptCue[]>;
}
```

#### Notes System
```typescript
interface Note {
  id: string;
  timestamp: number;
  text: string;
  createdAt: Date;
}
```

## Technical Implementation

### State Management
- **React Hooks**: useState, useEffect, useRef for local state
- **localStorage**: Persistent data storage for notes and progress
- **TypeScript**: Full type safety throughout the application

### Data Persistence
- **Notes Storage**: Per-lesson localStorage with timestamp preservation
- **Progress Tracking**: Completion status and video position
- **Error Handling**: Comprehensive error handling for localStorage operations

### Responsive Design
- **Tailwind CSS**: Utility-first CSS framework
- **Mobile-First**: Responsive design starting from mobile
- **Flexible Layout**: Adapts to different screen sizes
- **Touch-Friendly**: Optimized for touch interactions

### Performance Optimizations
- **Lazy Loading**: Components load as needed
- **Efficient Re-renders**: Optimized React component updates
- **Smooth Animations**: CSS transitions for better UX
- **Memory Management**: Proper cleanup of event listeners

## Responsive Features

### Desktop Experience
- **Fixed Sidebar**: 320px wide lessons sidebar
- **Full Video Player**: Large video player with controls
- **Tabbed Interface**: Clean, organized content tabs
- **Hover Effects**: Interactive hover states

### Mobile Experience
- **Slide-out Sidebar**: Overlay sidebar with toggle button
- **Touch-Optimized**: Large touch targets and gestures
- **Adaptive Layout**: Stacked components for mobile
- **Bottom Drawer**: Accessible bottom drawer for mobile

### Tablet Experience
- **Hybrid Layout**: Combines desktop and mobile features
- **Responsive Breakpoints**: Tailwind responsive classes
- **Touch Support**: Optimized for touch interactions

## UI/UX Features

### Visual Design
- **Modern Aesthetics**: Clean, professional design
- **Consistent Spacing**: Tailwind spacing system
- **Color Scheme**: Blue primary color with gray accents
- **Typography**: Clear, readable font hierarchy

### Interactive Elements
- **Hover States**: Visual feedback on interactive elements
- **Loading States**: Loading indicators for async operations
- **Error States**: Clear error messages and handling
- **Success Feedback**: Visual confirmation for actions

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant color combinations

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd lms-course-video

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### Important Notes for Vercel:
- **Video Files**: The app uses CDN-hosted videos (Google's sample videos) for demonstration
- **localStorage**: Works perfectly on Vercel for notes persistence
- **Performance**: Optimized for Vercel's serverless architecture
- **Caching**: Configured with proper cache headers for video content

### Alternative Video Hosting Options:
1. **Cloudinary**: For video hosting and optimization
2. **AWS S3**: For scalable video storage
3. **Vimeo/YouTube**: For external video hosting
4. **Bunny.net**: For video CDN services

## Project Structure

```
lms-course-video/
├── src/
│   ├── Components/
│   │   ├── LessonTabs.tsx          # Main tabbed interface
│   │   ├── LessonsSidebar.tsx      # Responsive lessons sidebar
│   │   ├── VideoPlayer.tsx         # Video player component
│   │   ├── Breadcrumbs.tsx         # Navigation breadcrumbs
│   │   └── CourseProgress.tsx      # Progress indicator
│   ├── Data/
│   │   └── course.ts               # Mock course data
│   ├── App.tsx                     # Main application component
│   └── main.tsx                    # Application entry point
├── public/
│   └── captions.vtt                # Video captions
└── package.json
```

##  Key Features Summary

### Implemented Features
1. **Responsive Lessons Sidebar** with lesson states and progress
2. **Interactive Video Player** with progress tracking
3. **Auto-scrolling Transcript** with click-to-seek functionality
4. **Persistent Notes System** with timestamp preservation
5. **Chapter Markers** with visual navigation
6. **Tabbed Interface** (Overview, Transcript, Notes)
7. **Breadcrumbs Navigation** for clear course structure
8. **Mobile-First Responsive Design**
9. **localStorage Integration** for data persistence
10. **Auto-advance Logic** for completed lessons

### Design Features
- **Modern UI** with Tailwind CSS
- **Smooth Animations** and transitions
- **Professional Color Scheme**
- **Consistent Typography**
- **Accessibility Compliance**

### 📱 Responsive Features
- **Mobile-Optimized** touch interactions
- **Tablet-Friendly** hybrid layouts
- **Desktop Experience** with full sidebar
- **Adaptive Components** for all screen sizes

## Future Enhancements

### Potential Additions
- **User Authentication** and profiles
- **Course Categories** and filtering
- **Search Functionality** across lessons
- **Bookmarking System** for favorite segments
- **Social Features** like comments and sharing
- **Offline Support** with service workers
- **Analytics Dashboard** for learning progress
- **Multi-language Support** for international users

### Technical Improvements
- **State Management** with Redux or Zustand
- **Backend Integration** with real API
- **Real-time Collaboration** features
- **Advanced Video Controls** and customization
- **Performance Monitoring** and optimization

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support or questions, please open an issue in the repository.

---

**Built with using React, TypeScript, and Tailwind CSS**
