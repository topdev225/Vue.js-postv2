<!--
  CALENDAR WEEK ROUTE (/week)
  Parented by the Calendar View component and takes care
  of displaying a single-day component for each day of
  the week.
-->
<template>
  <div>
    <single-day
      v-for="day in weekdays"
      :day-label="day"
      :day-number="dayNumber | calcDayNumber $index"
      :date="dateFor($index)"
      :index="$index">
    </single-day>
  </div>
</template>

<script>
  import {
    setDateString,
  } from '../core/actions';
  import SingleDay from '../components/SingleDay';
  import moment from 'moment';

  export default {
    name: 'calendar-week',

    data() {
      return {
        dayLabel: null,
        dayNumber: null,
        weekdays: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      };
    },

    vuex: {
      actions: {
        setDateString,
      },

      getters: {
        dates: (state) => state.dates,
      },
    },

    methods: {
      setDayLabel() {
        this.dayLabel = moment(this.dates.currentStartOfWeek);
      },

      setDayNumber() {
        this.dayNumber = moment(this.dates.currentStartOfWeek);
      },

      dateFor(index) {
        return moment(this.dates.currentStartOfWeek).
          add(index, 'days').format('YYYY-MM-DD');
      },
    },

    watch: {
      dates: {
        handler() {
          this.setDayLabel();
          this.setDayNumber();
        },
        deep: true,
      },
    },

    ready() {
      this.setDayLabel();
      this.setDayNumber();
    },

    route: {
      data() {
        this.setDateString();
      },
    },

    components: {
      SingleDay,
    },
  };
</script>

<style lang="scss">
  // @import "../styles/variables.scss";
  // @import "../styles/foundation_settings.scss";
  // @import "../../node_modules/foundation-sites/scss/foundation.scss";
</style>
