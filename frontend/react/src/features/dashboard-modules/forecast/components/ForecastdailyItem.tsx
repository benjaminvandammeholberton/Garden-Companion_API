import {
  windIcon,
  sunRainIcon,
  sunCloudIcon,
  sunIcon,
  dropIcon,
  snowIcon,
  thunderIcon,
  cloudIcon,
  rainIcon,
  mistIcon,
  brokenCloudIcon,
} from "../../../../assets/assets-path";
import capitalize from "../../../../utils/capitalizeStr";
import { ForecastDailyInterface } from "../interfaces";

interface ForecastDailyItemInterface {
  dailyForecast: ForecastDailyInterface;
}

const ForecastDailyItem: React.FC<ForecastDailyItemInterface> = ({
  dailyForecast,
}) => {
  const { date, weather_icon, wind, rain, temp } = dailyForecast;

  // Set the days
  const today = new Date();
  const dailyDate = new Date(date);
  let dayString;
  if (today.getDate() === dailyDate.getDate()) {
    dayString = "Ajourd'hui";
  } else if (today.getDate() + 1 === dailyDate.getDate()) {
    dayString = "Demain";
  } else {
    const fullStringDate = dailyDate.toLocaleDateString("Fr-fr", {
      weekday: "long",
    });
    dayString = capitalize(fullStringDate);
  }

  // Set the forecast icon
  const iconsMap: { [key: string]: string } = {
    "01d": sunIcon,
    "02d": sunCloudIcon,
    "03d": cloudIcon,
    "04d": brokenCloudIcon,
    "09d": rainIcon,
    "10d": sunRainIcon,
    "11d": thunderIcon,
    "13d": snowIcon,
    "50d": mistIcon,
  };
  const iconForecast = iconsMap[weather_icon];

  return (
    <li className="flex w-full items-center">
      <div className="flex gap-3">
        <img className="w-8 h-8" src={iconForecast} alt="" />
        <span className="w-36">{dayString}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-2">
          {rain > 0 && (
            <div className="flex flex-col justify-center items-center  w-11">
              <img className="w-4 h-4" src={dropIcon} alt="" />
              <span className="text-xs leading-0">{rain} mm</span>
            </div>
          )}

          {wind > 10 && (
            <div className="flex flex-col justify-center items-center w-11 ">
              <img className="w-4 h-4" src={windIcon} alt="" />
              <span className="text-xs leading-0">{wind}km/h</span>
            </div>
          )}
        </div>

        <div className="flex items-center w-24 justify-center ">
          <span className="w-10 text-center">{temp.min}°</span>
          <span className="w-2 text-center">-</span>
          <span className="w-10 text-center">{temp.max}°</span>
        </div>
      </div>
    </li>
  );
};

export default ForecastDailyItem;
