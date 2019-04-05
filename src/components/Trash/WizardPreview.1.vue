<template>
  <div class="wizard-preview">
    <h3 class="page-title page-title--small">Preview</h3>
    <hr class="hr--small">

    <div class="wizard-preview-section" v-if="steps[0].isPreviewable">
      <div class="wizard-preview-section-header clearfix">
        <h4 class="wizard-preview-section-title">
          <button title="Date and Time"
            v-link="{ name: 'date-time' }"
            :disabled="!isAccessible('date-time')">
            Date and Time
          </button>
        </h4>
        <a class="wizard-preview-section-edit" title="Edit"
          v-link="{ name: 'date-time' }"
          v-if="currentStep !== 'date-time' && isAccessible('date-time')">
          Edit
        </a>
      </div>
      <div class="wizard-preview-section-content">
        <p>
          <strong>Date:</strong><br>
          {{ (event.schedule[0].enable_date) ? startDateFormatted : 'Enter a start date' }}-{{ (event.schedule[0].disable_date) ? endDateFormatted : 'TBD' }}
        </p>
        <p>
          <strong>Days of the Week:</strong><br>
          {{ recurringDaysFormatted }}
        </p>
        <p>
          <strong>Time:</strong><br>
          {{ (event.schedule[0].start_time) ? startTimeFormatted : 'Enter a start time' }}-{{ (event.schedule[0].end_time) ? endTimeFormatted : 'Enter an end time' }}
        </p>
      </div>
    </div>
    <div class="wizard-preview-section" v-if="steps[1].isPreviewable">
      <div class="wizard-preview-section-header clearfix">
        <h4 class="wizard-preview-section-title">
          <button title="Default Text"
            v-link="{ name: 'default-text' }"
            :disabled="!isAccessible('default-text')">
            Text
          </button>
        </h4>
        <a class="wizard-preview-section-edit" title="Edit"
          v-link="{ name: 'default-text' }"
          v-if="currentStep !== 'default-text' && isAccessible('default-text')">
          Edit
        </a>
      </div>
      <div class="wizard-preview-section-content">
        <p>
          <strong>Title:</strong><br>
          {{ event.title }}
        </p>
        <p>
          <strong>Description:</strong><br>
          {{ event.description }}
        </p>
        <p>
          <strong>Tags:</strong><br>
          {{ tagsFormatted }}
        </p>
      </div>
    </div>
    <div class="wizard-preview-section" v-if="steps[2].isPreviewable">
      <div class="wizard-preview-section-header clearfix">
        <h4 class="wizard-preview-section-title">
          <button title="Attach Photo"
            v-link="{ name: 'default-photo' }"
            :disabled="!isAccessible('default-photo')">
            Attach Photo
          </button>
        </h4>
        <a class="wizard-preview-section-edit" title="Edit"
          v-link="{ name: 'default-photo' }"
          v-if="currentStep !== 'default-photo' && isAccessible('default-photo')">
          Edit
        </a>
      </div>
      <div class="wizard-preview-section-content">
        <p v-if="event.rectangle_image">Rectangle
          <img :src="event.rectangle_image" alt="">
        </p>
        <p v-if="event.square_image">Square
          <img :src="event.square_image" alt="">
        </p>
      </div>
    </div>
    <div class="wizard-preview-section" v-if="steps[3].isPreviewable">
      <div class="wizard-preview-section-header clearfix">
        <h4 class="wizard-preview-section-title">
          <button title="Publish"
            v-link="{ name: 'post-options' }"
            :disabled="!isAccessible('post-options')">
            Publish
          </button>
        </h4>
        <a class="wizard-preview-section-edit" title="Edit"
          v-link="{ name: 'post-options' }"
          v-if="currentStep !== 'post-options' && isAccessible('post-options')">
          Edit
        </a>
      </div>
      <div class="wizard-preview-section-content">
        <p>
          <strong>Social:</strong><br>
          Facebook
        </p>
        <p>
          <strong>Bumpers:</strong><br>
          Pre-Bumper and Post-Bumper
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'wizard-preview',

    vuex: {
      getters: {
        steps: (state) => state.wizardSteps.steps,
        currentStep: (state) => state.wizardSteps.currentStep,
        event: (state) => state.wizardEvent,
      },
    },

    computed: {
      recurringDaysFormatted() {
        const recurringDays = [];
        const daysOfTheWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        daysOfTheWeek.forEach((day) => {
          if (this.event.schedule[0][`occurs_${day.toLowerCase()}`] === true) {
            recurringDays.push(day);
          }
        });

        return recurringDays.join(', ');
      },
      tagsFormatted() {
        if (this.event.playlist_categories) {
          const tags = this.event.playlist_categories;
          const tagsFormatted = [];

          for (let i = tags.length - 1; i >= 0; i--) {
            tagsFormatted.push(tags[i].name);
          }

          return tagsFormatted.join(', ');
        }
        return null;
      },
      startTimeFormatted() {
        return moment(this.event.schedule[0].start_time, 'H:mm').format('h:mm A');
      },
      endTimeFormatted() {
        return moment(this.event.schedule[0].end_time, 'H:mm').format('h:mm A');
      },
      startDateFormatted() {
        return moment(this.event.schedule[0].enable_date, 'YYYY-MM-DD').format('D/M/YY');
      },
      endDateFormatted() {
        return moment(this.event.schedule[0].disable_date, 'YYYY-MM-DD').format('D/M/YY');
      },
    },

    methods: {
      isAccessible(slug) {
        let step = {};

        for (let i = 0; i < this.steps.length; i++) {
          if (slug === this.steps[i].slug) {
            step = this.steps[i];
          }
        }

        return step.isAccessible;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .wizard-preview {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: $global-radius;
    margin-bottom: 2rem;
  }

  .wizard-preview-section {
    border-bottom: 2px solid rgba($light-medium-grey, 0.5);
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }

  .wizard-preview-section-title {
    font-size: rem-calc(20);
    font-weight: 700;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    margin-bottom: 0.5rem;
    color: $blue;
    float: left;
  }

  .wizard-preview-section-edit {
    float: right;
  }

  .wizard-preview-section-content {
    font-size: rem-calc(14);

    p {
      margin-bottom: 0.5rem;
      line-height: 1.4;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
