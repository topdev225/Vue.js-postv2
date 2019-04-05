<template>
  <div id="app">
    <header role="banner">

      <span class="header__menu_logo">
        <img class="header__menu_logo_image" src="../assets/menu/logo.svg">
        <span class="header__menu_logo_tagline">Always PPM Encoded</span>
      </span>

      <div class="header__menu_navigation">
        <div class="header__menu_navigation-item current" v-on:click="loadShowsView()"><img src="../assets/menu/shows-icon.svg"/><span>SHOWS</span></div>
        <div class="header__menu_navigation-item" v-on:click="loadLoggerView()"><img src="../assets/menu/logger-icon.svg"/><span>PPM ENCODED LOGGER</span></div>
        <div class="header__menu_navigation-item" v-on:click="loadAnalyticsTab()"><img src="../assets/menu/analytics-icon.svg"/><span>ANALYTICS</span></div>
        <div class="header__menu_navigation-item" v-on:click="loadSettingsUserView()"><img src="../assets/menu/settings-icon.svg"/><span>SETTINGS</span></div>
      </div>

      <div class="header__menu_expanding-placeholder"></div>

      <div class="header__menu_user-controls">
        <!-- <label for='logoutBtn' title="Currently logged in user.">{{currentUser}}</label> -->
        <div v-if="currentStationName" class="station-selector">
          <span class="header__menu_user-controls_station-label">Station: <img class="station-logo" v-if="currentStationImageUrl" :src="currentStationImageUrl" /></span>
          <multiselect label="stationTitle" track-by="stationTitle" :placeholder="currentStationName"
              :searchable="false"
              @update="updateStationSelection"
              :options="stationOptions"
              :allow-empty="false"
              :show-labels="false"
              :custom-label="stationOptCustomLabel"
              option-partial="stationOptPartial">
          </multiselect>
        </div>
        <!-- <img src="https://via.placeholder.com/38">
        <img class="header__menu_user-controls_expand-chevron" src="../assets/menu/expand-chevron-icon.svg"/> -->
        <!--
        <div class="header__menu_user-controls_menu-items">
        <button class="btn logoutButton" @click="logOut()" id='logoutBtn'>logout</button>
        </div>
        -->
      </div>
    </header>

    <message-bar></message-bar>

    <router-view
      class="view wrapper"
      keep-alive
      transition="app"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
  // import debounce from 'debounce';
  import Vue from 'vue';
  import store from '../core/store';

  import Icon from 'vue-awesome/src/components/Icon';
  import MessageBar from '../components/MessageBar';
  import 'pikaday';

  import Multiselect from 'vue-multiselect';
  import stationOptionsPartial from '../partials/StationOptions.html';

  import {
    getSettings,
    getSocialMediaConnections,
    getPlaylistCategories,
    closeTooltip,
    setScrollPos,
    setDateString,
    getDefaultShow,
    fetchShowsData,
    // getUserList,
  } from '../core/actions';

  console.log(stationOptionsPartial);
  Vue.partial('stationOptPartial', stationOptionsPartial);

  export default {
    store,

    vuex: {
      actions: {
        getSettings,
        closeTooltip,
        setScrollPos,
        setDateString,
        getSocialMediaConnections,
        getPlaylistCategories,
        getDefaultShow,
        fetchShowsData,
        // getUserList,
      },

      getters: {
        queryType: (state) => {
          if (state.route.query !== null) {
            return state.route.query.type;
          }
          return null;
        },
        eventId: (state) => {
          if (state.route.params !== null) {
            return state.route.params.eventId;
          }
          return null;
        },
        toolTipOpen: (state) => state.tooltipData.isOpen,
        loggedInUser: (state) => state.settings.username,
        timeliner: (state) => state.settings.timeliner_enabled,
        showCats: (state) => state.settings.role.autoCatEditor,
        postAvailable: (state) => state.settings.post_enabled,
        maxZindex: (state) => state.maxZindex,
        event: (state) => state.wizardEvent,
        stationName: (state) => state.settings.station_name.toLowerCase(),
        stations: (state) => state.settings.stations,
        navQLinks: (state) => state.navQLinks,
        hasTimeliner: (state) => state.settings.timeliner_enabled,
      },
    },

    computed: {
      currentUser() {
        let returnStr = 'User: ';
        if (this.loggedInUser) {
          returnStr = `User: ${this.loggedInUser}`;
        }
        return returnStr;
      },
      currentStationName() {
        let returnStr = '';
        if (this.stationName) {
          returnStr = this.stationName;
        }
        return returnStr;
      },
      currentStationImageUrl() {
        let returnStr = '';
        if (this.stations && this.stationName) {
          returnStr = this.stations[0].defaultImageUrl;
        }
        return returnStr;
      },
      stationOptions() {
        let result = [];
        if (this.stations) {
          result = this.stations;
        }
        return result;
      },
      postEnabled() {
        let retBool = false;
        if (this.postAvailable) {
          retBool = this.postAvailable;
        }
        return retBool;
      },
      browserPage() {
        let returnUrl = 'logger.html';
        if (this.timeliner) {
          returnUrl = 'browser.html';
        }
        return returnUrl;
      },
      styleObject() {
        const styleObj = { 'z-index': this.maxZindex + 1 };
        return styleObj;
      },
      groupsStyle() {
        let styleObj = { display: 'none' };
        if (this.showCats ||
            this.loggedInUser === 'admin' ||
            this.loggerInUser === 'demo') {
          styleObj = { display: 'inline-block' };
        }
        return styleObj;
      },
      logOut() {
        window.location = '/';
      },
    },

    methods: {
      appBroadcast() {
        if (this.toolTipOpen) {
          this.closeTooltip();
        }
      },

      scrollTracker() {
        this.setScrollPos(window.pageYOffset);
      },

      loadShowsView() {
        this.$router.go('/shows');
      },
      loadLoggerView() {
        this.$router.go('/logger');
      },
      loadAnalyticsTab() {
        window.open('http://www.google.com', 'loggerTab');
      },
      loadSettingsUserView() {
        this.$router.go('/settings-user-management');
      },

      openPost(event) {
        event.stopPropagation();
        if (this.postEnabled) {
          window.location.href = `post.html${this.navQLinks}`;
        } else {
          const line1 = 'POST is not enabled on your account - only the Browser module.';
          const line2 = 'Please contact your Futuri sales representative for more information.';
          alert(`${line1} ${line2}`);
        }
      },

      openBrowser(event) {
        event.stopPropagation();
        if (this.timeliner) {
          window.location.href = `browser.html${this.navQLinks}`;
        } else {
          window.location.href = `logger.html${this.navQLinks}`;
        }
      },

      openListing(event) {
        event.stopPropagation();
        window.location.href = `listing.html${this.navQLinks}`;
      },

      openGroups(event) {
        event.stopPropogation();
        window.location.href = `groups.html${this.navQLinks}`;
      },

      openAnalytics(event) {
        event.stopPropagation();
        const analyticsUrl = `/${this.stationName}/podcast-reports/rangeview.html${this.navQLinks}`;
        window.location.href = analyticsUrl;
      },

      saveCroppings() {
        if (this.event.square_image !== '') {
          this.$broadcast('save_crop', 'square_photo');
        }
        if (this.event.rectangle_image !== '') {
          this.$broadcast('save_crop', 'rectangle_photo');
        }
      },

      updateStationSelection(event) {
        console.log(event);
        console.log('change station selection');
      },
    },

    ready() {
      this.getSettings();
      this.getSocialMediaConnections();
      // this.getUserList();
      this.getPlaylistCategories();
      this.getDefaultShow();
      this.fetchShowsData();
    },

    components: {
      MessageBar,
      Icon,
      Multiselect,
    },
  };
