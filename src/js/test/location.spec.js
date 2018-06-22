import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';
import moxios from 'moxios';

const localVue = createLocalVue();
localVue.use(Vuex);

import { keys } from '../vue/store/APIs';
import * as actions from '../vue/store/actions';
import * as getters from '../vue/store/getters';
import * as mutations from '../vue/store/mutations';

const store = new Vuex.Store({
  state: {
    lang: 'el',
    location: {
      coords: {
        lat: 37.9838096,
        lng: 23.7275388
      },
      text: 'Athens, Greece'
    },
    geocodingApiKey: keys.geocodingApiKey
  },

  actions,
  getters,
  mutations
});

import Location from '../vue/components/modules/Location.vue';
import Multiselect from 'vue-multiselect';

describe('Location', () => {
  let wrapper;

  beforeEach(() => {
    moxios.install();

    wrapper = mount(Location, {
      localVue,
      store,
      attachToDocument: true
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('initializes the Vue Multiselect component', () => {
    expect(wrapper.contains(Multiselect)).toBe(true);
  });

  it('feeds the default location to multiselect', () => {
    expect(wrapper.find('.multiselect__single').text()).toBe(store.state.location.text);
  });

  it('gets location suggestions from the API and updates the component options', (done) => {
    wrapper.vm.onSearch('SEARCH QUERY', () => {});

    moxios.stubRequest(/.?address/g, {
      response: {
        results: [
          {
            "formatted_address" : "Athens, Greece",
            "geometry" : {
              "location" : {
                "lat" : 38.0175327,
                "lng" : 23.7395081
              }
            }
          }
        ]
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.options[0].label).toBe('Athens, Greece');
      done();
    }, 600) // the _fetchLocationSuggestion Vuex action that fetches suggestion is debounced!
  });

  it('handles location suggestions API error', (done) => {
    wrapper.vm.onSearch('SEARCH QUERY', () => {});

    moxios.stubRequest(/.?address/g, {
      response: {
        results: [
          {
            "formatted_address" : "Athens, Greece"
          }
        ]
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.message.className).toBe('is-warning');
      done();
    }, 600) // the _fetchLocationSuggestion Vuex action that fetches suggestion is debounced!
  });

  it('gets a “friendly” name for the selected coords', (done) => {
    wrapper.vm.geoSuccess({
      coords: {
        latitude: 38.0175327,
        longitude: 23.7395081
      }
    });

    moxios.stubRequest(/.?latlng/g, {
      response: {
        results: [
          {
            "formatted_address" : "Athens, Greece"
          }
        ]
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.$store.getters.location.text).toBe('Athens, Greece');
      done();
    })
  });

  it('handles errors when trying to fetch a “friendly” name for the selected coords', (done) => {
    const pos = {
      coords: {
        latitude: -37.9838096,
        longitude: 23.7395081
      }
    };

    wrapper.vm.geoSuccess(pos);

    moxios.stubRequest(/.?latlng/g, {
      response: {
        results: []
      }
    });

    moxios.wait(() => {
      expect(wrapper.vm.message.className).toBe('is-danger');
      done();
    })
  });
});
