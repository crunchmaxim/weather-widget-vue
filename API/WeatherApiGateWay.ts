import axios from 'axios'
import store from '@/src/store'

const baseURL = process.env.VUE_APP_BASE_URL

const http = axios.create({
  baseURL,
})

export default class WeatherApiGateWay {
  apiKey: string

  constructor () {
    this.apiKey = store.getters.apiKey
  }

  async getWeatherByCity (cityName: string) {
    const res = await http.get(`weather?q=${cityName}&appid=${this.apiKey}&units=metric`)
    return res.data
  }

  async getWeatherByCoords (lat: number, lon: number) {
    const res = await http.get(`weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`)
    return res.data
  }
}
