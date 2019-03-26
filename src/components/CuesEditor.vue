<template>
  <div class="CuesEditor">
    <button @click="addCueAndUpdate">Add cue</button>
    <button @click="saveChanges">Save changes</button>
    <div class="CuesEditor-list">
      <div v-for="cue in cues" :key="cue.id">
        <CuePanel :cue="cue" :removeCue="removeCueAndUpdate"
          :trackUpdate="trackUpdate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CuePanel from "./CuePanel.vue";

export default {
  name: "CuesEditor",
  components: {
    CuePanel,
  },
  props: {
    cues: TextTrackCueList,
    addCue: Function,
    removeCue: Function,
    trackUpdate: Function,
    saveChanges: Function
  },
  methods: {
    addCueAndUpdate() {
      /**
       * Vue doesn't re-render if we don't use one of the array
       * mutation methods (push, pop, ...), but these methods are
       * not available on TextTrackCueList. Hence, we have to force
       * the re-rendering when we add or when we delete a cue.
       */
      this.addCue();
      this.$forceUpdate();
    },
    removeCueAndUpdate(cue) {
      this.removeCue(cue);
      this.$forceUpdate();
    }
  }
}
</script>

<style scoped>
.CuesEditor {
  display: inline-block;
}

.CuesEditor-list {
  overflow-y: auto;
  max-height: 70vh;
  background-color: gainsboro;
}
</style>