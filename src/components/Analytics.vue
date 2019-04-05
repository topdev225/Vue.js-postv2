<template>
  <div class="analytics">
    <p>Analytics - Coming Soon</p>
  </div>
</template>

<script>
  export default {
    name: 'analytics',

    components: {
    },

    vuex: {
      actions: {
      },

      getters: {
      },
    },

    computed: {
    },

    watch: {
    },
  };
</script>

<style lang="scss">
@import "../styles/foundation_settings.scss";
@import "../../node_modules/foundation-sites/scss/foundation.scss";
// @import "../styles/foundation_modules.scss";

@import "../styles/variables.scss";
// @import "../styles/global.scss";

@font-face {
  font-family: 'poppinssemibold';
  src: url('../assets/fonts/poppins/poppins-semibold-webfont.woff2') format('woff2'),
  url('../assets/fonts/poppins/poppins-semibold-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

div.analytics {
  color: $dark-grey;

}
</style>