<template>
  <div class="shows">
    <div class="row">
        <div class="subheading__title small-6">
          <h1 class="subheading__title_text">Shows</h1>
        </div>
        <div class="subheading__new-show small-6">
          <div class="subheading__new-show_button post-button-green low-drop-shadow right" v-on:click="loadShowDetailsView()">+ New Show</div>
        </div>
    </div>
    <div class="row">
      <!-- ToDo: Vue repeat & connect to back end data -->

      <div class="showlist__container small-12">
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
                    <div class="showlist__container_show_add-episode-container">
                      <div class="showlist__container_show_add-episode-container_button post-button-white">+ Add New Episode</div>
                    </div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
        <div class="showlist__container_show columns small-3">
          <img class="high-drop-shadow" src="https://via.placeholder.com/300">
          <div class="showlist__container_show_title">This show title</div>
          <div class="showlist__container_show_latest-modification">Last modified recently</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Shows',

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
        // this.$router.go(`/show-details${location.search}`);
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

body {
  font-family: 'poppinssemibold';

  div.shows.view.wrapper.app-transition {
    color: $medium-grey;
    font-family: 'poppinssemibold';

    div.row {

      div.subheading__title {

        h1.subheading__title_text {
          font-family: 'poppinssemibold';
        }

      }
      div.subheading__new-show {

        div.subheading__new-show_button {
          float: right;
        }
      }

      div.showlist__container {
        padding-top: 1em;

        div.showlist__container_show {
          border-radius: 2px;
          -moz-border-radius: 2px;
          -webkit-border-radius: 2px;
          margin-bottom: 1em;
          padding-bottom: 1em;
          padding-top: 2em;
          position: relative;

          div.showlist__container_show_add-episode-container {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            // visibility: hidden;
            width: 100%;

            div.showlist__container_show_add-episode-container_button {
              left: 10%;
              position: absolute;
              top: 65%;
              width: 80%;
            }
          }

          div.showlist__container_show_add-episode-container:hover {
            // visibility: visible;
          }
        }

        div.showlist__container_show:hover {
          -webkit-box-shadow: 0px 0px 2px 1px rgba(201,219,52,0.5);
          -moz-box-shadow: 0px 0px 2px 1px rgba(201,219,52,0.5);
          box-shadow: 0px 0px 2px 1px rgba(201,219,52,0.5);
        }
      }
    }
  }
}
</style>
