<template>
  <div class="calendar-controls">
    <div class="row">
      <div class="column">
        <h2 class="page-title">{{ currentDateString }}</h2>
      </div>
      <div class="column shrink">
        <div class="button-group">
          <button class="btn" v-link="{ name: 'calendar-day', activeClass: 'active'}">Day</button>
          <button class="btn" v-link="{ name: 'calendar-week', activeClass: 'active' }">Week</button>
          <button class="btn btn--icon" @click="decrementCalendar"><icon name="chevron-left"></icon></button>
          <button id="datepicker-button" class="btn btn--icon">
            <icon name="calendar"></icon>
            <input class="datepicker-input" type="text"
              placeholder="Pick a date"
              v-pikaday="calendarDate"
              format="YYYY-MM-DD"
              trigger="true">
          </button>
          <button class="btn btn--icon" @click="incrementCalendar"><icon name="chevron-right"></icon></button>
        </div>
      </div>
      <div class="column shrink">
        <div class="button-group">
          <button class="btn" v-link="{ name: 'default-text', params: { showId: 1 }, query: { type: 'show'}}">Edit Defaults</button>
          <button class="btn" v-link="{ name: 'date-time', params: { showId: 'new' }, query: { type: 'show'}}">New Show</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import SimpleDatepicker from 'vue-simple-datepicker';
  import Icon from 'vue-awesome/src/components/Icon';
  import {
    decrementCalendar,
    incrementCalendar,
    setCalendarDate,
  } from '../core/actions';
  import moment from 'moment';

  export default {
    name: 'calendar-controls',

    components: {
      Icon,
      SimpleDatepicker,
    },

    vuex: {
      actions: {
        decrementCalendar,
        incrementCalendar,
        setCalendarDate,
      },

      getters: {
        currentDateString: (state) => state.dates.currentDateString,
        currentMomentDate: (state) => state.dates.currentMomentDate,
      },
    },

    computed: {
      calendarDate: {
        get() {
          if (this.currentMomentDate) {
            return moment(this.currentMomentDate).format('YYYY-MM-DD');
          }
          return null;
        },
        set(newVal) {
          this.setCalendarDate(newVal);
        },
      },
    },

    // watch: {
    //   currentMomentDate: {
    //     handler() {
    //       this.calendarDate = moment(this.currentMomentDate).format('YYYY-MM-DD');
    //     },
    //   },
    // },
  };
</script>

<style lang="scss">
  // @import "../styles/variables.scss";
  // @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .calendar-controls {
    margin-bottom: 1rem;

    .row {
      padding-right: rem-calc(12);
    }
  }

  .calendar-controls .datepicker-input {
    display: none;
  }
</style>
