type CourseProgressProps = {
  completedLessons: number;
  totalLessons: number;
};

export default function CourseProgress({
  completedLessons,
  totalLessons,
}: CourseProgressProps) {
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 pb-4">
      {/* Progress Bar */}
      <div className="mb-4">
        {/* Time & Progress */}
        <div className="flex justify-between items-center text-sm mb-4 px-4 font-[600] text-[18px]">
          <span>Progress Course</span>

          <span
            className={`px-2 py-0.5 rounded ${
              progressPercentage >= 90
                ? "bg-green-600 text-white"
                : "text-black"
            }`}
          >
            {progressPercentage >= 90
              ? "Completed"
              : `${progressPercentage}% Completed`}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mx-3 mt-2 mb-3">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          <div className="flex justify-between items-center pb-3 mt-2">
            <p className="text-sm text-gray-500 font-[600] text-[18px] pb-4">
              {completedLessons} of {totalLessons} Lessons Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
