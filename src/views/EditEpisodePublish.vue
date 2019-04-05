<template>
  <div class="edit-episode-publish">
    <div class="row">
      <div class="columns small-3">
        <div v-on:click="loadShowImageView()"><h3>[[Back bracket]] Back</h3></div>
      </div>
      <div class="columns small-6">
        <h2>Create Episode for the [[Show]]</h2>
      </div>
      <div class="columns small-3">
        <div v-on:click="loadShowDetailsView()"><h3>[[Cancel X]]</h3></div>
      </div>
    </div>

    <div class="row">
      <div class="columns small-12">
        <div class="row">
          <div class="columns small-6">
            <div>[[Facebook]]</div>
            <div>[[Youtube]]</div>
            <div>[[iHeartRadio]]</div>
          </div>
          <div class="columns small-6">
            <div>[[Twitter]]</div>
            <div>[[iTunes]]</div>
            <div>[[Station Website]]</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="columns small-3">
        <div class="post-button-grey low-drop-shadow right" v-on:click="loadEditEpisodeImageView()">PREVIOUS STEP</div>
      </div>
      <div class="columns small-3">
        <div class="post-button-green low-drop-shadow right" v-on:click="publishEpisode()">PUBLISH</div>
      </div>
      <div class="columns small-3">
        <div class="post-button-green low-drop-shadow right" v-on:click="scheduleEpisode()">SCHEDULE</div>
      </div>
      <div class="columns small-3">
        <div class="post-button-green low-drop-shadow right" v-on:click="saveEpisodeDraft()">SAVE AS DRAFT</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditEpisodePublish',

    components: {
    },

    vuex: {
      actions: {
      },

      getters: {
      },
    },

    computed: {
    },

    methods: {
      loadShowDetailsView() {
        this.$router.go('/show-details');
      },
      loadEditEpisodeImageView() {
        this.$router.go('/edit-episode-image');
      },
      publishEpisode() {
        this.$router.go('/show-details');
      },
      scheduleEpisode() {
        this.$router.go('/show-details');
      },
      saveEpisodeDraft() {
        this.$router.go('/show-details');
      },
    },
    watch: {
    },
  };
</script>

<style lang="scss">
@import "../styles/foundation_settings.scss";
@import "../../node_modules/foundation-sites/scss/foundation.scss";
// @import "../styles/foundation_modules.scss";

@import "../styles/variables.scss";
@import "../styles/global.scss";

div {
  color: $medium-grey;
}
</style>
