<template>
  <div id="app" @click="appBroadcast()">
    <div class="header" :style="styleObject">
      <span><img v-on:click="openPost" src='../assets/logo-post.png'>
        <div class="row userInfo">
          <label for='logoutBtn' title="Currently logged in user.">{{currentUser}}</label>
          <button class="btn logoutButton" @click="logOut()" id='logoutBtn'>logout</button>
        </div>
        <p class="buttons">
          <button class="navtranscription" v-if="hasTimeliner" onclick="window.location.href='payment.html'"><icon name="volume-up"></icon> Voice Transcription</button>
          <button v-on:click="openPost"><icon name="arrow-circle-o-up"></icon> Post</button>
          <button class="navbrowser" v-on:click="openBrowser"><icon name="search"></icon> Browser</button>
          <button class="navstats" v-on:click="openListing"><icon name="th-list"></icon> Management</button>
          <button class="navplanner" onclick.prevent="return false;" disabled><icon name="calendar"></icon> Planner</button>
          <button class="navgroups" v-on:click="openGroups" :style="groupsStyle"><icon name="group"></icon> Categories</button>
          <button v-on:click="openAnalytics"><icon name="bar-chart"></icon> Analytics</button>
        </p>
      </span>
    </div>
   <!-- <div class="row">
      <div class="column">
        <div class="page-header">
          <template v-if="eventId === 'new'">
            <h1 class="page-title" v-if="queryType === 'feature'">Create New Feature</h1>
            <h1 class="page-title" v-if="queryType === 'show'">Create New Show</h1>
            <h1 class="page-title" v-if="!queryType">{{ $route.title }}</h1>
          </template>
          <template v-else>
            <h1 class="page-title" v-if="queryType === 'feature'">Edit Feature</h1>
            <h1 class="page-title" v-if="queryType === 'show'">Edit Show</h1>
            <h1 class="page-title" v-if="!queryType">{{ $route.title }}</h1>
          </template>
          <hr>
        </div>
      </div>
    </div> -->
    <message-bar></message-bar>
    <router-view
      class="view wrapper1"
      keep-alive
      transition="app"
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
  // import debounce from 'debounce';
  import Icon from 'vue-awesome/src/components/Icon';
  import store from '../core/store';
  import MessageBar from '../components/MessageBar';
  import 'pikaday';
  import {
    getSettings,
    getSocialMediaConnections,
    getPlaylistCategories,
    closeTooltip,
    setScrollPos,
    setDateString,
    getDefaultShow,
    fetchShowsData,
  } from '../core/actions';

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
        station: (state) => state.settings.station_name.toLowerCase(),
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
        const analyticsUrl = `/${this.station}/podcast-reports/rangeview.html${this.navQLinks}`;
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
    },

    ready() {
      this.getSettings();
      this.getSocialMediaConnections();
      this.getPlaylistCategories();
      this.getDefaultShow();
      this.fetchShowsData();

      // XXX: I don't like this, there is no need to put this in Vuex, you
      // can access this anywhere by looking at window.pageYOffset.
      // window.addEventListener('scroll', debounce(this.scrollTracker, 300));
    },

    components: {
      MessageBar,
      Icon,
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

  #app > .view {
    margin-top: 1rem;
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

  .page-header {
    padding-right: rem-calc(12);
    margin-top: 70px;
  }
  
  .header { display: block; position: fixed; top: 0; left: 0; width: 100%; background: $white; background: linear-gradient($white, darken($white, 10%)); box-shadow: 0 8px 8px rgba(0,0,0,0.3); font-size: 0;
    span { display: inline-block; width: 100%; vertical-align: bottom; padding: 10px;
        img { display: inline-block; }
        div.userInfo { float: right;
            button { color: white; font-size: 12px; padding: 0px 2px 0px; }
            label { color: black; font-size: 12px; margin-right: 10px; }
        }
    }
    .buttons { display: inline; white-space: nowrap; font-size: 0;position: fixed; margin-top: 26px; width: 100%; padding-left: 5px;
        button { display: inline-block; background-color: $light-grey; border: 0; font-size: 16px; line-height: 16px; color: #1D22AB; padding: 10px 0; margin: 0 5px; cursor: pointer; width: -webkit-calc(14% - 30px); width: calc(14% - 30px);
            &:hover { background-color: darken($light-grey, 20%); }
            &:disabled { background-color: #1D22AB; color: $just-off-white; cursor: default; }
        }
    }
    .navigation { display: inline-block; width: 50%; vertical-align: bottom; text-align: right; font-size: 12px; font-weight: normal; line-height: 50px; color: $black;
        .user-info { padding: 0 16px; }
        .log-out { padding: 0 16px; border-left: 1px solid darken($white, 20%); }
    }
  }
</style>

<!-- this is generated by less from the legacy post styles,
     so I kept it as a separate stylesheet,
     see README for more info -->
<style src="../styles/post.css" lang="css"></style>
