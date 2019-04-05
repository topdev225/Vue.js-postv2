<template>
  <div class="edit-episode-audio">
    <div class="row">
      <div class="columns small-3">
        <div v-on:click="loadShowDetailsView()"><h3>[[Back bracket]] Back</h3></div>
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
      <div class="forty-five-percent">[[Audio Upload]]</div>
      <div class="ten-percent">[[OR]]</div>

      <div class="forty-five-percent">
        <h3>[[Build Audio File]]</h3>
        [[Square Button (non-working)]]
      </div>
    </div>
    <div class="row">
      <div class="post-button-green low-drop-shadow right" v-on:click="loadEditEpisodeInformationView()">NEXT STEP</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditEpisodeAudio',

    components: {
    },
    vuex: {
      actions: {
      },

      getters: {
      },
    },
    methods: {
      loadEditEpisodeInformationView() {
        this.$router.go('/edit-episode-information');
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
