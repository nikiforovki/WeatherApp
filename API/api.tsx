import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function fetchWeatherData() {
  try {
    const response = await axios.get(process.env.API_URL);
    console.log(response.data);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

fetchWeatherData();

async function checkWeather() {
  try {
    const response = await fetch(process.env.API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data, 'data');
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

checkWeather();
