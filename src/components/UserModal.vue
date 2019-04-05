<template>
  <div class="manage-tags" @keyup.esc="hideModal" :class="{ 'modal-is-open': this.$parent.showUserModal }">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header" v-text="headerText"></slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div class="grid-x grid-padding-x">
                <div class="large-12 cell">
                    <label>Name</label>
                    <input type="text" name="Name" v-model="item.name"/>
                </div>
              </div>
              <div class="grid-x grid-padding-x">
                <div class="large-12 cell">
                  <label>Email</label>
                  <input type="text" name="Email" v-model="item.email" />
                </div>
              </div>
              <div class="grid-x grid-padding-x">
                <div class="large-12 cell">
                  <label>Password</label>
                  <input type="password" name="Password" v-model="item.password" />
                </div>
              </div>
              <div class="grid-x grid-padding-x">
                <div class="large-12 cell">
                  <label>Access Level</label>
                  <multiselect
                    :options="accessLevelOptions"
                    :selected="item.accessLevelValue"
                    placeholder="" 
                    label="name" 
                    track-by="id">
                  </multiselect>
                </div>
              </div>
              <div class="grid-x grid-padding-x">
                <div class="large-12 cell">
                  <label>Available Stations</label>
                  <multiselect 
                    :options="stationOptions"
                    :selected="item.stationValues"
                    tag-placeholder="Add a station"
                    placeholder="Select stations"
                    label="stationTitle" 
                    track-by="stationTitle" 
                    :multiple="true" 
                    :taggable="true" 
                    @tag="tagStation">
                  </multiselect>
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$dispatch('saveUserModal', {})">Save</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MessageBar from '../components/MessageBar';
  import Multiselect from 'vue-multiselect';

  // import {
  //   getSettings,
  // } from '../core/actions';

  export default {
    name: 'manage-tags',
    data() {
      return {
        newTag: {
          name: '',
        },
      };
    },
    computed: {
      headerText() {
        let result = '';
        if (this.item.id) {
          result = 'Edit User';
        } else {
          result = 'Add User';
        }
        return result;
      },
      stationOptions() {
        let result = [];
        if (this.stations) {
          result = this.stations;
        }
        return result;
      },
      accessLevelOptions() {
        let result = [];
        if (this.accessLevels) {
          result = this.accessLevels;
        } else {
          result = [{ id: '1', name: 'mock access level' }];
        }
        return result;
      },
    },

    vuex: {
      actions: {
        // createTag,
      },

      getters: {
        stations: (state) => state.settings.stations,
        // accessLevels: () => , //TODO: need an api endpoint for wiring
      },

    },

    ready() {
      // bind esc to close modal
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          this.hideModal();
        }
      });
    },

    destroyed() {
      // document.removeEventListener('keydown');
    },

    methods: {
      hideModal() {
        this.$parent.showUserModal = false;
      },
      tagStation() {

      },
    },

    components: {
      MessageBar,
      // Tag,
      Multiselect,
    },

    props: {
      item: null,
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .manage-tags {
    visibility: hidden;
    opacity: 0;
    height: 85vh;
    width: 100%;
    max-width: $global-width;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $white;
    color: $black;
    padding: 2rem;
    border-radius: $global-radius;
    transition: all 0.25s;
    z-index: 1;
    display: flex;
    flex-direction: column;

    &.modal-is-open {
      visibility: visible;
      opacity: 1;
    }

    label {
      color: $black;
    }
  }

  .manage-tags-column {
    flex: 1 1 auto;
    min-width: initial;
  }

  .curtain {
    visibility: hidden;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.25s;
    overflow: hidden;
    position: fixed;

    &.modal-is-open {
      visibility: visible;
      opacity: 1;
    }
  }

  .tags-list {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 0px;
    padding: 0;

    & > .row > .column {

      @include breakpoint(medium) {
        &:nth-of-type(2n+1) {
          border-right: 1px solid $off-white;
        }
      }

      @include breakpoint(large) {
        &:nth-of-type(3n+1) {
          border-right: 1px solid $off-white;
        }

        &:nth-of-type(3n+2) {
          border-right: 1px solid $off-white;
        }
      }
    }
  }

  .add-button {
    margin-bottom: calc(1rem + 1px);
  }
</style>
