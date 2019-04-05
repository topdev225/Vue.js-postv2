<template>
  <div class="show-details">

    <div class="row">

      <div class="show-details__show-image columns small-3">
        <h1 class="subheading__title_text">Show Image</h1>
      </div>

      <div class="show-details__show-text columns small-9">

        <div class="row">
          <div class="columns small-12">
            <h2 class="show-details__show-text-details-title">Show name</h2>
            <input name="title" type="text"/>
            <h3>Show details</h3>
            <input name="description" type="text" placeholder="Add a description"/>
          </div>
        </div>

        <div class="row">
          <div class="columns small-7"></div>
          <div class="columns small-2">
            <div class="small-post-button-grey low-drop-shadow" v-on:click="loadShowsView()">Cancel</div>
          </div>
          <div class="columns small-2">
            <div class="small-post-button-green low-drop-shadow" v-on:click="saveShowDetails()">Save</div>
          </div>
          <div class="columns small-1"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="columns small-12">
      <p>New Show Block</p>
    </div>
  </div>

  <div class="row">
    <div class="columns small-12">
      <p>Existing Show Block</p>
      <div class="row">
        <div class="columns small-9">
          <p>Tabs (Published, Scheduled to Publish, Unpublished, Draft)</p>
        </div>
        <div class="columns small-3">
          <div class="post-button-green low-drop-shadow" v-on:click="loadEditEpisodeAudioView()">+ ADD NEW EPISODE</div>
        </div>
      </div>
      <div class="row">
        <div class="columns small-1">
          <p>(Ep. ID)</p>
        </div>
        <div class="columns small-2">
          <p>Title</p>
        </div>
        <div class="columns small-1">
          <p>Time</p>
        </div>
        <div class="columns small-1">
          <p>Published</p>
        </div>
        <div class="columns small-3">
          <p>Description</p>
        </div>
        <div class="columns small-2">
          <p>Tags</p>
        </div>
        <div class="columns small-1">
          <p>Explicit</p>
        </div>
        <div class="columns small-1">
          <p>(Elipsis)</p>
        </div>


      </div>
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
    loadShowsView() {
      this.$router.go('/shows');
    },
    saveShowDetails() {
      console.log('save show details clicked');
    },
    loadEditEpisodeAudioView() {
      this.$router.go('/edit-episode-audio');
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
