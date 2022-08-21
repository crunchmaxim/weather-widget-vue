<template>
  <div class="weather-widget-settings">
    <!-- Header -->
    <div class="weather-widget-settings__header">
      <div class="weather-widget-settings__header-title">Settings</div>
      <div class="weather-widget-settings__header-close">Close</div>
    </div>

    <!-- Locations -->
    <div class="weather-widget-settings__locations">

      <div class="weather-widget-settings__locations-item" v-for="location in locationsArr" :key="location">
        <span>drag </span>
        <span>{{ location }}</span>
        <span> delete</span>
      </div>

    </div>

    <!-- Add location -->
    <div class="weather-widget-settings__add">
      <div class="weather-widget-settings__add-title">Add location:</div>
      <input class="weather-widget-settings__add-input" type="text" v-model="newLocation">
      <button @click="addNewLocation">+</button>
    </div>
  </div>
</template>

<script>
import { WeatherService } from '@/Services'

export default {
  name: 'WeatherWidgetSettings',
  data () {
    this.service = null
    return {
      locationsArr: [],
      newLocation: '',
    }
  },
  created () {
    this.service = new WeatherService()

    this.setLocationsArr()
  },
  methods: {
    setLocationsArr () {
      this.locationsArr = this.service.getLocationsFromStorage()
    },
    addNewLocation () {
      if (!this.newLocation) {
        return
      }

      this.service.addLocationToLocalStorage(this.newLocation)
      this.setLocationsArr()
      this.newLocation = ''
    },
  },
}
</script>

<style lang="scss">
  .weather-widget-settings {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__locations {
      margin-top: 20px;

      &-item {
        background-color: #3B9AE1;
        padding: 10px;
        border-radius: 10px;
        color: #fff;

        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>