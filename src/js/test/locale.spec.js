import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    locale: {
      code: 'en',
      label: 'English'
    }
  }
});

import Locale from '../vue/components/modules/Locale.vue';
import Multiselect from 'vue-multiselect';

describe('Locale', () => {
  const wrapper = mount(Locale, {
    localVue,
    store,
    attachToDocument: true
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('initializes the Vue Multiselect component', () => {
    expect(wrapper.contains(Multiselect)).toBe(true);
  });
});
