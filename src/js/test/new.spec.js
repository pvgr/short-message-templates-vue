import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import NewTemplate from '../vue/components/views/New.vue';

describe('NewTemplate', () => {
  const wrapper = shallowMount(NewTemplate, {
    localVue,
    attachToDocument: true
  });

  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
