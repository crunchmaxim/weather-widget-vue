<template>
  <div class="weather-widget">
    <!-- Header -->
    <div class="weather-widget__header">
      <div class="weather-widget__title">{{ weatherData.title }}</div>
      <div>Edit</div>
    </div>

    <!-- Temperature -->
    <div class="weather-widget__temp">
      <img class="weather-widget__temp-img" :src="weatherData.imageUrl" />
      <div class="weather-widget__temp-value"> {{ weatherData.temperature }} </div>
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
}
</script>

<style lang="scss">
  .weather-widget {
    width: 250px;
    height: 400px;
    border-radius: 10px;
    background-color: #00e1ff;
    padding: 10px;

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