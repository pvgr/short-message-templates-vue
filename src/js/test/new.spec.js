import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import * as actions from '../vue/store/actions';
import * as mutations from '../vue/store/mutations';

const store = new Vuex.Store({
  state: {
    currentlyEditing: undefined
  },

  actions,
  mutations
});

import NewTemplate from '../vue/components/views/New.vue';

describe('NewTemplate', () => {
  const wrapper = shallowMount(NewTemplate, {
    localVue,
    store,
    attachToDocument: true
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
