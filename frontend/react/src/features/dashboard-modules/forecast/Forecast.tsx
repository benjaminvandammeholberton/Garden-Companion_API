import ForecastDailyItem from "./components/ForecastdailyItem";
import SkeletonForecast from "./components/SkeletonForecast";
import useGetForecast from "./useGetForecast";

const Forecast = () => {
  const [foreacastData, isLoading, error] = useGetForecast();

  return (
    <div>
      {isLoading && <SkeletonForecast />}
      {error && <p>error</p>}
      {!isLoading && (
        <ul className="gap-2 flex flex-col text-xl font-thin overflow-y-scroll p-2">
          {foreacastData.map((dailyForecast, index) => (
            <ForecastDailyItem key={index} dailyForecast={dailyForecast} />
          ))}
        </ul>
      )}
    </div>
  );
};
export default Forecast;
