<template>
  <div class="tooltip" :class="{ 'tooltip--is-open': tooltipData.isOpen }" :style="{ top: tooltipData.yPos + 'px', left: tooltipData.xPos + 'px', 'z-index': maxZIndex }">
    <div class="tooltip-title" v-if="tooltipData">{{ tooltipData.showTitle }}</div>
    <div class="tooltip-time" v-if="tooltipData.startTime">{{ tooltipData.startTime }} &mdash; {{ tooltipData.endTime }}</div>
    <div class="tooltip-actions">
      <template v-if="tooltipData.type !== 'empty'">
        <button class="btn btn-danger btn--noShadow tooltip-event-action-delete"
          @click="deleteEvent( showId )">Delete</button>
        <div v-if="type === 'show'">
          <button class="btn btn-primary btn--noShadow tooltip-event-action-edit" v-link="{
              name: 'date-time',
              params: { showId: this.showId },
              query: { }}">
            Edit
          </button>
          <button class="btn expanded btn--noShadow tooltip-event-action-new"  v-link="{
              name: 'date-time',
              params: { showId: 'new' },
              query: { defaultTime: this.defaultTime, parentId: this.showId }}">
            New Feature
          </button>
        </div>
        <div v-if="type === 'feature'">
          <button class="btn btn-primary btn--noShadow tooltip-event-action-edit" v-link="{
              name: 'date-time',
              params: { showId: this.showId },
              query: { parentId: this.show.parent }}">
            Edit
        </div>
      </template>
      <template v-else>
        <button class="btn btn-primary expanded btn--noShadow tooltip-day-action-new"
          v-link="{ name: 'date-time', params: { showId: 'new' }, query: { defaultTime: this.defaultTime }}">
          New Show
        </button>
      </template>
    </div>
    <button class="tooltip-close-button" @click="closeTooltip($event)"><icon name="close"></icon></button>
  </div>
</template>

<script>
  import Icon from '../../node_modules/vue-awesome/src/components/Icon';
  import {
    deleteEvent,
    closeTooltip,
  } from '../core/actions';

  export default {
    name: 'tooltip',

    vuex: {
      actions: {
        deleteEvent,
        closeTooltip,
      },

      getters: {
        tooltipData: (state) => state.tooltipData,
        showId: (state) => state.tooltipData.showId,
        defaultTime: (state) => state.tooltipData.defaultTime,
        type: (state) => state.tooltipData.type,
        show: (state) => state.shows[state.tooltipData.showId],
        maxZindex: (state) => state.maxZindex,
      },
    },

    computed: {
      maxZIndex() {
        return this.maxZindex;
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

  .tooltip {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%) translateY(-2rem);
    width: rem-calc(175);
    padding: 0.75rem;
    background-color: $white;
    border: 0.125rem solid $black;
    color: $black;

    &.is-feature {
      left: 0;
    }

    &::before,
    &::after {
      position: absolute;
      display: block;
      content: "";
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 100%);
    }

    &::before {
      @include css-triangle(1.125rem, $black, down);
    }

    &::after {
      @include css-triangle(1rem, $white, down);
    }

    &--is-open {
      visibility: visible;
      opacity: 1;
    }
  }

  .tooltip-close-button {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    padding: rem-calc(4 6 3 7);
    vertical-align: top;
    background-color: $black;
    color: $white;
    border-radius: 100%;
  }

  .tooltip-title {
    font-weight: bold;
    font-size: rem-calc(14);
    line-height: 1.2;
  }

  .tooltip-time {
    font-size: rem-calc(14);
    margin-bottom: 0.5rem;
  }

  .tooltip-event-action-edit {
    float: right;
  }

  .tooltip-event-action-new {
    margin-top: 0.5rem;
    text-align: center;
  }

  .tooltip-day-action-new {
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
