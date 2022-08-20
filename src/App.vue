<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script>
import Vue from 'vue';
import WeatherWidget from './components/WeatherWidget'

export default Vue.extend({
  name: 'App',
  components: {
    WeatherWidget
  }
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
