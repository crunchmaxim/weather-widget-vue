import { WeatherApiGateWay } from '@/ApiGateWays'
import { WeatherByCityModel } from '@/Models'

export default class WeatherService {
  static async getWeatherByCity (cityName: string) {
    const data = await WeatherApiGateWay.getWeatherByCity(cityName)
    return new WeatherByCityModel(data)
  }

  static async getWeatherByCoords(lat: number, lon: number) {
    const data = await WeatherApiGateWay.getWeatherByCoords(lat, lon)
    return new WeatherByCityModel(data)
  }

  static async getWeatherByCurrentUserLocation () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (geoData) => {
          this.getWeatherByCoords(geoData.coords.latitude, geoData.coords.longitude)
            .then((weatherData) => resolve(weatherData))
        },
        (error) => reject(error)
      )
    })
  }
}