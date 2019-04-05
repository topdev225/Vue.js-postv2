<template>
  <div>
    <div class="wizard-default-text">
      <div class="row">
        <div class="column">
          <label>Title
            <input type="text" v-model="title" style="width: 517px;height: 54px;border-color: #cbcbcb;border-radius: 4px;border-width: 1px;">
          </label>
           <div class="row align-bottom">
        <div class="column">
          <label>Tags
            <multiselect
              :selected="selectedTags"
              :options="availableTags"
              :multiple="true"
              :hide-selected="true"
              :on-change="updateEventTags"
              placeholder="Type to search"
              label="name"
              key="id">
            </multiselect>
          </label>
        </div>
        <!--<div class="column shrink">
          <button class="btn btn-primary btn--tall" @click="showModal">Manage Tags</button>
        </div> -->
      </div>
        </div>
        <div class="column">
          <label>Description
            <textarea rows="" v-model="description" style="height:270px;border-color: #cbcbcb;border-radius: 4px;border-width: 1px;"></textarea>
          </label>
        </div>
      </div>

     
    </div>
    <manage-tags>
      :tags="availableTags">
    </manage-tags>
  </div>
</template>

<script>
  import AddUser from '../components/AddUser';
  import ManageTags from '../components/ManageTags';
  import Multiselect from 'vue-multiselect';
  import {
    updateEventTitle,
    updateEventDescription,
    updateEventTag,
    updateEventTags,
    setWizardStepValid,
  } from '../core/actions';

  const CURRENT_STEP = 1;

  export default {
    name: 'wizard-default-text',

    data() {
      return {
        selectedTags: [],
        modalIsOpen: false,
      };
    },

    vuex: {
      actions: {
        updateEventTitle,
        updateEventDescription,
        updateEventTag,
        updateEventTags,
        setWizardStepValid,
      },

      getters: {
        availableTags: (state) => state.playlistCategories,
        event: (state) => state.wizardEvent,
        currentStep: (state) => state.wizardSteps.steps[CURRENT_STEP],
        wizardTags: (state) => state.wizardEvent.playlist_categories,
      },
    },

    computed: {
      title: {
        get() {
          return this.event.title;
        },
        set(newVal) {
          this.updateEventTitle(newVal);
        },
      },
      description: {
        get() {
          return this.event.description;
        },
        set(newVal) {
          this.updateEventDescription(newVal);
        },
      },
    },

    watch: {
      wizardTags: {
        handler() {
          console.log('WIZARD TAGS UPDATE!');
          const selected = [];
          for (const tag of this.wizardTags) {
            const matchingTag = this.availableTags.find(v => v.resource_uri === tag);
            if (matchingTag) {
              selected.push(matchingTag);
            }
          }
          this.selectedTags = selected;
        },
        deep: true,
      },
      availableTags: {
        handler() {
          const newSelectedTags = [];
          for (const tag of this.selectedTags) {
            const matchingTag = this.availableTags.find(v => v.id === tag.id);
            if (matchingTag) {
              newSelectedTags.push(matchingTag);
            }
          }
          this.selectedTags = newSelectedTags.slice();
        },
      },
      title() {
        this.checkIfValid();
      },
    },

    // route: {
    //   data() {
    //     this.fetchTagsData();
    //   },
    // },

    ready() {
      const selected = [];
      for (const tag of this.wizardTags) {
        const matchingTag = this.availableTags.find(v => v.resource_uri === tag);
        if (matchingTag) {
          selected.push(matchingTag);
        }
      }
      this.selectedTags = selected;
      setTimeout(() => this.checkIfValid(), 1);
    },

    methods: {
      showModal() {
        this.modalIsOpen = true;
      },
      checkIfValid() {
        if (this.title.length > 3) {
          this.setWizardStepValid(CURRENT_STEP);
        }
      },
    },

    components: {
      ManageTags,
      AddUser,
      Multiselect,
    },
  };
</script>

<style lang="css">
.wizard-default-text {

    border: 1px solid #daddda;
    padding: 20px;
    width: 1109px;
    height: 385px;
    border-radius: 4px;
    background-color: #fbfbfb;

}

.btn.btn--marginRight {
     width: 184px;
    height: 50px;
    float:left;
    shadowColor: 'rgba(0, 0, 0, 0.1)';
    shadowOffset: { width: 3; height: 0; };
    shadow-radius: 4px;
    border-radius: 25px;
    text-align:center !important;
}

</style>



<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

  .multiselect__tags {
    padding: 0.5rem rem-calc(40) 0.375rem 0.5rem !important;
  }

  .multiselect__tag {
    margin-bottom: 0.125rem !important;
    background: $light-medium-blue !important;
  }

  .multiselect__tag-icon {

    &::after {
      color: $off-white !important;
    }

    &:hover,
    &:focus {
      background: $medium-blue !important;

      &::after {
        color: $white !important;
      }
    }
  }

  .multiselect__input {
    margin-bottom: 0.125rem !important;
    height: rem-calc(22);
    box-shadow: none;

    &:focus {
      outline: none;
      box-shadow: none;
      border: 0;
    }
  }

  .multiselect__option--highlight {
    background: $light-medium-blue !important;
  }
</style>
