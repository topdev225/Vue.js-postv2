<!--
  CALENDAR VIEW
  This is a router/view component that displays the controls,
  dates, and timeline components, and then renders the
  CalendarDay or CalendarWeek component based on the currently
  selected route.
-->
<template>
  <div class="calendar">
    <calendar-controls></calendar-controls>
    <div class="row">
      <div class="column shrink">
        <calendar-timeline></calendar-timeline>
      </div>
      <tooltip></tooltip>
      <div class="column">
        <router-view
          class="view wrapper"
          keep-alive
          transition="app"
          transition-mode="out-in">
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import CalendarControls from '../components/CalendarControls';
  import CalendarTimeline from '../components/CalendarTimeline';
  import Tooltip from '../components/Tooltip';

  export default {
    name: 'calendar-view',

    vuex: {
      getters: {
        tooltip: (state) => state.tooltip,
      },
    },

    components: {
      CalendarControls,
      CalendarTimeline,
      Tooltip,
    },
  };
</script>

<style lang="scss">
  // @import "../styles/variables.scss";
  // @import "../styles/foundation_settings.scss";
  // @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .calendar {
    margin-bottom: 2rem;
  }
</style>
