interface StyledTimeProps {
  index: number;
}
interface StyledTitleProps {
  title: string;
  index: number;
}

interface WeatherState {
  weatherData: any;
  error: string | null;
}

interface RootState {
  weather: WeatherState;
}
