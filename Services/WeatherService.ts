import { WeatherApiGateWay } from '@/API'
import { WeatherByCityModel } from '@/Models'


export default class WeatherService {
  api: WeatherApiGateWay

  constructor () {
    this.api = new WeatherApiGateWay()
  }

  async getWeatherByCity (cityName: string) {
    const data = await this.api.getWeatherByCity(cityName)
    return new WeatherByCityModel(data)
  }

  async getWeatherByCoords(lat: number, lon: number) {
    const data = await this.api.getWeatherByCoords(lat, lon)
    return new WeatherByCityModel(data)
  }

  async getWeatherByCurrentUserLocation () {
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

  getLocationsFromStorage () {
    if (!localStorage.getItem('locationsArr')) {
      localStorage.setItem('locationsArr', JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem('locationsArr')!)
  }

  addLocationToLocalStorage (locationName: string) {
    const locationsArr: string[] = this.getLocationsFromStorage()

    // Use Set to avoid duplicates
    const locations: Set<string> = new Set(locationsArr)
    locations.add(locationName)

    localStorage.setItem('locationsArr', JSON.stringify(Array.from(locations)))
  }
}