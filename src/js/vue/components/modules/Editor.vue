<template>
  <div class="editor template-body" v-html="templateText" @click="$emit('templateOnClick', $event)"></div>
</template>

<script>
  export default {
    props: ['templateText']
  }
</script>
