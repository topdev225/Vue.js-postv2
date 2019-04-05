<template>
  <div class="row">
    <div class="column">
      <hr>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <button v-link="{ name: 'calendar-week' }" class="btn">Cancel</button>
    </div>
    <div class="column text-right">
      <button class="btn btn--marginRight"
        v-if="!isFirstStep"
        @click="handlePreviousStep">
        Previous
      </button>
      <button class="btn btn-primary"
        v-if="!isLastStep"
        @click="handleNextStep"
        :disabled="!isValid">
        Next
      </button>
      <button class="btn btn-primary"
        v-if="isLastStep"
        @click="saveEvent(event)"
        :disabled="!isValid">
        Done
      </button>
    </div>
  </div>
</template>

<script>
  // import router from '../core/router';
  import {
    saveEvent,
    incrementStep,
    decrementStep,
  } from '../core/actions';

  export default {
    name: 'wizard-navigation',

    computed: {
      isFirstStep() {
        let firstStep = 0;
        if (!this.allowFirstStep) {
          firstStep = 1;
        }
        if (this.currentStep === firstStep) {
          return true;
        }
        return false;
      },
      isLastStep() {
        if (this.currentStep === 3) {
          return true;
        }
        return false;
      },
      isValid() {
        return this.steps[this.currentStep].isValid;
      },
    },

    vuex: {
      actions: {
        saveEvent,
        incrementStep,
        decrementStep,
      },
      getters: {
        steps: (state) => state.wizardSteps.steps,
        currentStep: (state) => state.wizardSteps.currentStep,
        event: (state) => state.wizardEvent,
        allowFirstStep: (state) => state.wizardEvent.id !== 1,
      },
    },

    methods: {
      handlePreviousStep() {
        this.decrementStep();
      },
      handleNextStep() {
        if (this.steps[this.currentStep].slug === 'default-photo') {
          this.$root.saveCroppings();
        }
        this.incrementStep();
      },
    },
  };
</script>

<style lang="scss">
  // @import "../styles/variables.scss";
  // @import "../styles/foundation_settings.scss";
  // @import "../../node_modules/foundation-sites/scss/foundation.scss";
</style>
