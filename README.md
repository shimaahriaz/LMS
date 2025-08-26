# LMS Course Video Player

A modern, responsive LMS (Learning Management System) course video player built with React, TypeScript, and Redux Toolkit. This application provides a comprehensive video learning experience with features like progress tracking, note-taking, and interactive transcripts.

## 🚀 Features

### Core Functionality
- **Video Player**: HTML5 video player with custom controls
- **Progress Tracking**: Automatic lesson completion tracking (90% watch time)
- **Chapter Navigation**: Clickable chapter markers for easy navigation
- **Responsive Design**: Mobile-first design with collapsible sidebar

### Video Controls
- Play/Pause, seek, volume control
- Playback speed adjustment (0.5x - 2x)
- Captions toggle
- Fullscreen support
- Keyboard accessibility

### Course Management
- **Lesson Navigation**: Switch between lessons with completion states
- **Progress Bar**: Visual course completion indicator
- **Locked Lessons**: Progressive lesson unlocking system

### Interactive Features
- **Timestamped Notes**: Add, edit, and delete notes with timestamps
- **Transcript Sync**: Auto-scrolling transcript with current cue highlighting
- **Chapter Markers**: Visual chapter indicators under video
- **Q&A System**: Course-specific questions and answers

### State Management
- **Redux Toolkit**: Centralized state management
- **Local Storage**: Persistent notes and progress
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Video**: HTML5 Video API
- **Storage**: localStorage for persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Layout components (Header, Navigation, etc.)
│   ├── video/            # Video player components
│   ├── tabs/             # Tab content components
│   └── transcript/       # Transcript-related components
├── store/
│   ├── index.ts          # Redux store configuration
│   └── slices/           # Redux slices (course, videoPlayer, notes)
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── data/                 # Mock data and course content
└── utils/                # Utility functions
```

## 🎯 Design Patterns Used

1. **Custom Hooks Pattern**: Reusable logic extraction
2. **Redux Pattern**: Centralized state management
3. **Component Composition**: Flexible component architecture
4. **Factory Pattern**: Component creation utilities
5. **Observer Pattern**: Video event handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lms-course-video
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: Collapsible sidebar, accordion-style transcript/notes
- **Tablet**: Side-by-side layout with optimized spacing
- **Desktop**: Full-featured layout with all panels visible

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all controls
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus states and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_VIDEO_CDN_URL=your_video_cdn_url_here
```

### Customization
- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Video Sources**: Update video URLs in `src/data/courseData.ts`
- **Captions**: Add VTT files to the `public/videos/` directory

## 📊 Performance Optimizations

- **Code Splitting**: Lazy-loaded components
- **Memoization**: React.memo for expensive components
- **Debounced Updates**: Optimized video time updates
- **Efficient Rendering**: Minimal re-renders with proper dependencies

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Redux Toolkit team for simplified state management
- Tailwind CSS for the utility-first CSS framework
- Vite team for the fast build tool

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Note**: This is a demonstration project. In a production environment, you would need to:
- Implement proper authentication
- Add real video streaming
- Connect to a backend API
- Add proper error handling
- Implement analytics tracking
- Add comprehensive testing
