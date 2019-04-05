<template>
  <div class="wizard">
    <div v-if="isWizardSetUp" class="row">
      <div class="column medium-9">
       <!--<wizard-steps></wizard-steps> -->
        <div class="sub-page-header">
          <h2 class="page-title page-title--small">{{ $route.subtitle }}</h2>
        </div>
        <div class="page-main">
          <router-view
            class="view wrapper"
            keep-alive
            transition="app"
            transition-mode="out-in">
          </router-view>
          <wizard-navigation></wizard-navigation>
        </div>
      </div>
      <div class="column medium-3">
        <wizard-preview></wizard-preview>
      </div>
    </div>
  </div>
</template>

<script>
  import WizardSteps from '../components/WizardSteps';
  import WizardPreview from '../components/WizardPreview';
  import WizardNavigation from '../components/WizardNavigation';
  import {
    setupWizard,
    clearWizardData,
  } from '../core/actions';

  export default {
    name: 'wizard-view',

    route: {
      data({ from }) {
        // Only want to set up the wizard when coming from a non-wizard page
        if (from.path.indexOf('/show/') !== 0) {
          this.setupWizard({
            showId: this.showId,
            defaultTime: this.defaultTime,
            parentId: this.parentId,
          });
        }
      },
    },

    vuex: {
      actions: {
        setupWizard,
        clearWizardData,
      },

      getters: {
        path: (state) => state.route.path,
        type: (state) => state.route.query.type,
        // params are strings as they are in the URL
        showId: (state) => state.route.params.showId,
        defaultTime: (state) => state.route.query.defaultTime,
        parentId: (state) => Number(state.route.query.parentId || 0) || null,
        isWizardSetUp: (state) => state.wizardEvent != null,
        event: (state) => state.wizardEvent,
      },
    },

    components: {
      WizardSteps,
      WizardPreview,
      WizardNavigation,
    },
  };
</script>

<style lang="css">
.page-title {
  text-align:center;
}
.steps:before {
    content: "\e602";
    display: block;
    position: absolute;
    left: 44% !important;
    top: calc(50% - 1.125rem);
    width: 91.5%;
    transform: translate(-50%, -50%);
    border: 1px solid #888888;
    z-index: -1;
}
steps {

    width: 1350px !important;
    margin: 0 auto;

}
</style>

<style lang="scss">
  // @import "../styles/variables.scss";
  // @import "../styles/foundation_settings.scss";
  // @import "../../node_modules/foundation-sites/scss/foundation.scss";
  .sub-page-header {
    margin-bottom: 1rem;
  }
</style>
