<template>
<div class="Settingspage">
<button class="btn btn-primary next" style="float: right;position: relative;top: -60px;left: 60px;" 
@click="showModal">Add User </button>
<button class="btn btn-primary next" style="float: right;position: relative; top: -60px;left: 60px;">
User Permission </button>
<h1 style="position: absolute;top: 148px;font-size: 34px;">Settings</h1>  
<div id="left-nav">  
        <ul>
            <li><a href="#" class="active">User Management</a></li>
            <li><a href="#">Lineup Planner</a></li>
            <li><a href="#">Automation Categories</a></li>
            <li><a href="#">Connections</a></li>
        </ul>
</div>  
<div id="content-container" style="position: relative;top: -18px;left: 80px;">  
        <table id="users">
  <thead>
    <tr>
      <th>NAME</th>
      <th>EMAIL</th>
      <th>PASSWORD</th>
      <th>AVAILABLE STATION</th>
      <th>ACCESS LEVEL</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users">
      <td>{{row.NAME}}</td>
      <td>{{row.EMAIL}}</td>
      <td>{{row.PASSWORD}}</td>
      <td>{{row.AVAILABLESTATION}}</td>
      <td>{{row.ACCESSLEVEL}}</td>
    </tr>
  </tbody>
</table>
    </div>  
    <div style="clear: both">  
</div>
</template>
<style lang="css">
table {
  font-family: 'Open Sans', sans-serif;
  width: 825px;
  border-collapse: collapse;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  color: #000;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

#customers {
	
}

#customers td, #customers th {
	border-bottom: 1px solid #ddd;
	padding: 8px;
	color: #555555;
	font-size: 13px;
}

#customers tr:nth-child(even){
	background-color: #fff;
	}

#customers tr:hover {
	background-color: #fff;
	}

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
	white-space: nowrap;
	padding-bottom: 10px;
	margin-top: 10px;
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
      },
      description: {
        get() {
          return this.event.description;
        },
      },
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
      AddUser,
    },
  };
</script>





<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";
  
</style>
