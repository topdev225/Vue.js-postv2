<template>
   <!--  -->
  <div>
    <div class="feature" v-if="timeslot[occuringDay]" id="feature-{{ feature.id }}" :style="{ top: featureTop + unit, height: featureHeight + unit, 'z-index': feature.zindex }" @click="handleTooltip($event)">
      <div class="feature-dot"></div>
      <div class="feature-title">{{ feature.title }}</div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { openTooltip } from '../core/actions';

  export default {
    name: 'feature',

    vuex: {
      actions: {
        openTooltip,
      },
    },

    computed: {
      // featureSlot() {
      //   return feature.schedule
      // },
      timeslot() {
        return this.feature.schedule[0];
      },

      startTime() {
        return moment(this.timeslot.start_time, 'H:mm').format('HH:mm A');
      },

      endTime() {
        return moment(this.timeslot.end_time, 'H:mm').format('HH:mm A');
      },

      startMinutes() {
        const startMinutes = moment(this.startTime, 'HH:mm').minutes();
        const startHoursInMinutes = moment(this.startTime, 'HH:mm').hours() * 60;
        return startMinutes + startHoursInMinutes;
      },

      endMinutes() {
        const endMinutes = moment(this.endTime, 'HH:mm').minutes();
        const endHoursInMinutes = moment(this.endTime, 'HH:mm').hours() * 60;
        return endMinutes + endHoursInMinutes;
      },

      featureTop() {
        return this.startMinutes * this.intervalHeight;
      },

      featureHeight() {
        return (this.endMinutes - this.startMinutes) * this.intervalHeight;
      },

      occuringDay() {
        return `occurs_${this.dayLabel.toLowerCase()}`;
      },
    },

    methods: {
      handleTooltip(event) {
        event.stopPropagation();

        const tooltipData = {
          isOpen: true,
          xPos: this.center,
          yPos: event.pageY,
          startTime: this.startTime,
          endTime: this.endTime,
          showId: this.feature.id,
          showTitle: this.feature.title,
          type: 'feature',
        };

        this.openTooltip(tooltipData);
      },
    },

    props: {
      feature: Object,
      intervalHeight: Number,
      unit: String,
      center: Number,
      dayLabel: String,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .feature {
    position: absolute;
    box-sizing: border-box;
    border-top: thin solid $yellow;
    background-color: rgba($yellow, .3);
    width: 100%;
  }

  .feature-dot {
    margin: -5px auto auto -10px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: $yellow;
  }

  .feature-title {
    display: none;
  }

</style>
