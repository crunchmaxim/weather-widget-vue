<template>
  <div class="weather-widget-settings">
    <!-- Header -->
    <div class="weather-widget-settings__header">
      <div class="weather-widget-settings__header-title">Settings</div>
      <div class="weather-widget-settings__header-close" @click="closeSettings">&#10006;</div>
    </div>

    <!-- Cities -->
    <div class="weather-widget-settings__cities" ref="citiesContainer">

      <draggable
        v-model="citiesArr"
        group="cities"
        @start="drag=true"
        @end="drag=false"
      >
        <div
          :class="`weather-widget-settings__cities-item ${city === currentCity ? 'active' : ''}`"
          v-for="city in citiesArr"
          :key="city"
          @click="setNewSelectedCity(city)"
        >
          <div>{{ city }}</div>
          <div @click="deleteCity(city)">&#10006;</div>
        </div>
      </draggable>

    </div>

    <!-- Add new city -->
    <div class="weather-widget-settings__add">
      <input class="weather-widget-settings__add-input" type="text" v-model="newCity">
      <button class="weather-widget-settings__add-btn" @click="addNewCity">Add city</button>
    </div>
  </div>
</template>

<script>
import { WeatherService } from '@/Services'
import draggable from 'vuedraggable'
import { nextTick } from 'vue'

export default {
  name: 'WeatherWidgetSettings',
  components: {
    draggable,
  },
  data () {
    this.service = null
    return {
      citiesArr: [],
      newCity: '',
      currentCity: '',
    }
  },
  watch: {
    citiesArr (value) {
      this.service.setCitiesToLocalStorage(value)
      this.checkIfCitiesContainerScrollable()
    },
    currentCity (value) {
      this.$emit('newCitySelected', value)
    }
  },
  created () {
    this.service = new WeatherService()

    this.getCurrentCity()
    this.getCitiesArr()

  },
  methods: {
    getCurrentCity () {
      this.currentCity = localStorage.getItem('currentCity')
    },
    getCitiesArr () {
      this.citiesArr = this.service.getCitiesFromStorage()
    },
    addNewCity () {
      if (!this.newCity) {
        return
      }

      this.service.addCityToLocalStorage(this.newCity)
      this.getCitiesArr()
      this.newCity = ''
    },
    async checkIfCitiesContainerScrollable () {
      // If cities container has scroll bar, add additional styles
      await nextTick()
      const citiesContainer = this.$refs.citiesContainer
      if (citiesContainer.clientHeight < citiesContainer.scrollHeight ) {
        citiesContainer.classList.add('scrollable')
      } else {
        citiesContainer.classList.remove('scrollable')
      }
    },
    setNewSelectedCity (city) {
      this.service.addCurrentCityToLocalStorage(city)
      this.currentCity = city
    },
    closeSettings() {
      this.$emit('closeSettings')
    },
    deleteCity (city) {
      this.service.deleteCityFromLocalStorage(city)
      this.getCitiesArr()
      this.getCurrentCity()
    }
  },
}
</script>

<style lang="scss">
  .weather-widget-settings {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;

      &-close {
        cursor: pointer;
      }
    }

    &__cities {
      margin-top: 20px;
      max-height: 220px;
      overflow: auto;

      &.scrollable {
        padding-right: 20px;
      }

      & .active {
        background-color: #F0EABE;
        box-sizing: border-box;
        color: #2c3e50;
      }

      &-item {
        font-weight: 600;
        background-color: #3B9AE1;
        padding: 10px;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          color: #2c3e50;
          background-color: #F0EABE;
        }

        &:not(:last-of-type) {
          margin-bottom: 10px;
        }
      }
    }

    &__add {
      margin-top: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;

      &-input {
        height: 30px;
        border: none;
        border-radius: 10px;
        width: 100%;
        outline: none;
        padding: 0 10px;
      }

      &-btn {
        height: 30px;
        width: 100%;
        margin-top: 5px;
        background-color: #3B9AE1;
        border: none;
        border-radius: 10px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          background-color: #3120E0;
        }
      }
    }
  }
</style>