import Vue from 'vue';
import App from './App.vue';
import store from "./store";

// @ts-ignore
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
