<template>
  <div>
    <div v-if="!videoUrl">
      <button @click="createProject">Create a new project</button>
      <button @click="loadProject">Continue an existing project</button>
    </div>
    <div v-show="videoUrl">
      <ProjectInfo :name="name" :nameKebabCase="nameKebabCase" :videoUrl="videoUrl" />
      <CuesEditor v-if="videoUrl" :cues="cues" class=".WikiSub-cues-editor"
        :addCue="addCue" :removeCue="removeCue" :trackUpdate="trackUpdate"
        :saveChanges="saveChanges"
      />
      <video ref="video" width="40%" class="WikiSub-video" controls>
        <source v-if="videoUrl" :src="videoUrl" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
    <h3 class="WikiSub-display">{{display}}</h3>
  </div>
</template>

<script>
import CuesEditor from "./CuesEditor.vue";
import ProjectInfo from "./ProjectInfo.vue";
import { id, toCreateToUpdate } from "../utils";
import { API_URL } from "../constants.js";
import axios from "axios";

//Dummy video URL:
//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
export default {
  name: "WikiSub",
  components: {
    CuesEditor,
    ProjectInfo
  },
  data() {
    return {
      video: null,
      videoUrl: null,
      track: null,
      cues: null,
      name: null,
      nameKebabCase: null,
      toDelete: [],
      display: null
    };
  },
  mounted() {
    this.video = this.$refs.video;
  },
  methods: {
    addCue() {
      let i = this.cues.length;
      let cue = new VTTCue(i, i+1, "Caption "+i);
      cue.ref = id();
      cue.toCreate = true;
      cue.toUpdate = false;
      this.track.addCue(cue);
      this.display = "Cue added.";
    },
    removeCue(cue) {
      if (!cue.toCreate)
        this.toDelete.push(cue.ref);
      this.track.removeCue(cue);
      this.display = "Cue removed.";
    },
    trackUpdate(cue) {
      if (!cue.toCreate)
        cue.toUpdate = true;
    },
    initProject() {
      this.track = this.video.addTextTrack("captions");
      this.track.mode = "showing";
      this.cues = this.track.cues;
    },
    async createProject() {
      try {
        const name = prompt("Give a name to the new project:");
        const videoUrl = prompt("Give the URL of the video:");
        const { data } = await axios.post(API_URL+"/tracks", {
          name: name,
          videoUrl: videoUrl
        });
        this.videoUrl = data.track.videoUrl;
        this.name = data.track.name;
        this.nameKebabCase = data.track.nameKebabCase;
        this.initProject();
        this.display = "Project loaded.";
      } catch (e) {
        alert("Error while creating a new project: "+e.message);
      }
    },
    async loadProject() {
      try {
        const nameKebabCase = prompt("Give the project URL:\n"+
          API_URL+"/tracks/");
        const { data } = await axios.get(`${API_URL}/tracks/${nameKebabCase}/cues`);
        this.videoUrl = data.track.videoUrl;
        this.name = data.track.name;
        this.nameKebabCase = data.track.nameKebabCase;
        this.initProject();
        data.track.cues.forEach(({text, startTime, endTime, ref}) => {
          let cue = new VTTCue(startTime, endTime, text);
          cue.ref = ref;
          cue.toCreate = false;
          cue.toUpdate = false;
          this.track.addCue(cue);
        });
        this.display = "Project loaded.";
      } catch (e) {
        console.log(e);
        this.display = "Error while loading the project: "+e.message;
      }
    },
    async saveChanges() {
      try {
        const [ toCreate, toUpdate ] = toCreateToUpdate(this.cues);
        const { data } = await axios.put(`${API_URL}/tracks/${this.nameKebabCase}/cues`, {
          toCreate: toCreate,
          toUpdate: toUpdate,
          toDelete: this.toDelete
        });
        const { created, updated, deleted } = data;
        this.display = `Created: ${created}, Updated: ${updated}, Deleted: ${deleted}`;
      } catch (e) {
        this.display = "Error while updating the track: "+e.message;
      }
    }
  }
}
</script>

<style scoped>
.WikiSub-cues-editor {
  float: left;
  margin: 2%;
}

.WikiSub-video {
  float: right;
}

.WikiSub-display {
  text-align: center;
}
</style>