export default class WeatherByCityModel {
  name: string
  feelsLike: string
  weatherMain: string
  weatherDescription: string
  windSpeed: string
  pressure: string
  humidity: string
  visibility: string
  country: string

  constructor(data: any) {
    this.name = data.name
    this.country = data.sys.country
    this.feelsLike = data.main.feels_like
    this.weatherMain = data.weather[0].main
    this.weatherDescription = data.weather[0].description
    this.windSpeed = data.wind.speed
    this.pressure = data.main.pressure
    this.humidity = data.main.humidity
    this.visibility = data.visibility
  }
}