</script>

<style lang="scss">
@import "../styles/foundation_settings.scss";
@import "../../node_modules/foundation-sites/scss/foundation.scss";
@import "../styles/foundation_modules.scss";

@import "../../node_modules/pikaday/scss/pikaday.scss";

@import "../styles/variables.scss";
@import "../styles/global.scss";
@import "../styles/btn.scss";
@import "../styles/switch.scss";

body {
  margin: 0 auto;
  max-width: 1220px;
}

#app > .view {
  margin-top: 1em;
}

.view {
  transition: all .3s ease;
}

.app-enter {
  opacity: 0;
  transform: translate3d(50px, 0, 0);
}

.app-leave {
  opacity: 0;
  transform: translate3d(50px, 0, 0);
}


.toggle {
  display: block;
}

.flip {
  -webkit-transform: matrix(1, 0, 0, -1, 0, 0);
  -o-transform: matrix(1, 0, 0, -1, 0, 0);
  -moz-transform: matrix(1, 0, 0, -1, 0, 0);
  transform: matrix(1, 0, 0, -1, 0, 0);
}

#app {
  header {
    align-items: stretch;
    // background-color: red;
    display: flex;
    flex-wrap: nowrap;
    height: 4.5em;
    width: 100%;
    border-bottom: 1px solid #9b9b9b;
    margin-bottom: 1.25em;
    padding-bottom: 2em;

    span.header__menu_logo {
      height: auto;
      width: 10.0em;
      margin-right: 3em;


      img.header__menu_logo_image {
        display: block;
        height: auto;
        width: 100%;
              }

      span.header__menu_logo_tagline {
        color: $medium-grey;
        display: block;
        font-size: 0.925em;
      }
    }

    div.header__menu_navigation {
      align-self: center;

      div.header__menu_navigation-item {
        align-self: center;
        // background-color: blue;
        color: $link-grey;
        cursor: pointer;
        display: inline-block;
        font-size: 0.90em;
		padding-right: 1.25em;
		padding-top: 3.2em;
		height: 7.75em;
		border-bottom: 3px solid #fff;

	        img {
	          padding-right: 0.5em;
	          vertical-align: bottom;
	        }

        // ToDo: correct this color and make the current page be highlighted

      }
	  div.header__menu_navigation-item img:hover,
	  div.header__menu_navigation-item span:hover {

	  }

	  div.header__menu_navigation-item.current {
      border-bottom: 3px solid #c9db34;
    }
      /* mouse over "link" */
      div.header__menu_navigation-item:hover {
        color: $medium-grey;
        cursor: pointer;
      }
    }

    div.header__menu_expanding-placeholder {
      flex-grow: 3;
    }

    div.header__menu_user-controls {
      align-self: center;
      width: 275px;
      span.header__menu_user-controls_station-label {
        color: $link-grey;
        font-size: 0.90em;
        margin-right: 0.3em;
        // vertical-align: middle;
      }

      span.header__menu_user-controls_station {
        color: $medium-grey;
        font-size: 0.90em;
        vertical-align: middle;
      }

      img {
        display: inline;
        margin-left: 0.3em;
        height: auto;
      }

      .header__menu_user-controls_expand-chevron {
        display: inline;
        vertical-align: sub;
      }

      .station-selector .multiselect {
        width: 155px;
        display: inline-block;
      }
      .station-selector .multiselect__tags {
        border: none;
      }
      .station-selector img.station-logo {
        border-radius: 50%;
        width: 38px;
      }
      .station-selector .option__title {
        padding: 0 0 0 8px;
      }
    }
  }
}
</style>

<!-- this is generated by less from the legacy post styles,
     so I kept it as a separate stylesheet,
     see README for more info -->
<!-- <style src="../styles/post.css" lang="css"></style> -->
