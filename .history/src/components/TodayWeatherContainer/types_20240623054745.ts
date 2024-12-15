export type WeatherData = {
  temperature: number;
  description: string;
};

export type RootState = {
  weatherData: WeatherData | null;
  error: {
    message: string;
  } | null;
};

export type IconCode = string;
