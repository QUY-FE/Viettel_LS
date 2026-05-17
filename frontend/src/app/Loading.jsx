import React from "react";
import Skeleton from "react-loading-skeleton";
const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <Skeleton className="w-full h-[50vh] my-4" />

      <Skeleton className="w-full h-10 " />
      <Skeleton className="w-full h-10 " />

      <div className="flex items-center justify-between my-4 ">
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
      </div>

      <Skeleton className="w-full h-10 " />

      <div className="flex items-center justify-between my-4 ">
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
      </div>
    </div>
  );
};

export default Loading;
