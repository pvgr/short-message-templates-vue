<template>
  <div class="hero-foot">
    <div class="container">
      <div class="tabs is-toggle is-fullwidth">
        <ul>
          <router-link exact tag="li" to="/"><a><svg class="icon"><use xlink:href="#icon-home"></use></svg><span>Introduction</span></a></router-link>
          <router-link tag="li" to="/new"><a><svg class="icon"><use xlink:href="#icon-new"></use></svg><span>New SMS</span></a></router-link>
          <router-link tag="li" to="/list"><a><svg class="icon"><use xlink:href="#icon-list"></use></svg><span>Templates</span></a></router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
