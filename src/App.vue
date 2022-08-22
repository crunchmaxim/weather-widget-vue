<template>
  <div id="app">
    <WeatherWidget :apiKey="apikey" />
  </div>
</template>

<script>
import Vue from 'vue';
import WeatherWidget from './components/WeatherWidget'

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
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
