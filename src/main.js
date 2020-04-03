import Vue from 'vue';
import app from './App.vue'
import store from "./store";

new Vue({
  el: "#app-root",
  store,
  render: h => h(app)
});