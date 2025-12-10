export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 animate-pulse">
      <div className="bg-gray-200 h-48 w-full"></div>
      <div className="p-4">
        <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
        <div className="bg-gray-200 h-6 w-1/3 mb-3 rounded"></div>
        <div className="flex items-center justify-between">
          <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
          <div className="bg-gray-200 h-5 w-16 rounded"></div>
        </div>
        <div className="bg-gray-200 h-3 w-1/4 mt-2 rounded"></div>
      </div>
    </div>
  );
}
