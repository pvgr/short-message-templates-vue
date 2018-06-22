import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import expect from 'expect';

const localVue = createLocalVue();
localVue.use(Vuex);

import * as getters from '../vue/store/getters';
import * as mutations from '../vue/store/mutations';

const store = new Vuex.Store({
  state: {
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
    ]
  },

  getters,
  mutations
});

import List from '../vue/components/views/List.vue';

describe('List', () => {
  const wrapper = shallowMount(List, {
    localVue,
    store,
    attachToDocument: true
  });

  it('is a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('renders two items based on test state', () => {
    expect(wrapper.findAll('.templates-list li').length).toBe(2);
  });

  it('deletes the first template', () => {
    // I don’t have an effing clue how to test the action that renders a Buefy confirm dialog
    // importing it in the test didn’t help
    // just call the mutation directly and be done with it!

    store.commit('deleteTemplate', store.getters.templates[0].key);
    expect(wrapper.findAll('.templates-list li').length).toBe(1);
  });
});
