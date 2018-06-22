import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import * as actions from '../vue/store/actions';
import * as getters from '../vue/store/getters';
import * as mutations from '../vue/store/mutations';

const store = new Vuex.Store({
  state: {
    templates: [
      {
        key: '1527241182310',
        title: 'Title 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <span class="template-snippet is_location">Vestibulum aliquet iaculis</span> orci a scelerisque. Nunc sapien neque, pretium sed nisl eu, dapibus finibus metus. <span class="template-snippet is_snippet">Morbi maximus nisl sit amet libero feugiat</span>, ut accumsan est maximus. Duis maximus magna et porta porta.'
      }
    ]
  },

  actions,
  getters,
  mutations
});

import Toolbar from '../vue/components/modules/Toolbar.vue';

describe('Toolbar', () => {
  // the Toolbar component relies on a specific DOM element, and the pointer to it in the state…
  // I don’t believe i can mock it
  // TODO: further indestigation

  /*
  const wrapper = shallowMount(Toolbar, {
    localVue,
    store,
    attachToDocument: true
  });

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
  */
});
