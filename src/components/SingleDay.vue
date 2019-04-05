<!--
  SINGLE DAY
  This component is used in the Calendar Week (/week)
  and Calendar Day (/day) views to go through displaying
  the actual values and shows for a specific day
-->
<template>
  <div class="calendar-day-wrapper" id="day-{{dayLabel}}" :class="{ 'is-single': isSingle }">
    <div class="calendar-day" :class="{ 'is-expanded': events }">
      <div class="calendar-day-header">
        <div class="calendar-dayLabel">{{ dayLabel | calcDayLabel }}</div>
        <div class="calendar-dayNum">{{ dayNumber }}</div>
      </div>
      <div class="calendar-day-main" @click="handleTooltip($event)">
        <div class="calendar-day-main-wrapper" v-el:timeline>
          <div v-for="show in showsToday">
            <div v-for="timeslot in show.schedule">
              <show
                :show="show"
                :timeslot="timeslot"
                :day-label="dayLabel"
                :date="date"
              >
              </show>
            </div>
          </div>
          <single-day-overlay :style="{ 'z-index': maxZIndex }"></single-day-overlay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Show from '../components/Show';
  import SingleDayOverlay from '../components/SingleDayOverlay';
  import { openTooltip } from '../core/actions';
  import h from '../core/helpers';
  import moment from 'moment';

  export default {
    name: 'single-day',

    vuex: {
      actions: {
        openTooltip,
      },

      getters: {
        topLevelShows: (state) => Object.values(state.shows).
          filter(sh => !sh.parent),
        maxZindex: (state) => state.maxZindex,
      },
    },

    data() {
      return {
        tooltipTop: null,
        center: 0,
        position: {},
        boundingBox: {},
      };
    },

    computed: {
      isSingle() {
        if (this.$route.name === 'calendar-day') {
          return true;
        }
        return false;
      },

      dayIndex() {
        return this.index;
      },

      showsToday() {
        return this.topLevelShows.filter((show) => {
          if (show.schedule[0].disable_date == null) {
            return moment(show.schedule[0].enable_date).isSameOrBefore(this.date);
          }
          return moment(show.schedule[0].enable_date).isSameOrBefore(this.date) &&
              moment(show.schedule[0].disable_date).isSameOrAfter(this.date);
        });
      },

      maxZIndex() {
        return this.maxZindex;
      },

    },

    methods: {
      handleTooltip(event) {
        event.stopPropagation();

        // Need to recalculate this here because the user may switch
        // between week/day views and "center" should be different
        // depending which view you're in
        this.center = this.position.x + (this.boundingBox.width / 2);

        const timelineTop = this.$els.timeline.
            getBoundingClientRect().top + window.scrollY;
        const tooltipData = {
          isOpen: true,
          xPos: this.center,
          yPos: event.pageY,
          defaultTime: h.pixelAsTime(timelineTop, event.pageY, 2),
          startTime: this.startTime,
          endTime: this.endTime,
          type: 'empty',
        };

        this.openTooltip(tooltipData);
      },
    },

    ready() {
      this.currentElement = document.getElementById(`day-${this.dayLabel}`);
      this.position = h.getPosition(this.currentElement);
      this.boundingBox = this.currentElement.getBoundingClientRect();
      this.center = this.position.x + (this.boundingBox.width / 2);
    },

    components: {
      Show,
      SingleDayOverlay,
    },

    props: {
      dayLabel: String,
      dayNumber: String,
      index: Number,
      date: String,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .calendar-day-wrapper {
    width: 14.2857%;
    float: left;

    &.is-single {
      width: 100%;
    }
  }

  .calendar-day {
    position: relative;
    height: 100%;
    padding-right: rem-calc(12);
  }

  .calendar-day-header {
    padding: 0.5rem 1rem;
    color: $white;
  }

  .calendar-dayLabel,
  .calendar-dayNum {
    display: inline-block;
  }

  .calendar-dayNum {
    float: right;
  }

  .calendar-day-main {
    position: relative;
    height: 100%;
    background-color: $white;
  }

  .calendar-day-main-wrapper {
    height: 2880px;

    .is-expanded & {
      height: 5760px;
    }
  }
</style>
