import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

/* The APIs.js file should hold the Google Geocode API
 * This file is .gitignored
 * You should obtain your own key and make APIs.js a file like:
 *
 * export const keys = {
 *   geocodingApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
 * }
 *
 * or just enter your key string in state object below
 */
import { keys } from './APIs';

import * as actions from './actions';
import * as mutations from './mutations';

export const store = new Vuex.Store({
  state: {
    activePanel: '',
    currentlyEditing: undefined,
    locale: {
      code: 'en',
      label: 'English'
    },
    location: {
      coords: {
        lat: 37.9838096,
        lng: 23.7275388
      },
      text: 'Athens, Greece'
    },
    geocodingApiKey: keys.geocodingApiKey,
    snippets: [],
    templates: [
      {
        key: '1527241182310',
        title: 'Title 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span class="template-snippet is_location">Vestibulum aliquet iaculis</span> orci a scelerisque. Nunc sapien neque, pretium sed nisl eu, dapibus finibus metus. <span class="template-snippet is_snippet">Morbi maximus nisl sit amet libero feugiat</span>, ut accumsan est maximus. Duis maximus magna et porta porta.'
      },
      {
        key: '1527241307201',
        title: 'Title 2',
        text: 'Fusce at augue eget neque lobortis tincidunt nec sit amet enim. Praesent blandit nisl odio, <span class="template-snippet is_snippet">hendrerit commodo felis vulputate nec</span>. In luctus ultricies massa, ac posuere nibh maximus sed.'
      }
    ],
    toolbarsAreVisible: false
  },

  actions,
  mutations,

  plugins: [createPersistedState({ paths: ['locale', 'location', 'templates'] })]
});
