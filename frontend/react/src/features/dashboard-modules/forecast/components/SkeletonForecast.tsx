import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonForecast = () => {
  const baseColor = "white";
  const highlightColor = "#e6ffe6";
  //   const highlightColor = "black";

  return (
    <ul className="flex flex-col h-[280px] p-2 justify-between ">
      {Array(7)
        .fill(null)
        .map((_, index) => (
          <li key={index} className="flex gap-2">
            {/* Date */}
            <Skeleton
              height={20}
              width={84}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            {/* Temp */}
            <Skeleton
              height={20}
              width={30}
              borderRadius={50}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            {/* Wind */}
            <Skeleton
              height={20}
              width={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            {/* Rain */}
            <Skeleton
              height={20}
              width={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            {/* Icon forecast */}
            <Skeleton
              height={20}
              width={50}
              baseColor={baseColor}
              highlightColor={highlightColor}
              borderRadius={50}
            />
          </li>
        ))}
    </ul>
  );
};

export default SkeletonForecast;
