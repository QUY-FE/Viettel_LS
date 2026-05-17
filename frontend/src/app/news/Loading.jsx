import React from "react";
import Skeleton from "react-loading-skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-between my-4 ">
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
      </div>
      <div className="flex items-center justify-between my-4 ">
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
        <Skeleton width={400} height={400} />
      </div>
    </>
  );
};

export default Loading;
