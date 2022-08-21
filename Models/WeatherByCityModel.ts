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
  _windSpeed: number
  _pressure: number
  _humidity: number
  _visibility: number
  country: string
  weather: WeatherDataType

  constructor(data: any) {
    this.name = data.name
    this.country = data.sys.country
    this._temperature = data.main.temp
    this._feelsLikeTemperature = data.main.feels_like
    this._windSpeed = data.wind.speed
    this._pressure = data.main.pressure
    this._humidity = data.main.humidity
    this._visibility = data.visibility
    this.weather = data.weather[0]
  }

  get title () {
    return `${this.name}, ${this.country}`
  }

  get temperature () {
    return `${Math.round(this._temperature)} °C`
  }

  get feelsLikeTemperature () {
    return `Feels like ${Math.round(this._feelsLikeTemperature)} °C`
  }

  get imageUrl () {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`
  }

  get windSpeed () {
    return `Wind speed: ${this._windSpeed} m/s`
  }

  get pressure () {
    return `Pressure: ${this._pressure} hPa`
  }

  get humidity () {
    return `Humidity: ${this._humidity} %`
  }

  get visibility () {
    return `Visibility: ${(this._visibility / 1000).toFixed(1)} km`
  }
}