import { mockCourse } from "../Data/course";

export default function Header() {
 
  return (
    <header className="bg-blue-50 shadow p-4">
      <div className="text-center">
        {/* Course Title */}
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{mockCourse.title}</h1>

        {/* Breadcrumb */}
        <nav className="text-gray-600 text-sm">
          Home &gt; My Courses &gt;{" "}
          <span className="text-gray-800 font-medium">{mockCourse.title}</span>
        </nav>
      </div>

     
    </header>
  );
}
