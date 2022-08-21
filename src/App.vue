<template>
  <div id="app">
    <h1>App component</h1>
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
  data() {
    return {
      weatherData: null,
      errorMessage: null,
    }
  },
  async created () {
    try {
    this.weatherData = await WeatherService.getWeatherByCurrentUserLocation()
    } catch (e) {
      console.log(e)
      this.errorMessage = e.message
    }
  },
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
