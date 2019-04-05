<template lang="html">
  <div class="day-overlay">
    <template v-for="div in 95">
      <div></div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'day-overlay',
  };
</script>

<style lang="scss" media="screen">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .day-overlay {
    position: absolute;
    height: 100%;
    width:100%;
    top: 0;
    pointer-events: none;
    display: block;

    div {
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      height: 30px;
      box-sizing: border-box;

      .is-expanded & {
        height: 60px;
      }
    }
  }
</style>
