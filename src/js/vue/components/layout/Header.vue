<template>
  <div class="hero-head is-transparent">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-start">
          <div class="navbar-item">
            <h1>
              <svg class="icon"><use xlink:href="#icon-message"></use></svg>
              Short Message Templates with Vue.js
            </h1>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <the-locale></the-locale>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import TheLocale from '../modules/Locale.vue';

  export default {
    components: {
      TheLocale
    }
  }
</script>
