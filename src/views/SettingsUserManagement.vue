<template>
	<div class="settings-user-management">
    <div class="row">
        <div class="subheading__title small-6">
          <h1 class="subheading__title_text">Settings</h1>
        </div>
        <div class="subheading__new-show small-6">
          <button class="post-button-green float-right" @click="openUserModal(null)">+ Add User</button>
        </div>
    </div>
    <user-modal-with-props :item="userModalData"></user-modal-with-props>
		<div id="left-nav">  
      <ul>
        <li><a href="#">User Management</a></li>
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
			    <tr v-for="user in users" :key="user.id" >
			      <td>{{user.first_name}} {{user.last_name}}</td>
			      <td>TODO: missing in api</td>
			      <td>**********</td>
			      <td><div class="badge secondary">TODO: missing in api</div></td>
			      <td>TODO: missing in api</td>
            <td>
              <div class="small-post-button-green low-drop-shadow" @click="openUserModal(user)">Edit</div>
            </td>
			    </tr>
			  </tbody>
			</table>
		</div>  
		<div style="clear: both">  
		</div>
</template>

<script>
  import UserModal from '../components/UserModal';
  import store from '../core/store';
  import Vue from 'vue';

  Vue.component('user-modal-with-props', {
    extends: UserModal,
    props: ['item'],
  });

  import {
    getUserList,
    // getStationRoles,
  } from '../core/actions';

  export default {
    name: 'SettingsUserManagement',
    store,

    data() {
      return {
        showUserModal: false,
        userModalData: {
          name: '',
          email: '',
          password: '',
          accessLevelValue: '',
          stationValues: [],
        },
        showUserPermissionModal: false,
        userPermissionModalData: {},
      };
    },
    events: {
      saveUserModal() {
        // TODO: implement
        debugger;
        this.showUserModal = false;
      },
      saveUserPermissionModal() {
        // TODO: implement
        this.showUserPermissionModal = false;
      },
    },

    vuex: {
      actions: {
        getUserList,

        //TODO: get access role / access level data from api
        // getStationRoles,
      },

      getters: {
        users: (state) => state.userlist,
      },
    },

    computed: {
    },
    methods: {
      openUserModal(userRowItem) {
        console.log(userRowItem);
        this.userModalData = {
          name: '',
          email: '',
          password: '',
          accessLevelValue: '',
          stationValues: [],
        };  // clear modal data out when opening

        // TODO: these will need mapped/set correctly, leaving stubbed with mock due to api results
        if (userRowItem) {
          this.userModalData.id = userRowItem.id;
          this.userModalData.name = 'Joe Edited'; // userRowItem.name;
          this.userModalData.email = 'testy@testy.net'; // userRowItem.email;
          this.userModalData.accessLevelValue = '1'; // userRowItem.accessLevel;
          this.userModalData.stationValues = [{ stationTitle: 'wphm' }]; // userRowItem.stations;
        }

        this.showUserModal = true;
      },
      openUserPermissionModal() {
        this.showUserPermissionModal = true;
      },
    },
    ready() {
      this.getUserList();
      // this.getStationRoles();
    },
    components: {
      'user-modal': UserModal,
    },
  };
</script>




<style lang="css">
h1 {
	display: block;
	color: #8a8a8a;
	font-size: 36px;
	line-height: 1;
	font-family: 'poppinssemibold' !important;
}
.btn.btn-primary.next { 
	float: right; 
	position: relative; 
	top: -24px; 
	left: 20px;
	font-size: 14px !important;
	}
.btn.btn-primary.next:hover {
	cursor: pointer;
}
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

#customers {}

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
    background-color: #fff;  
	margin: 35px 2px 2px 0px;
    float: left;  
}
#left-nav ul {
  	margin-left: 0;
}
#left-nav li {   
	border-bottom: 1px solid #d8d8d8;
	list-style-type: none;
	padding: 0 !important;
	margin: 0 !important;
	width: 100%;
	display: block;
	
}  

#left-nav li a:link { 
	display: block;
	padding: 12px 0 12px 12px;
	}
#left-nav li a:link,
#left-nav li a:visited { 
	color: #9b9b9b;
		
	margin: 0 !important;	
	width: 100%;
	display: block;
	}
	
#left-nav li a:hover{
  	background-color: #d8d8d8;
  	color: #555555;
  	display: block;

}

#left-nav li a:active {
  	background-color: #d8d8d8;
  	color: #555555;
  	display: block;
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


<style lang="scss">
  @import "../styles/variables.scss";
  @import "../styles/foundation_settings.scss";
  @import "../../node_modules/foundation-sites/scss/foundation.scss";

</style>
