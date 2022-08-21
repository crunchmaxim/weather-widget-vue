<template>
  <div class="weather-widget">
    <WeatherWidgetData
      v-if="mode === 'weather'"
      :weatherData="weatherData"
      @openSettings="openSettings"
    />
    <WeatherWidgetSettings v-if="mode === 'settings'" />
  </div>
</template>

<script>
import { WeatherByCityModel } from '@/Models'
import WeatherWidgetData from './WeatherWidgetData'
import WeatherWidgetSettings from './WeatherWidgetSettings'

export default {
  name: "WeatherWidget",
  components: {
    WeatherWidgetData,
    WeatherWidgetSettings,
  },
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
      this.mode = 'settings'
    }
  }
}
</script>

<style lang="scss">
  .weather-widget {
    width: 250px;
    height: 340px;
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