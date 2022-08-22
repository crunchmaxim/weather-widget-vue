<template>
  <div class="weather-widget">

    <div class="weather-widget__error" v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="weather-widget__container" v-if="weatherData">

      <WeatherWidgetData
        v-if="!isSettingsOpen"
        :weatherData="weatherData"
        @openSettings="toggleSettings"
      />
      <WeatherWidgetSettings
        v-else
        @newCitySelected="getCurrentWeather"
        @closeSettings="toggleSettings"
      />

    </div>
  </div>
</template>

<script>
import WeatherWidgetData from './WeatherWidgetData'
import WeatherWidgetSettings from './WeatherWidgetSettings'
import { WeatherService } from '@/Services'

export default {
  name: "WeatherWidget",
  components: {
    WeatherWidgetData,
    WeatherWidgetSettings,
  },
  props: {
    apiKey: {
      type: String,
      required: true
    }
  },
  data () {
    this.service = null
    return {
      weatherData: null,
      errorMessage: null,
      isSettingsOpen: false,
    }
  },
  async created () {
    await this.setApiKeyToStore()
    this.service = new WeatherService() // Init service when api key setted to store

    try {
      this.getCurrentWeather()
    } catch (error) {
      this.errorMessage = error.message
    }
  },
  methods: {
    async setApiKeyToStore () {
      await this.$store.dispatch('setApiKey', this.apiKey)
    },
    async getCurrentWeather () {
      const currentCity = localStorage.getItem('currentCity')

      if (currentCity) {
        return this.getWeatherByCity(currentCity)
      }
      this.getWeatherByUserLocation()
    },
    async getWeatherByCity (city) {
      this.weatherData = await this.service.getWeatherByCity(city)
    },
    async getWeatherByUserLocation () {
      this.weatherData = await this.service.getWeatherByCurrentUserLocation()
      this.service.addCityToLocalStorage(this.weatherData.name)
      this.service.addCurrentCityToLocalStorage(this.weatherData.name)
    },
    toggleSettings () {
      this.isSettingsOpen = !this.isSettingsOpen
    },
  }
}
</script>

<style lang="scss">
  .weather-widget {
    width: 250px;
    height: 380px;
    border-radius: 10px;
    background-color: #21E1E1;
    padding: 20px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__temp {
      &-value {
        font-size: 30px;
      }
    }
  }
</style>