import React from "react";

interface BreadcrumbsProps {
  courseTitle: string;
  currentLessonTitle: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  courseTitle,
  currentLessonTitle,
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <span className="hover:text-blue-600 cursor-pointer transition-colors">
        Courses
      </span>
      <span className="text-gray-400">/</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">
        {courseTitle}
      </span>
      <span className="text-gray-400">/</span>
      <span className="text-blue-600 font-medium truncate">
        {currentLessonTitle}
      </span>
    </nav>
  );
};

export default Breadcrumbs;
