<template>
  <div class="hero is-fullheight is-primary" v-resize:debounce.250="onResize">
    <the-header></the-header>

    <div class="hero-body">
      <div class="container has-text-centered">
        <transition mode="out-in" :name="transitionDirection">
          <router-view></router-view>
        </transition>
      </div>
    </div>

    <the-footer></the-footer>

    <component :is="$store.state.activePanel"></component>

    <template v-if="$store.state.toolbarsAreVisible">
      <template-toolbar toolbar-type="tools"></template-toolbar>
      <template-toolbar toolbar-type="actions"></template-toolbar>
    </template>
  </div>
</template>

<script>
  import resize from 'vue-resize-directive';

  import TheFooter from './layout/Footer.vue';
  import TheHeader from './layout/Header.vue';
  import LocationPanel from './modules/Location.vue';
  import SnippetsPanel from './modules/Snippets.vue';
  import TemplateToolbar from './modules/Toolbar.vue';

  // these variables will be used later, to calculate the inner maximum height
  let heroWrapper, headerWrapper, footerWrapper;

  export default {
    components: {
      LocationPanel,
      SnippetsPanel,
      TheFooter,
      TheHeader,
      TemplateToolbar
    },

    data () {
      return {
        transitionDirection: 'slide-left'
      }
    },

    directives: {
      resize
    },

    methods: {
      calculateContentHeight () {
        const heroStyle = window.getComputedStyle(heroWrapper, null);
        const headerStyle = window.getComputedStyle(headerWrapper, null);
        const footerStyle = window.getComputedStyle(footerWrapper, null);

        return parseInt(heroStyle.getPropertyValue('height')) - parseInt(headerStyle.getPropertyValue('height')) - parseInt(footerStyle.getPropertyValue('height'));
      },

      onResize () {
        document.querySelector('.hero-body .container').setAttribute('style', `max-height: ${this.calculateContentHeight()}px`);
      }
    },

    mounted () {
      heroWrapper = document.querySelector('.hero');
      headerWrapper = document.querySelector('.hero-head');
      footerWrapper = document.querySelector('.hero-foot');

      this.$nextTick(() => { this.onResize(); });
    },

    watch: {
      '$route' (to, from) {
        // close panels and toolbars on route change
        this.$store.dispatch('closeActivePanel', this);
        this.$store.dispatch('hideToolbars', this);

        // the following conditionals allow from sliding the routes left-to-right or right-to-left, depending on current and next route
        if (from.name == 'home' || to.name == 'list') {
          this.transitionDirection = 'slide-left';
        }

        if (from.name == 'list' || to.name == 'home') {
          this.transitionDirection = 'slide-right';
        }
      }
    }
  }
</script>
