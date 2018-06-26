<template>
  <div class="template-wrapper" :data-key="new Date().getTime()">
    <h1 class="title is-size-3 template-title">New Message</h1>
    <div class="editor-wrapper" v-resize:debounce.150="onResize">
      <template-editor :templateText="''" @templateOnClick="onClick($event)"></template-editor>
    </div>
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
      onClick (e) {
        const el = e.target;

        el.classList.add('is_editing');
        el.setAttribute('contentEditable', 'true');
        document.execCommand('defaultParagraphSeparator', false, 'p');
        this.$store.dispatch('showToolbars', el);
      },

      onResize () {
        // the toolbars need to recalculate their positions!
        EventBus.$emit('recalculateToolbarPosition');
      }
    }
  }
</script>
