import { AxiosResponse } from 'axios';
import { Weather } from '../Redux/types/types';
import api from '../axios';

export class WeatherService {
  static getCurrentWeather(city: string): Promise<AxiosResponse<Weather>> {
    return api.get<Weather>(`/weather?q=${city}`);
  }
}
