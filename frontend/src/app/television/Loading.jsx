import Skeleton from "react-loading-skeleton";
const Loading = () => {
  return (
    <>
      <div className="flex items-center justify-around my-4">
        <Skeleton width={400} height={350} />
        <Skeleton width={400} height={350} />
        <Skeleton width={400} height={350} />
        <Skeleton width={400} height={350} />
      </div>
     
    </>
  );
};

export default Loading;
