<template>
  <div id="app" class="app">
    <CalendarView />
  </div>
</template>

<script lang="js">
import { Component, Vue } from "vue-property-decorator";
import CalendarView from "@/views/CalendarView";
@Component({
  components: {CalendarView}
})
export default class App extends Vue {}
</script>


<style lang="scss">
html,
body {
  width: 100%;
  height: 100vh;
  margin: 0 !important;
  padding: 0;
  -moz-appearance: none !important;
  -webkit-appearance: none;
  overflow-x: hidden;
}

html * {
  box-sizing: content-box;
  font-family: 'Roboto', 'Arial', sans-serif;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
