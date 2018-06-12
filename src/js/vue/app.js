import Vue from 'vue';
import VueRouter from 'vue-router';
import { Dialog } from 'buefy';

import App from './components/App.vue';

import { routes } from './helpers/routes';
import { store } from './store/store';

Vue.prototype.$dialog = Dialog;
Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
