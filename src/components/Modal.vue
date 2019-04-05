<!-- See https://vuejs.org/guide/components.html#Named-Slots -->
<template>
  <div class="modal-mask" v-show="open" @keyup.esc="open = false" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <button class="modal-close-button" @click="open = false" title="Close Modal"><span aria-hidden="true">X</span></button>
          <slot name="header">
            <h3>Modal Title</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            Insert your lovely content here.
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="row">
              <div class="column text-right">
                <hr class="hr--light">
                <button class="btn btn--noShadow btn-primary btn--large"
                  @click="open = false">
                  Done
                </button>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      open: {
        type: Boolean,
        required: true,
        twoWay: true,
      },
    },
    methods: {
      close() {
        this.open = false;
      },
    },

    ready() {
      const self = this;
      document.addEventListener('keydown', event => {
        if (self.open && event.keyCode === 27) {
          self.close();
        }
      });
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .modal-body {
    margin: 0;
  }

  .modal-close-button {
    align-items: center;
    border-radius: 100%;
    color: grey;
    display: flex;
    font-weight: bold;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  .modal-container {
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    color: #000;
    margin: 0px auto;
    padding: 15px;
    position: relative;
    transition: all .3s ease;
    width: 300px;

    & input[name="theme_switch"] {
      margin-left: 5px;
    }

    & label {
      color: black;
      display: inline-block;

      &[for*="switch_"] {
        margin-left: 3px;
        margin-right: 5px;
      }
    }

    & summary {
      &:hover {
        cursor: pointer;
      }
    }

    & .copy-button {
      padding: 10px 0;

      &:hover {
        color: $medium-grey;
        cursor: pointer;
      }

      & .copy-success {
        color: green;
        margin-left: 5px;
      }
    }

    & .embed-code {
      background-color: $light-grey;
      display: block;
      overflow-x: scroll;
      padding: 30px 10px;
      position: relative;

      &::after {
        color: gray;
        content: "HTML";
        font-size: 13px;
        position: absolute;
        right: 5px;
        top: 5px;
      }

      &.theme-dark {
        background-color: $dark-grey;
        color: $white;

        &::after {
          color: $light-grey;
        }
      }
    }
  }

  .modal-enter, 
  .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
</style>
