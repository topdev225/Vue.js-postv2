<template>
  <div>
    <div class="show" id="show-{{timeslot.id}}-{{dayLabel}}" v-if="timeslot[occuringDay]" :style="{ top: showTop + unit, height: showHeight + unit, 'z-index': show.zindex }" @click="handleTooltip($event)">
      <div class="show-title" id="showTitle-{{timeslot.id}}-{{dayLabel}}" :style="{ top: titleTop + unit }">{{ show.title }}</div>
    </div>
    <template v-for="feature in features">
      <feature
        :feature="feature"
        :interval-height="intervalHeight"
        :unit="unit"
        :center="center"
        :day-label="dayLabel"
        :index="$index">
      </feature>
    </template>
  </div>
</template>

<script>
  import Feature from '../components/Feature';
  import moment from 'moment';
  import { openTooltip } from '../core/actions';
  import h from '../core/helpers';

  export default {
    name: 'show',

    data() {
      return {
        intervalHeight: 2,
        unit: 'px',
        currentElement: null,
        titleElement: null,
        titleTop: 0,
        showTopPosition: 0,
        center: 0,
        position: {},
        boundingBox: {},
      };
    },

    vuex: {
      actions: {
        openTooltip,
      },

      getters: {
        yScrollPos: (state) => state.yScrollPos,

        // return all shows, mainly for features computed property
        shows: (state) => Object.values(state.shows),
      },
    },

    watch: {
      yScrollPos: {
        handler() {
          // Make sure the show's timeslot is active for the current day
          if (this.timeslot[this.dayLabel.toLowerCase()] === true) {
            this.position = h.getPosition(this.currentElement);
            this.boundingBox = this.currentElement.getBoundingClientRect();
            const top = this.yScrollPos + this.position.y;
            const bottom = top + this.boundingBox.height;

            if (this.yScrollPos < top) {
              this.titleTop = 0;
              return;
            } else if (this.yScrollPos + this.titleHeight > bottom - this.titleHeight) {
              this.titleTop = bottom - top - (this.titleHeight + 5);
              return;
            }

            this.titleTop = this.yScrollPos - top;
          }
        },
      },
    },

    computed: {
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

      showTop() {
        return this.startMinutes * this.intervalHeight;
      },

      showHeight() {
        return (this.endMinutes - this.startMinutes) * this.intervalHeight;
      },

      titleHeight() {
        return this.titleElement.getBoundingClientRect().height;
      },

      // returns all features belonging to this show
      features() {
        return this.shows.
          filter(sh => sh.parent === this.show.id).
          filter((show) => {
            if (show.schedule[0].disable_date == null) {
              return moment(show.schedule[0].enable_date).isSameOrBefore(this.date);
            }
            return moment(show.schedule[0].enable_date).isSameOrBefore(this.date) &&
                moment(show.schedule[0].disable_date).isSameOrAfter(this.date);
          });
      },

      occuringDay() {
        return `occurs_${this.dayLabel.toLowerCase()}`;
      },
    },

    methods: {
      handleTooltip(event) {
        event.stopPropagation();
        // Need to recalculate this here because the user may switch
        // between week/day views and "center" should be different
        // depending which view you're in
        this.currentElement = document.getElementById(`show-${this.timeslot.id}-${this.dayLabel}`);
        this.position = h.getPosition(this.currentElement);
        this.boundingBox = this.currentElement.getBoundingClientRect();
        this.center = this.position.x + (this.boundingBox.width / 2);

        const timelineTop = this.currentElement.parentNode.
            getBoundingClientRect().top + window.scrollY;

        const tooltipData = {
          isOpen: true,
          xPos: this.center,
          yPos: event.pageY,
          defaultTime: h.pixelAsTime(timelineTop,
            event.pageY, this.intervalHeight),
          startTime: this.startTime,
          endTime: this.endTime,
          showId: this.show.id,
          showTitle: this.show.title,
          type: 'show',
        };

        this.openTooltip(tooltipData);
      },
    },

    ready() {
      // Make sure the show's timeslot is active for the current day
      if (this.timeslot[this.occuringDay] === true) {
        this.currentElement = document.getElementById(`show-${this.timeslot.id}-${this.dayLabel}`);
        this.titleElement = document.getElementById(`showTitle-${this.timeslot.id}-${this.dayLabel}`);
        this.position = h.getPosition(this.currentElement);
        this.boundingBox = this.currentElement.getBoundingClientRect();
        this.center = this.position.x + (this.boundingBox.width / 2);
        this.showTopPosition = this.position.y;
      }
    },

    components: {
      Feature,
    },

    props: {
      dayLabel: String,
      show: Object,
      timeslot: Object,
      date: String,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .show {
    box-sizing: border-box;
    width: 100%;
    // events need to be absolute so
    // we can position them properly
    position: absolute;
    background-color: $light-medium-blue;
    border: 2px solid $dark-blue;
    border-bottom: 10px solid $dark-blue;
  }

  .show-title {
    transition: transform .5s ease-out;
    transform: translateY(0);
    font-weight: 700;
    padding: rem-calc(3) rem-calc(9);
    position: relative;
    background-color: $dark-blue;
    max-width: 100%;
    // don't allow clicks on element
    pointer-events: none;
    display: block;
  }

  // .show {
  //   background-color: $medium-blue;
  //   border-bottom: 0.1875rem solid mix($black, $medium-blue, 10%);
  //   background-clip: padding-box;
  //   min-height: 30px;
  //
  //   .calendar-day-main > & {
  //     border-top: none;
  //   }
  //
  //   .calendar-day-main > & ~ & {
  //     border-top: 0.1875rem solid transparent;
  //   }
  // }
  //
  // .feature {
  //   // tried adding yellow border to integrate the overlay
  //   // a bit more with the yellow dot but it could show
  //   // on top of a show title
  //   // border-top: 1px solid rgba($yellow, 0.25);
  //   background-color: rgba($white, 0.1);
  //   color: $black;
  //   z-index: 2;
  //   transition: background-color 0.25s;
  //   // don't allow clicks on element
  //   pointer-events: none;
  //   display: block;
  //
  //   &::before {
  //     position: absolute;
  //     content: "";
  //     display: block;
  //     top: 0;
  //     left: rem-calc(-6);
  //     width: rem-calc(12);
  //     height: rem-calc(12);
  //     border-radius: 100%;
  //     transition: all 0.25s;
  //     background-color: rgba($yellow, 0.75);
  //     // all clicks/hover on pseudo-element
  //     pointer-events: all;
  //   }
  //
  //   &.is-active,
  //   &:hover {
  //     background-color: rgba($white, 0.2);
  //
  //     &::before {
  //       background-color: $yellow;
  //       top: rem-calc(-1);
  //       left: rem-calc(-7);
  //       width: rem-calc(14);
  //       height: rem-calc(14);
  //     }
  //   }
  // }
</style>
