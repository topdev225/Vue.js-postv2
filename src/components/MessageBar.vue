<template>
  <div class="row">
    <div class="column">
      <div class="message-bar collapsed" :class="message.type">
        <p class="message-bar-content">
          <icon class="message-bar-icon" v-if="message.type === 'success'" name="check"></icon>
          <icon class="message-bar-icon" v-if="message.type === 'error'" name="ban"></icon>
          {{ message.name }}
          <em class="message-details" v-if="message.details"> &mdash; {{ message.details }}</em>
          <button class="message-bar-close" @click="dismissMessage"><icon name="close"></icon></button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../../node_modules/vue-awesome/src/components/Icon';
  import {
    dismissMessage,
  } from '../core/actions';

  export default {
    name: 'message-bar',

    vuex: {
      actions: {
        dismissMessage,
      },

      getters: {
        message: (state) => state.message,
      },
    },

    watch: {
      message: {
        handler(data) {
          const $messageBar = document.querySelectorAll('.message-bar');

          for (let i = $messageBar.length - 1; i >= 0; i--) {
            // get and set height for .message-bar element
            // this is so we can have smooth animations
            $messageBar[i].style.height =
              `${$messageBar[i].querySelector('.message-bar-content').offsetHeight}px`;
          }

          for (let i = $messageBar.length - 1; i >= 0; i--) {
            // if message.active changes on global state
            // re-assess our .message-bar classes
            if (data.active) {
              $messageBar[i].classList.remove('collapsed');
            } else {
              $messageBar[i].classList.add('collapsed');
            }
          }
        },
        deep: true,
      },
    },

    components: {
      Icon,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .message-bar {
    margin-bottom: 1rem;
    transition: all 0.25s;
    overflow: hidden;
    opacity: 1;
    color: $white;

    &.collapsed {
      height: 0 !important;
      opacity: 0;
      margin: 0;
    }

    &.success {
      background-color: $green;
    }

    &.error {
      background-color: $orange-med;
    }
  }

  .message-bar-content {
    display: inline-block;
    margin: 0;
    padding: 0.5rem 1rem;
    width: 100%;
  }

  .message-bar-icon {
    top: 0.125rem;
    position: relative;
    margin-right: 0.5rem;
  }

  .message-bar-close {
    float: right;
    padding: rem-calc(5) rem-calc(6) rem-calc(3);
    position: relative;
    line-height: 1;
    transition: all 0.25s;

    .success &:hover {
      background-color: mix($black, $green, 15%);
    }

    .error &:hover {
      background-color: mix($black, $orange-med, 15%);
    }
  }
</style>
