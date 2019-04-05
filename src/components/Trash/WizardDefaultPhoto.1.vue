<template>
  <div class="wizard-default-photo">
    <div class="row photo-buttons">
      <div class="column">
        <label for="photoUpload" class="btn btn-primary expanded">Upload Default Image</label>
        <input type="file" id="photoUpload" class="show-for-sr" @change="uploadDefaultImage($event)">
      </div>
      <div class="width-auto-wide">
        <p><cropbox :src="event.rectangle_image" :crop_id="rectangleId" :crop_height="imageHeight" :crop_width="rectWidth"></cropbox></p>
      </div>
    </div>
  </div>  
  <div class="wizard-default-photo">
    <div class="row photo-buttons">
      <div class="column">
        <label for="squareUpload" class="btn btn-primary expanded">Upload Square Image</label>
        <input type="file" id="squareUpload" class="show-for-sr" @change="uploadSquareImage($event)">
        For best results in iTunes rss, image should have a resolution of 1400x1400 pixels or larger.
      </div>
      <div class="width-auto-narrow">
        <p><cropbox :src="event.square_image" :crop_id="squareId" :crop_height="imageHeight" :crop_width="imageHeight"></cropbox></p>
      </div>
    </div>
  </div>
</template>

<script>
  import Cropbox from '../components/Cropbox';

  import {
    setWizardStepValid,
    uploadFile,
  } from '../core/actions';

  const CURRENT_STEP = 2;

  export default {
    name: 'wizard-default-photo',

    components: {
      Cropbox,
    },

    data() {
      return {
        imageHeight: 200,
        rectWidth: 388,
        squareId: 'square_photo',
        rectangleId: 'rectangle_photo',
      };
    },

    vuex: {
      actions: {
        setWizardStepValid,
        uploadFile,
      },

      getters: {
        event: (state) => state.wizardEvent,
        currentStep: (state) => state.wizardSteps.steps[CURRENT_STEP],
      },
    },

    // This ready() is just for hacking to the Post Options
    // view since the photos aren't hooked up and you shouldn't
    // be able to go to Post Options until a default photo
    // has been selected. Remove once the photo functionality
    // has been implemented
    ready() {
      this.setWizardStepValid(CURRENT_STEP);
    },

    // TODO: Add appropriate validations in here
    // methods: {
    //   checkIfValid() {
    //     if (this.title.length > 3) {
    //       this.setWizardStepValid(this.currentStep);
    //     }
    //   },
    // },

    methods: {
      uploadDefaultImage(e) {
        const inFile = e.target.files[0];
        this.uploadFile('default_image', inFile);
        document.getElementById('photoUpload').value = null;
      },
      uploadSquareImage(e) {
        const inFile = e.target.files[0];
        this.uploadFile('square_image', inFile);
        document.getElementById('squareUpload').value = null;
      },
    },
  };
</script>

<style lang="scss">
  .photo-buttons {
    margin-bottom: 2rem;
  }
  
  .width-auto-narrow {
    width: auto;
    min-width: 200px;
  }  
  
  .width-auto-wide {
    width: auto;
    min-width: 400px;
  }
</style>
