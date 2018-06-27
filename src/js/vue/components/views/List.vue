<template>
  <div class="templates-list-wrapper">
    <h1 class="title is-size-3">Templates</h1>

    <ul class="templates-list">
      <li class="template-wrapper" v-for="template in $store.getters.templates" v-bind:key="template.key" :data-key="template.key">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title template-title">{{ template.title }}</p>
          </div>

          <div class="card-content">
            <div class="editor-wrapper" v-resize:debounce.150="onResize">
              <template-editor :templateText="template.text"></template-editor>
            </div>
          </div>

          <div class="card-footer">
            <span class="card-footer-item">
              <button class="button is-danger" type="button" @click="onDelete(template.key)"><svg class="icon"><use xlink:href="#icon-trash"></use></svg> Delete</button>
            </span>

            <span class="card-footer-item">
              <button class="button is-link" type="button" @click="onEdit($event)"><svg class="icon"><use xlink:href="#icon-edit"></use></svg> Edit</button>
            </span>

            <span class="card-footer-item">
              <button class="button is-primary" type="button" disabled @click="onSend(template.key)"><svg class="icon"><use xlink:href="#icon-send"></use></svg> Send</button>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { EventBus } from '../../helpers/event-bus';
  import resize from 'vue-resize-directive';

  import Editor from '../modules/Editor.vue';

  export default {
    components: {
      templateEditor: Editor
    },

    directives: {
      resize
    },

    methods: {
      cleanupStage (el) {
        // if an Edit button is pressed while there is another template in edit ”state”, we must deactivate it and hide the toolbars, before enabling the new one
        if (this.$store.getters.currentlyEditing && this.$store.getters.currentlyEditing != el) {
          this.$store.commit('resetToolbars');
        }

        // the same with the panels
        if (this.$store.getters.activePanel) {
          this.$store.commit('resetActivePanel');
        }
      },

      onDelete (key) {
        // the key is used to remove the selected template from the state
        this.$store.dispatch('confirmDelete', [key, this]);

        this.cleanupStage();
      },

      onEdit (event) {
        // find the body text of the selected template
        const el = event.target.closest('.card').querySelector('.template-body');

        // backup the current text to maybe restore it later, on cancel edit
        el.backup = el.innerHTML;

        // close toolbars and panels
        this.cleanupStage(el);

        // wait for next “tick”
        setTimeout(() => {
          el.setAttribute('contentEditable', 'true');
          el.focus();
          document.execCommand('defaultParagraphSeparator', false, 'p');
          this.$store.dispatch('showToolbars', el);
        }, 0);
      },

      onSend (key) {
        // the Send button is actually disabled!
        console.log('send:', key); /* eslint-disable-line */
      },

      onResize () {
        // the toolbars need to recalculate their positions!
        EventBus.$emit('recalculateToolbarPosition');
      }
    }
  }
</script>
