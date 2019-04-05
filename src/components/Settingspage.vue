<template>
<div class="Settingspage">
<button class="btn btn-primary next" style="float: right;position: relative;top: -60px;left: 60px;" @click="showModal">Add User </button>
<button class="btn btn-primary next" style="float: right;position: relative; top: -60px;left: 60px;">User Permission </button>
<h1 style="position: absolute;top: 148px;font-size: 34px;">Settings</h1>  
<div id="left-nav">  
        <ul>
            <li class="active"><a href="#">User Management</a></li>
            <li><a href="#">Lineup Planner</a></li>
            <li><a href="#">Automation Categories</a></li>
            <li><a href="#">Connections</a></li>
        </ul>
</div>  
<div id="content-container" style="position: relative;top: -18px;left: 80px;">  
        <table id="customers" style="width:825px;">
  <tr>
    <th>NAME</th>
    <th>EMAIL</th>
    <th>PASSWORD</th>
        <th>AVAILABLE STATION</th>
    <th>ACCESS LEVEL</th>

  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Anders@gmail.com</td>
    <td>.........</td>
    <td>station1</td>
    <td>user</td>
            <td><button class="edit-user">EDIT</button></td>          

  </tr>
  <tr>
     <td>Alfreds Futterkiste</td>
    <td>Anders@gmail.com</td>
    <td>.........</td>
    <td>station1</td>
    <td>user</td>
            <td><button class="edit-user">EDIT</button></td>          

  </tr>
  <tr>
     <td>Alfreds Futterkiste</td>
    <td>Anders@gmail.com</td>
    <td>.........</td>
    <td>station1</td>
    <td>user</td>
  </tr>
  
</table>
    </div>  
    <div style="clear: both">  
</div>
</template>
<style lang="css">
#customers {
 
}

#customers td, #customers th {
 border-bottom: 1px solid #ddd;
padding: 8px;
color: #555555;
font-size: 13px;
}

#customers tr:nth-child(even){background-color: #fff;}

#customers tr:hover {background-color: #fff;}

#customers th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	color: #555555;
	font-size: 13px;
}

#left-nav {  
    width: 214px;  
    height: 185px;  
    background-color:#fff;  
	margin: 35px 2px 2px 0px;
    float: left;  
}
#left-nav ul {
  margin-left:0;
}
#left-nav li {  
    color: #9b9b9b;
	border-bottom: 1px solid #d8d8d8;
	list-style-type: none;
	padding-bottom: 10px;
	margin-top: 10px;
	white-space: nowrap;
}  

#left-nav li a:link {
	color: #9b9b9b;
}

#left-nav li a:hover {
	color: #555555;
	width: 214px;
	height: 50px; 
}
#left-nav li.active {

	display: block; 
	 
	background-image: url("../assets/right_arrow.png"); 
	background-size: contain;
	background-repeat: no-repeat; 
	background-position: top left;
	padding-left: 1em; 

	}

div#settings{
    height:600px;
    width: 250px;
    background-color: #505f94;
}
.child{
        display:block;
        color:#9b9b9b;
    }
    #work:hover+.child{
        display:block;
        color:#9b9b9b;
    }

@font-face {
    font-family:FontAwesome;
    src:url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.eot?#iefix) format('eot'), url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.woff) format('woff'), url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.ttf) format('truetype'), url(https://netdna.bootstrapcdn.com/font-awesome/2.0/font//fontawesome-webfont.svg#FontAwesome) format('svg');
    font-weight:400;
    font-style:normal;
}
@font-face {
    font-family:'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans'), local('OpenSans'), url(http://themes.googleusercontent.com/static/fonts/opensans/v7/cJZKeOuBrn4kERxqtaUH3T8E0i7KZn-EPnyo3HZu7kw.woff) format('woff');
}

.has-dropdown {
    
}

right-content{
  width:825px;
  
}

</style>
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
