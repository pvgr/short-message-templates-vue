import Vue from 'vue';

import VueRouter from 'vue-router';
import { routes } from './helpers/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
});

import App from './components/App.vue';

import { store } from './store/store';

import { Dialog } from 'buefy';
Vue.prototype.$dialog = Dialog;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
