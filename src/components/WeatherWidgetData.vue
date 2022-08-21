<template>
  <div class="weather-widget-data">
    <!-- Header -->
    <div class="weather-widget-data__header">
      <div class="weather-widget-data__header-title">{{ weatherData.title }}</div>
      <img class="weather-widget-data__header-settings" src="@/src/assets/gear-svgrepo-com.svg" @click="openSettings">
    </div>

    <!-- Temperature -->
    <div class="weather-widget-data__temperature">
      <img class="weather-widget-data__temperature-img" :src="weatherData.imageUrl" />
      <div class="weather-widget-data__temperature-value"> {{ weatherData.temperature }} </div>
      <div class="weather-widget-data__temperature-feels-like"> {{ weatherData.feelsLikeTemperature }} </div>
    </div>

    <!-- Additional info (wind, pressure, etc.) -->
    <div class="weather-widget-data__additional">
      <!-- Wind speed -->
      <div class="weather-widget-data__additional-item">
        <img class="weather-widget-data__additional-item-icon" src="@/src/assets/wind-svgrepo-com.svg" />
        <div class="weather-widget-data__additional-item-value">{{ weatherData.windSpeed }}</div>
      </div>

      <!-- Pressure -->
      <div class="weather-widget-data__additional-item">
        <img class="weather-widget-data__additional-item-icon" src="@/src/assets/gauge-indicator-svgrepo-com.svg" />
        <div class="weather-widget-data__additional-item-value">{{ weatherData.pressure }}</div>
      </div>

      <!-- Humidity -->
      <div class="weather-widget-data__additional-item">
        <img class="weather-widget-data__additional-item-icon" src="@/src/assets/humidity-svgrepo-com.svg" />
        <div class="weather-widget-data__additional-item-value">{{ weatherData.humidity }}</div>
      </div>

      <!-- Visibility -->
      <div class="weather-widget-data__additional-item">
        <img class="weather-widget-data__additional-item-icon" src="@/src/assets/visibility-svgrepo-com.svg" />
        <div class="weather-widget-data__additional-item-value">{{ weatherData.visibility }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { WeatherByCityModel } from '@/Models'

export default {
  name: "WeatherWidget",
  props: {
    weatherData: {
      type: WeatherByCityModel,
      required: true
    }
  },
  data () {
    return {
      mode: 'weather'
    }
  },
  methods: {
    openSettings () {
      this.$emit('openSettings')
    }
  }
}
</script>

<style lang="scss">
  .weather-widget-data {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-settings {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }

      &-title {
        font-weight: 600;
      }
    }

    &__temperature {
      &-value {
        font-size: 30px;
        font-weight: 600;
      }
    }

    &__additional {
      &-item {
        margin-top: 20px;
        display: flex;
        align-items: center;

        &-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }

        &-value {
          font-weight: 600;
        }
      }
    }
  }
</style>