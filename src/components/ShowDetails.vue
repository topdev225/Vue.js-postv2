<template>
  <div class="show-details">
    <div class="row">
        <div class="show-details__show-image small-3">
          <h1 class="subheading__title_text">Add Show</h1>
        </div>
        <div class="show-details__show-text-details small-9">
          <div class="subheading__new-show_button post-button-green low-drop-shadow right" onclick="window.location.href='/addShow">+ New Show</div>
        </div>
    </div>
    <div class="row">
      <!-- ToDo: Vue repeat & connect to back end data -->
    <div class="row">
        <div class="show-details__show-image small-3">
          <h1 class="subheading__title_text">Add Show</h1>
        </div>
        <div class="show-details__show-text-details small-9">
          <div class="subheading__new-show_button post-button-green low-drop-shadow right" onclick="window.location.href='/addShow">+ New Show</div>
        </div>
    </div>
    <div class="row">
      <div class="showlist__container small-12">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowDetails',

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