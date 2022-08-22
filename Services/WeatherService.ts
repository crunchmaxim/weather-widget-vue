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

  getCitiesFromStorage () {
    if (!localStorage.getItem('citiesArr')) {
      localStorage.setItem('citiesArr', JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem('citiesArr')!)
  }

  addCityToLocalStorage (city: string) {
    const citiesArr: string[] = this.getCitiesFromStorage()

    // Use Set to avoid duplicates
    const cities: Set<string> = new Set(citiesArr)
    cities.add(city)

    localStorage.setItem('citiesArr', JSON.stringify(Array.from(cities)))
  }

  addCurrentCityToLocalStorage (city: string | undefined) {
    if (!city) {
      localStorage.removeItem('currentCity')
      return
    }

    localStorage.setItem('currentCity', city)
  }

  setCitiesToLocalStorage (citiesArr: string[]) {
    localStorage.setItem('citiesArr', JSON.stringify(Array.from(citiesArr)))
  }

  deleteCityFromLocalStorage (city: string) {
    const citiesArr: string[] = this.getCitiesFromStorage()
    const currentCity = localStorage.getItem('currentCity')

    const newCitiesArr = citiesArr.filter(c => c !== city)

    if (currentCity === city) {
      this.addCurrentCityToLocalStorage(newCitiesArr[0])
    }

    localStorage.setItem('citiesArr', JSON.stringify(newCitiesArr))
  }
}