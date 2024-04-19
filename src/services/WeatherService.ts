import { AxiosResponse } from 'axios';
import { Weather } from '../Redux/types/types';
import api from '../axios';

export class WeatherService {
  static async getCurrentWeather(
    city: string,
  ): Promise<AxiosResponse<Weather>> {
    try {
      const response = await api.get<Weather>(`/weather?q=${city}`);
      console.log(response.data); // Вывод полученных данных
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
