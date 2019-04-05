<template>
  <div class="steps">
    <div class="row small-up-4 text-center">
      <template v-for="step in steps">
        <div class="column">
          <button class="step-link"
            v-link="{ name: step.slug, activeClass: 'step-link--is-active'}"
            disabled
            >
            <span class="step-number">{{ $index + 1 }}</span>
            {{ step.title }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wizard-steps',

  vuex: {
    getters: {
      steps: (state) => state.wizardSteps.steps,
      currentStep: (state) => state.wizardSteps.currentStep,
      showFirstStep: (state) => state.wizardEvent.id !== 1,
    },
  },
};
</script>

<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .steps {
    margin-bottom: 1rem;
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 50%;
      top: calc(50% - 1.125rem);
      width: 77.5%;
      transform: translate(-50%, -50%);
      border: 1px solid $light-medium-grey;
      z-index: -1;
    }
  }

  .step-link {
    display: inline-block;
    padding: 1rem 0;
    text-decoration: none;
    color: $white;

    &:hover,
    &:focus {
      color: $blue;
    }

    &:disabled {
      color: $white !important;
    }

    &--is-active {
      color: $blue;

      .step-number {
        color: $black;

        &::before {
          padding: 1.5rem;
        }

        &::after {
          padding: 0.75rem;
          visibility: visible;
        }
      }
    }
  }

  .step-number {
    display: block;
    position: relative;
    color: $white;
    margin-bottom: 1.4rem;

    &::before {
      content: "";
      display: block;
      position: absolute;
      padding: 0.75rem;
      background-color: $black;
      border: 2px solid $light-medium-grey;
      color: white;
      border-radius: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      transition: all 250ms;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      padding: 0;
      background-color: $blue;
      border: 2px solid $blue;
      color: white;
      border-radius: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
      transition: all 250ms;
      visibility: hidden;
    }
  }

</style>
