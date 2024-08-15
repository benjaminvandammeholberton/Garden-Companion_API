import { useEffect, useState } from "react";
import { ForecastDailyInterface } from "./interfaces";

import useAuth from "../../../hooks/useAuth";
import { getForecast } from "./forecastApi";

type useGetForecastReturnType = [
  ForecastDailyInterface[] | [],
  boolean,
  string | null
];

const useGetForecast = (): useGetForecastReturnType => {
  const [user] = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [foreacastData, setForecastData] = useState<ForecastDailyInterface[]>(
    []
  );

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setIsLoading(true);
        const data: ForecastDailyInterface[] = await getForecast();
        localStorage.setItem("forecastData", JSON.stringify(data));
        setForecastData(data);
      } catch (error) {
        setError(error as string);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      const forecastLocalStr = localStorage.getItem("forecastData");
      if (forecastLocalStr) {
        const foreacastLocal = JSON.parse(forecastLocalStr);
        const today = new Date().getDate();
        const forecastLocalDate = new Date(foreacastLocal[0].date).getDate();
        if (today === forecastLocalDate) {
          setForecastData(foreacastLocal);
        } else {
          fetchForecast();
        }
      } else {
        fetchForecast();
      }
    }
  }, [user]);

  return [foreacastData, isLoading, error];
};

export default useGetForecast;
