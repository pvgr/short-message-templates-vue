<template>
  <div class="toolbar-container" :class="toolbarType == 'actions' ? 'toolbar-actions' : 'toolbar-tools'">
    <div class="field is-grouped" v-if="toolbarType == 'actions'">
      <span class="control"><button class="button is-small" @click="cancelEdit"><svg class="icon"><use xlink:href="#icon-cancel"></use></svg></button></span>
      <span class="control"><button class="button is-small is-primary" @click="completeEdit($event)"><svg class="icon"><use xlink:href="#icon-save"></use></svg></button></span>
    </div>
    <div class="field is-grouped" v-else>
      <span class="control"><button class="button is-small" @click="addLocation"><svg class="icon"><use xlink:href="#icon-pin"></use></svg></button></span>
      <span class="control"><button class="button is-small" @click="addSnippet"><svg class="icon"><use xlink:href="#icon-snippet"></use></svg></button></span>
    </div>
  </div>
</template>

<script>
  let tpl;

  import { EventBus } from '../../helpers/event-bus';

  export default {
    methods: {
      addLocation () {
        this.$store.dispatch('openLocationPanel', this);
      },

      addSnippet () {
        this.$store.dispatch('openSnippetsPanel', this);
      },

      cancelEdit () {
        this.$store.state.currentlyEditing.removeAttribute('contentEditable');
        this.$store.state.currentlyEditing.classList.remove('is_editing');
        this.$store.dispatch('closeActivePanel', this);
        this.$store.dispatch('hideToolbars', this);
      },

      completeEdit () {
        this.$store.dispatch('confirmSave', this);
      },

      calculatePosition () {
        const tplStyle = window.getComputedStyle(tpl, null);
        const tplDimensions = this.getMessageDimensions(tplStyle);
        const tplPosition = this.getMessagePosition(tpl);

        this.$el.style = this.$props.toolbarType == 'actions' ?
          `top: ${10 + tplPosition.y + tplDimensions.height}px; left: ${tplPosition.x + parseInt(tplDimensions.width / 2)}px` :
          `top: ${tplPosition.y - 10}px; left: ${tplPosition.x + parseInt(tplDimensions.width / 2)}px`;
      },

      getMessageDimensions (style) {
        return {
          width: parseInt(style.width),
          height: parseInt(style.height)
        };
      },

      getMessagePosition (el) {
        const rect = el.getBoundingClientRect();
        return {
          x: parseInt(rect.left),
          y: parseInt(rect.top)
        };
      }
    },

    mounted () {
      // the positioning (and entering animation) of the toolbar is calculated here,
      // in relation to the template that is currently edited — it is the “safest” time to do those calculations
      // I have tried in Vuex actions, and List component too but I decided to put them here
      tpl = this.$store.state.currentlyEditing;

      this.calculatePosition();

      this.$el.classList.add('is_visible');

      // the toolbars need to recalculate their positions from time to time!
      EventBus.$on('recalculateToolbarPosition', () => {
        this.calculatePosition();
      });
    },

    props: ['toolbarType']
  }
</script>
