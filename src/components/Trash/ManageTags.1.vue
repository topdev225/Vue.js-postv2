<template>
  <div class="manage-tags" @keyup.esc="hideModal" :class="{ 'modal-is-open': this.$parent.modalIsOpen }">
    <div class="manage-tags-column">
      <div class="row">
        <div class="column">
          <h1 class="page-title">Manage Tags</h1>
          <hr class="hr--light">
        </div>
      </div>

      <message-bar></message-bar>

      <div class="row align-bottom">
        <div class="column">
          <label>Create New Tag
            <input type="text" placeholder="Enter New Tag Name"
              v-model="newTag.name">
          </label>
        </div>
        <div class="column shrink">
          <button class="add-button btn btn--noShadow btn--marginBottom btn-primary btn--large"
            :disabled="!newTag.name"
            @click="createTagAndClear()">
            Add
          </button>
        </div>
      </div>
    </div>

    <div class="manage-tags-column tags-list">
      <div class="row medium-up-2 large-up-3">
        <div
          v-for="tag in tags"
          class="column">
          <tag
            :tag="tag">
          </tag>
        </div>
      </div>
    </div>

    <div class="manage-tags-column">
      <div class="row">
        <div class="column text-right">
          <hr class="hr--light">
          <button class="btn btn--noShadow btn-primary btn--large"
            @click="hideModal">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="curtain" @click="hideModal" :class="{ 'modal-is-open': this.$parent.modalIsOpen }"></div>
</template>

<script>
  import MessageBar from '../components/MessageBar';
  import Tag from '../components/Tag';
  import {
    createTag,
  } from '../core/actions';

  export default {
    name: 'manage-tags',

    data() {
      return {
        newTag: {
          name: '',
        },
      };
    },

    vuex: {
      actions: {
        createTag,
      },

      getters: {
        tags: (state) => state.playlistCategories,
      },
    },

    ready() {
      // bind esc to close modal
      // TODO: this creates a memory leak because we don't remove this
      // event handler anywhere.
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          this.hideModal();
        }
      });
    },

    methods: {
      hideModal() {
        this.$parent.modalIsOpen = false;
      },
      createTagAndClear() {
        this.createTag(this.newTag);
        this.newTag = { name: '' };
      },
    },

    components: {
      MessageBar,
      Tag,
    },

    props: {
      tags: Array,
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
