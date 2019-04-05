<template lang="html">
  <div class="calendar-timeline" :class="{ 'is-expanded': this.hasEvents }">
    <div class="time">12:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">1:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">2:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">3:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">4:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">5:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">6:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">7:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">8:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">9:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">10:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">11:00a</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">12:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">1:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">2:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">3:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">4:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">5:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">6:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">7:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">8:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">9:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">10:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <div class="time">11:00p</div>
    <div class="time">15</div>
    <div class="time">30</div>
    <div class="time">45</div>
    <!-- not sure if we should include this once since it's technically the next day -->
    <!-- <div class="time">12:00am</div> -->
  </div>
</template>

<script>
  export default {
    name: 'calendar-timeline',

    vuex: {
      getters: {
        hasEvents: (state) => state.events,
      },
    },
  };
</script>

<style lang="scss" media="screen">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .calendar-timeline {
    margin-top: rem-calc(21);
    text-align: right;
    color: $white;
    font-size: rem-calc(14);

    div {
      padding: 0.5rem 0;
      color: mix($black, $white, 25%);

      &:nth-of-type(4n+1) {
        color: $white;
      }
    }
  }

  .time {
    height: 30px;

    .is-expanded & {
      height: 60px;
    }
  }
</style>
