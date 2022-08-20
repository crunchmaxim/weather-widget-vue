import { WeatherApiGateWay } from '@/ApiGateWays'
import { WeatherByCityModel } from '@/Models'

export default class WeatherService {
  static async getWeatherByCity (cityName: string) {
    const data = await WeatherApiGateWay.getWeatherByCity(cityName)
    return new WeatherByCityModel(data)
  }
}