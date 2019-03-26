<template>
  <div class="CuePanel">
    <div class="CuePanel-time-wrapper">
      <input v-model="cue.startTime" class="CuePanel-time-label"
        type="number" step="0.01" min="0" @change="trackUpdate(cue)"
      />
      <br />
      <!-- Start time and end time cannot be equal, hence the +0.01 -->
      <input v-model="cue.endTime" class="CuePanel-time-label" style="margin-top: 5px;"
        type="number" step="0.01" :min="cue.startTime+0.01" @change="trackUpdate(cue)"
      />
    </div>
    <textarea class="CuePanel-text" v-model="cue.text" rows="4" @change="trackUpdate(cue)"></textarea>
    <button @click="removeCue(cue)">X</button>
  </div>
</template>

<script>
export default {
  name: "CuePanel",
  props: {
    cue: VTTCue,
    removeCue: Function,
    trackUpdate: Function
  }
}
</script>

<style scoped>
.CuePanel {
  background-color: grey;
  margin: 5px;
  padding: 5px;
  display: inline-block;
}

.CuePanel-time-wrapper {
  float: left;
  margin-right: 10px;
}

.CuePanel-time-label {
  width: 80px;
}

.CuePanel-text {
  resize: none;
}
</style>