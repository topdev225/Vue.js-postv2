<template>
  <div class="edit-episode-information">

    <div class="row">
      <div class="columns small-3">
        <div v-on:click="loadEditEpisodeAudioView()"><h3>[[Back bracket]] Back</h3></div>
      </div>
      <div class="columns small-6">
        <h2>Create Episode for the [[Show]]</h2>
      </div>
      <div class="columns small-3">
        <div v-on:click="loadShowDetailsView()"><h3>[[Cancel X]]</h3></div>
      </div>
    </div>

    <div class="row">
      <div class="ten-percent">[[Audio image]]</div>
      <div class="twenty-percent">[[Horizontal line]]</div>
      <div class="ten-percent">[[Information image]]</div>
      <div class="twenty-percent">[[Horizontal line]]</div>
      <div class="ten-percent">[[Image image]]</div>
      <div class="twenty-percent">[[Horizontal line]]</div>
      <div class="ten-percent">[[Publish image]]</div>
    </div>

    <div class="row">
      <div class="columns small-12">

        <div class="row">
          <div class="columns small=6">
            <p>Title</p>
            <p>Tags</p>
          </div>
          <div class="columns small=6">
            <p>Description</p>
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="columns small-6">
        <div class="post-button-grey low-drop-shadow right" v-on:click="loadEditEpisodeAudioView()">PREVIOUS STEP</div>
      </div>
      <div class="columns small-6">
        <div class="post-button-green low-drop-shadow right" v-on:click="loadEditEpisodeImageView()">NEXT STEP</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditEpisodeInformation',

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
      loadEditEpisodeAudioView() {
        this.$router.go('/edit-episode-audio');
      },
      loadEditEpisodeImageView() {
        this.$router.go('/edit-episode-image');
      },
      loadShowDetailsView() {
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
@import "../styles/foundation_modules.scss";

@import "../styles/variables.scss";
@import "../styles/global.scss";

</style>
