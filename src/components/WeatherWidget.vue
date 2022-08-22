<template>
  <div class="weather-widget">

    <div class="weather-widget__error" v-if="errorMessage">
      <div class="weather-widget__error-title">{{ errorMessage }}</div>
      <LocationDenied class="weather-widget__error-icon" />
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
import store from './../store'
import WeatherWidgetData from './WeatherWidgetData'
import WeatherWidgetSettings from './WeatherWidgetSettings'
import { WeatherService } from '@/Services'
import LocationDenied from '@/src/assets/remove-location-svgrepo-com.svg'

export default {
  store,
  name: "WeatherWidget",
  components: {
    WeatherWidgetData,
    WeatherWidgetSettings,
    LocationDenied,
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

    this.getCurrentWeather()
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
      try {
        this.weatherData = await this.service.getWeatherByCurrentUserLocation()
      } catch (error) {
        this.errorMessage = error.message
      }
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

    &__error {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-title {
        font-size: 30px;
        font-weight: 600;
      }

      &-icon {
        width: 100px;
        height: 100px;
        margin-top: 20px;
      }
    }
  }
</style>