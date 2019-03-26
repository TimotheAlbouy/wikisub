<template>
  <div id="app">
    <WikiSub />
  </div>
</template>

<script>
import WikiSub from './components/WikiSub.vue'

export default {
  name: 'app',
  components: {
    WikiSub
  },
  data: {
    jwt: null
  }
}
</script>

<style>
</style>
