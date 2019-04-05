<template>
  <div class="row">
    <div class="column">
      <hr>
    </div>
  </div>
  <div class="row">
    <!--<div class="column">
      <button  na class="btn">Cancel</button>
    </div> -->
    <div class="column text-right">
      <button class="btn btn-default previous"
        v-if="!isFirstStep"
        @click="handlePreviousStep">
        Previous Step
      </button>
      <button class="btn btn-primary next"
        v-if="!isLastStep"
        @click="handleNextStep"
        :disabled="!isValid">
        Next Step
      </button>
       <button class="btn btn-primary next"
        v-if="isLastStep"
        @click="saveEvent(event)"
        :disabled="!isValid">
        Publish
      </button>

        <button class="btn btn-primary next"
        v-if="isLastStep"
        @click="saveEvent(event)"
        :disabled="!isValid">
        Schedule
      </button>

         <button class="btn btn-primary next"
        v-if="isLastStep"
        @click="saveEvent(event)"
        :disabled="!isValid">
        Save As Draft
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

<style lang="css">
.wizard-post-options {
  margin-left:50px;
}
.text-right{
  text-align: center;
  margin-top: 40px;
}
.round-button {
	width:25%;
}
.step-number::before {
    content: "";
    display: block;
    position: absolute;
    padding: 0.75rem;
    background-color:#fff !important;
    border: 2px solid #c9db34;
    color: white;
    border-radius: 100%;
    left: 50%;
    top: 59% !important;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: all 250ms;
}
.round-button-circle {
	width: 100%;
	height:0;
	padding-bottom: 100%;
    border-radius: 50%;
	border:10px solid #cfdcec;
    overflow:hidden;
    
    background: #4679BD; 
    box-shadow: 0 0 3px gray;
}
.round-button-circle:hover {
	background:#30588e;
}
.round-button a {
    display:block;
	float:left;
	width:100%;
	padding-top:50%;
    padding-bottom:50%;
	line-height:1em;
	margin-top:-0.5em;
	text-align:center;
	color:#e2eaf3;
    font-family:Verdana;
    font-size:1.2em;
    font-weight:bold;
    text-decoration:none;
}

.btn.btn-primary.next {
    width: 184px;
    height: 50px;
    border-radius: 25px;
    background-color: #c9db34;
    font-size: 13px;
    color: #395244;
    text-transform:uppercase;
    text-align:center;
}
.btn.btn-default.previous {
    width: 184px;
    height: 50px;
    border-radius: 25px;
    background-color: #cbcecb;
    font-size: 13px;
    text-transform: uppercase;
    text-align: center;
    background-position: 0px;
    box-shadow: 0px; 
    
}
.btn.btn-default.done {
    width: 184px;
    height: 50px;
    border-radius: 25px;
    background-color: #cbcecb;
    shadow-color: rgba(0,0,0,0.1);
    color: #4a4a4a;
    font-size: 13px;
    text-transform: uppercase;
    text-align: center;
}
</style>

<style lang="scss">
  // @import "../styles/variables.scss";
  // @import "../styles/foundation_settings.scss";
  // @import "../../node_modules/foundation-sites/scss/foundation.scss";
</style>
