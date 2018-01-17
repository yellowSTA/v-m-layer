<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-link :to="{name:'alert'}">alert</router-link> -->

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import 'assets/css/layer.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
