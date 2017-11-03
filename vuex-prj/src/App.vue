<template>
  <div id="app">
    <display></display>
    <increment></increment>
  </div>
</template>

<script>
import display from "./components/display.vue";
import increment from "./components/increment.vue"

export default {
  data () {
    return {

    }
  },
  components: {
    display,
    increment
  }
}
</script>

<style>
  #app {
    text-align: center;
  }
</style>