import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL
const apiKey = process.env.VUE_APP_API_KEY

const http = axios.create({
  baseURL,
})

export default class WeatherApiGateWay {
  static async getWeatherByCity (cityName: string) {
    const res = await http.get(`weather?q=${cityName}&appid=${apiKey}&units=metric`)
    return res.data
  }
}
