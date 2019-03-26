<template>
  <div class="ProjectInfo">
    <p><b>Project info:</b></p>
    <p>Name: {{ name }}</p>
    <p>Resources name: {{ nameKebabCase }}</p>
    <p>URL of the video: {{ videoUrl }}</p>
  </div>
</template>

<script>
export default {
  name: "ProjectInfo",
  props: {
    name: String,
    nameKebabCase: String,
    videoUrl: String
  }
}
</script>

<style scoped>
</style>