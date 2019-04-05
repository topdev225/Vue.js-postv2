<template>
  <div class="edit-episode-image">
    <div class="row">
      <div class="columns small-3">
        <div v-on:click="loadShowInformationView()"><h3>[[Back bracket]] Back</h3></div>
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
      <div class="forty-five-percent">[[Apple Podcast Image]]</div>
      <div class="ten-percent">[[OR]]</div>

      <div class="forty-five-percent">
        <h3>[[Upload Image File]]</h3>
        [[Square Button (non-working)]]
      </div>
    </div>
    <div class="row">
      <div class="columns small-6">
        <div class="post-button-grey low-drop-shadow right" v-on:click="loadEditEpisodeInformationView()">PREVIOUS STEP</div>
      </div>
      <div class="columns small-6">
        <div class="post-button-green low-drop-shadow right" v-on:click="loadEditEpisodePublishView()">NEXT STEP</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditEpisodeImage',

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
      loadEditEpisodeInformationView() {
        this.$router.go('/edit-episode-information');
      },
      loadEditEpisodePublishView() {
        this.$router.go('/edit-episode-publish');
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
// @import "../styles/foundation_modules.scss";

@import "../styles/variables.scss";
// @import "../styles/global.scss";

@font-face {
  font-family: 'poppinssemibold';
  src: url('../assets/fonts/poppins/poppins-semibold-webfont.woff2') format('woff2'),
  url('../assets/fonts/poppins/poppins-semibold-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

div.analytics {
  color: $dark-grey;

}
</style>
