<div id="app">
 <div id="table-wrapper" class="ui container">
   <h2><strong>&lt;Vuetable-2&gt;</strong> with Bootstrap 3</h2>
  <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
    :fields="fields"
    :sort-order="sortOrder"
    :css="css.table"
    pagination-path=""
    :per-page="3"
    @vuetable:pagination-data="onPaginationData"
    @vuetable:loading="onLoading"        
    @vuetable:loaded="onLoaded"
  >
    <template slot="actions" scope="props">
      <div class="table-button-container">
          <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
            <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
          <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
            <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
      </div>
      </template>
    </vuetable>
    <vuetable-pagination ref="pagination"
      :css="css.pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
  </div>
</div>

<script>
 

  export default {
    name: 'settings',

  
  data: {
    fields: [
      { 
        name: 'name', 
        title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
        sortField: 'name'
      }, 
      {
        name: 'email',
        title: 'Email',
        sortField: 'email'
      },
      'birthdate','nickname',
      {
        name: 'gender',
        title: 'Gender',
        sortField: 'gender'
      },
      '__slot:actions'
    ],
    sortOrder: [
      { field: 'name', direction: 'asc' }
    ],
    css: {
      table: {
        tableClass: 'table table-striped table-bordered table-hovered',
        loadingClass: 'loading',
        ascendingIcon: 'glyphicon glyphicon-chevron-up',
        descendingIcon: 'glyphicon glyphicon-chevron-down',
        handleIcon: 'glyphicon glyphicon-menu-hamburger',
      },
      pagination: {
        infoClass: 'pull-left',
        wrapperClass: 'vuetable-pagination pull-right',
        activeClass: 'btn-primary',
        disabledClass: 'disabled',
        pageClass: 'btn btn-border',
        linkClass: 'btn btn-border',
        icons: {
          first: '',
          prev: '',
          next: '',
          last: '',
        },
      }
    }
  },
  computed:{
  /*httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  },*/
 },
 methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    editRow(rowData){
      alert("You clicked edit on"+ JSON.stringify(rowData))
    },
    deleteRow(rowData){
      alert("You clicked delete on"+ JSON.stringify(rowData))
    },
    onLoading() {
      console.log('loading... show your spinner here')
    },
    onLoaded() {
      console.log('loaded! .. hide your spinner here')
    }
  }
})