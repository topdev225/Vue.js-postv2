<template>
  <div class="tag" :class="{ 'is-editing': tagData == editedTag }">
    <div class="row">
      <div class="column tag-label-wrapper">
        <label class="tag-label" @dblclick="editTag($event, tagData)">{{ tagData.name }}</label>
        <input class="tag-input" type="text"
          v-model="tagData.name"
          v-tag-focus="tagData == editedTag"
          @keyup.enter="updateTagData(tagData)"
          @keyup.esc="cancelEdit">
      </div>
      <div class="column shrink">
        <div class="tag-actions">
          <a class="" title="Edit" @click="editTag($event, tagData)">Edit</a> |
          <a class="" title="Delete" @click="deleteTag(tagData)">Delete</a>
        </div>
        <div class="tag-actions-editing">
          <div class="button-group button-group--noShadow">
            <button class="btn btn--grayText btn--noShadow" title="Cancel" @click="cancelEdit">Cancel</button>
            <button class="btn btn--grayText btn--noShadow" title="Save" @click="updateTagData(tagData)">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    updateTag,
    deleteTag,
  } from '../core/actions';

  export default {
    name: 'tag',

    vuex: {
      actions: {
        updateTag,
        deleteTag,
      },
    },

    data() {
      return {
        editedTag: null,
        tagData: {
          id: null,
          name: null,
        },
      };
    },

    ready() {
      this.tagData = JSON.parse(JSON.stringify(this.tag));
    },

    events: {
      globalClick() {
        // this.editedTag = null;
      },
    },

    methods: {
      editTag(event, tag) {
        event.stopPropagation();
        this.editedTag = tag;
      },

      updateTagData(tagData) {
        this.editedTag = null;
        this.updateTag(tagData);
      },

      cancelEdit() {
        this.editedTag = null;
      },
    },

    props: {
      tag: Object,
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
      tagFocus(value) {
        const el = this.el;
        if (!value) {
          return;
        }
        Vue.nextTick(() => {
          el.focus();
        });
      },
    },
  };
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .tag {
    border-radius: $global-radius;
    border: 1px solid transparent;
    transition: all 0.25s;

    &.is-editing {
      border: 1px solid $black;
    }
  }

  .tag-label-wrapper {
    width: 0px;
    flex: 1 1 auto;
  }

  .tag-label,
  .tag-input {
    font-size: rem-calc(16);
    line-height: 1.5;
    padding: 0.375rem 1rem;
  }

  .tag-label {
    /// truncate the title
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .is-editing & {
      display: none;
    }
  }

  .tag-input {
    display: none;
    background: transparent;
    outline: none;
    border: 0;
    margin: 0;
    box-shadow: none;
    height: auto;
    border-radius: $global-radius;

    .is-editing & {
      display: block;
    }

    &:focus {
      outline: none;
      border: 0;
      box-shadow: none;
      outline-offset: 0;
      background: transparent;
    }
  }

  .tag-actions {
    padding: 0.375rem 1rem;

    .is-editing & {
      display: none;
    }
  }

  .tag-actions-editing {
    display: none;

    .is-editing & {
      display: block;
    }

    .button-group {
      margin-bottom: 0;
      box-shadow: none;

      .btn {
        box-shadow: inset -1px 0 1px rgba(255, 255, 255, 0.25);
        padding: 9px 10px 11px;
      }
    }
  }
</style>
