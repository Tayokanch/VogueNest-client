const SkeletonLoader = () => {
  return (
    <div className="text-gray-700 cursor-pointer animate-pulse">
      <div className="overflow-hidden">
        <div className="bg-gray-200 h-40 w-full rounded-lg"></div>{' '}
        {/* Image skeleton */}
      </div>
      <div className="pt-3 pb-1">
        <div className="bg-gray-200 h-4 w-3/4 rounded"></div>{' '}
        {/* Name skeleton */}
      </div>
      <div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>{' '}
        {/* Price skeleton */}
      </div>
    </div>
  );
};

export default SkeletonLoader;
