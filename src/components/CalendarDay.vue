<!--
  CALENDAR DAY ROUTE (/day)
  Parented by the Calendar View component and takes care
  of displaying one copy of the single day component.
-->
<template>
  <div>
    <single-day
      v-if="dayLabel"
      :day-label="dayLabel"
      :day-number="dayNumber"
      :date="date"
      :index="0">
    </single-day>
  </div>
</template>

<script>
  import {
    // fetchEventsData,
    setDateString,
  } from '../core/actions';
  import SingleDay from '../components/SingleDay';
  import moment from 'moment';

  export default {
    name: 'calendar-day',

    data() {
      return {
        dayLabel: null,
        dayNumber: null,
      };
    },

    vuex: {
      actions: {
        // fetchEventsData,
        setDateString,
      },

      getters: {
        // TODO:
        // change displayed day based
        // upon current moment date
        // for now, get first day in array
        dates: (state) => state.dates,

        date: (state) => moment(state.dates.currentMomentDate).
          format('YYYY-MM-DD'),
      },
    },

    methods: {
      setDayLabel() {
        this.dayLabel = moment(this.dates.currentMomentDate).format('dddd');
      },

      setDayNumber() {
        this.dayNumber = moment(this.dates.currentMomentDate).format('DD');
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
      // this.fetchEventsData();
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
