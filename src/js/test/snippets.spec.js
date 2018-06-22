import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import * as getters from '../vue/store/getters';

const store = new Vuex.Store({
  state: {
    snippets: [
      'First snippet',
      'Second snippet'
    ]
  },

  getters
});

import Snippets from '../vue/components/modules/Snippets.vue';
import Multiselect from 'vue-multiselect';

describe('Snippets', () => {
  const wrapper = mount(Snippets, {
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

  it('feeds Vue Multiselect with two options, select none', () => {
    expect(wrapper.findAll('.multiselect__element').length).toBe(2);

    expect(wrapper.find('.multiselect__single').text()).toBe('Select option');
  });

  it('selects the second snippet in Vue Multiselect', () => {
    wrapper.find(Multiselect).vm.select('Second snippet');

    expect(wrapper.vm.value).toBe('Second snippet');
  });

  it('ignores an empty new snippet', () => {
    wrapper.vm.value = 'should not change';

    const txt = wrapper.find('#new-snippet');
    const btn = wrapper.find('#add-snippet');

    txt.value = '';
    btn.trigger('click');
    expect(wrapper.vm.value).toBe('should not change');

    txt.value = ' ';
    btn.trigger('click');
    expect(wrapper.vm.value).toBe('should not change');
  });

  it('adds a third option in Vue Multiselect', () => {
    wrapper.vm.options.push('Third option');

    expect(wrapper.findAll('.multiselect__element').length).toBe(3);
  });

  it('and selects it!', () => {
    wrapper.find(Multiselect).vm.select('Third option');

    expect(wrapper.vm.value).toBe('Third option');
  });
});
