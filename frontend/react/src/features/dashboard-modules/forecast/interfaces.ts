interface TempInterface {
  min: number;
  max: number;
}

export interface ForecastDailyInterface {
  date: Date;
  temp: TempInterface;
  wind: number;
  rain: number;
  weather_icon: string;
}
