<template>
  <div id="app">
    <WeatherWidget v-if="weatherData" :weatherData="weatherData"/>
    <div v-else>{{ errorMessage }}</div>
  </div>
</template>

<script>
import Vue from 'vue';
import WeatherWidget from './components/WeatherWidget'
import { WeatherService } from '@/Services'

export default Vue.extend({
  name: 'App',
  components: {
    WeatherWidget
  },
  props: {
    apikey: {
      type: String,
      default () {
        return process.env.VUE_APP_API_KEY
      }
    }
  },
  data() {
    this.service = null
    return {
      weatherData: null,
      errorMessage: null,
    }
  },
  async created () {
    await this.setApiKeyToStore()

    this.service = new WeatherService() // Init service when api key setted to store

    this.getCurrentWeather()
      .then(() => this.setCurrentWeatherToLocalStorage())
      .catch(e => {
        this.errorMessage = e.message
      })
  },
  methods: {
    async setApiKeyToStore () {
      await this.$store.dispatch('setApiKey', this.apikey)
    },
    async getCurrentWeather () {
      this.weatherData = await this.service.getWeatherByCurrentUserLocation()
    },
    setCurrentWeatherToLocalStorage () {
      this.service.addLocationToLocalStorage(this.weatherData.name)
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
