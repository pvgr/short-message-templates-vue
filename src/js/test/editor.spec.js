import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import Editor from '../vue/components/modules/Editor.vue';

describe('Editor', () => {
  const wrapper = shallowMount(Editor, {
    localVue,
    attachToDocument: true
  });

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('it emits the click event', () => {
    wrapper.find('.editor').trigger('click');

    expect(wrapper.emitted('templateOnClick')).toBeTruthy();
  });
});
