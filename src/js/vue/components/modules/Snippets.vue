<template>
  <div class="panel-container">
    <div class="container">
      <transition name="slide">
        <p class="notification" :class="message.className" v-if="message.text">{{ message.text }}</p>
      </transition>

      <div class="panel">
        <div class="panel-heading">
          <p>Add a snippet</p>
        </div>

        <div class="panel-block">
          <p class="field is-grouped">
            <span class="control is-expanded">
              <input ref="newSnippet" id="new-snippet" class="input" type="text">
            </span>
            <span class="control">
              <button id="add-snippet" class="button is-link" type="Button" @click="onAddSnippet">Add this in the list</button>
            </span>
          </p>
        </div>

        <div class="panel-block">
          <p class="field is-grouped">
            <label class="label control">or select</label>
            <span class="control is-expanded">
              <multiselect
                class="select-snippet"
                ref="selectSnippet"
                v-model="value"
                :options="options"
                :allow-empty="false"
                :searchable="false"
                :showLabels="false"
                :show-no-results="false"
              ></multiselect>
            </span>
          </p>
        </div>

        <div class="panel-block">
          <div class="field is-grouped is-grouped-centered">
            <button class="control button" type="button" @click="onCancelSnippet">Forget it</button>
            <button class="control button is-primary" type="button" @click="onAcceptSnippet">Add it!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  export default {
    components: { Multiselect },

    data () {
      return {
        isLoading: false,
        options: this.$store.getters.snippets,
        message: {
          className: 'is-primary',
          text: ''
        },
        value: ''
      }
    },

    methods: {
      onAddSnippet () {
        // no real validation is done on the entered text, but it is not really needed
        const newSnippetText = this.$refs.newSnippet.value.trim();

        if (newSnippetText) {
          this.$store.commit('addSnippet', newSnippetText);

          this.$nextTick(() => {
            this.$refs.selectSnippet.select(newSnippetText);
          });
        }
      },

      onCancelSnippet () {
        this.$store.dispatch('closeActivePanel', this);
      },

      onAcceptSnippet () {
        this.$store.dispatch('copySnippetText', [this.value, this]);

        this.$store.dispatch('closeActivePanel', this);
      }
    }
  }
</script>
