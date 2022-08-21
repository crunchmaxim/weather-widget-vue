type WeatherDataType = {
  id: string,
  main: string,
  description: string,
  icon: string,
}

export default class WeatherByCityModel {
  name: string
  _temperature: number
  _feelsLikeTemperature: number
  windSpeed: number
  pressure: number
  humidity: number
  visibility: number
  country: string
  weather: WeatherDataType

  constructor(data: any) {
    this.name = data.name
    this.country = data.sys.country
    this._temperature = data.main.temp
    this._feelsLikeTemperature = data.main.feels_like
    this.windSpeed = data.wind.speed
    this.pressure = data.main.pressure
    this.humidity = data.main.humidity
    this.visibility = data.visibility
    this.weather = data.weather[0]
  }

  get title () {
    return `${this.name}, ${this.country}`
  }

  get temperature () {
    return `${Math.round(this._temperature)} °C`
  }

  get feelsLikeTemperature () {
    return `${Math.round(this._feelsLikeTemperature)} °C`
  }

  get imageUrl () {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
  }
}