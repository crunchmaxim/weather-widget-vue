<template>
  <div class="weather-widget">
    <h1>1</h1>
    <div>{{ weatherData }}</div>
  </div>
</template>

<script>
import { WeatherService } from '@/Services'

export default {
  name: "WeatherWidget",
  data() {
    return {
      weatherData: null
    }
  },
  async created () {
    this.weatherData = await WeatherService.getWeatherByCity('Moscow')
  }
}
</script>

<style>

</style>