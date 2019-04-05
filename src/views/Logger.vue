<template>
  <div class="logger">
    <p>Logger - Coming Soon</p>

    <!-- <draggable v-model="exampleList">
      <div v-for="text in exampleList" :key="text"></div>
    </draggable> -->

    <!-- <div class="dragArea" >
        <div v-dragable-for="element in exampleList">
            <p>{{element}}</p>
        </div>
     </div> -->

     <!-- <div v-dragable-for="element in exampleList" options='{"group":"people"}'>
      <p>{{element.name}}</p>
    </div> -->

    <!-- <div class="drag">
    <h2>Draggable</h2>
    <draggable :list="exampleList" class="dragArea" :options="{handle:'.draggableElement'}">
      <div class="draggable" v-for="element in exampleList">
        <div class="element .draggableElement">
          {{element}}
        </div>
      </div>
    </draggable>
   </div> -->

   <!-- <div id="sortable1" class="connectedSortable">
     <div v-for="element in exampleList">{{element}}</div>
   </div>
   <div id="sortable2" class="connectedSortable">
     <div v-for="element in exampleList">{{element}}</div>
   </div> -->

    <!-- <div class="normal">
      <h2>Normal v-for</h2>
      <div class="dragArea">
        <div v-for="element in exampleList">{{element}}</div>
      </div>
    </div> -->

    <!-- <div class="drag">
        <h2>List 1 v-dragable-for</h2>
        <div class="dragArea" >
            <div v-dragable-for="element in data.list1" options='{"group":"people"}'>
                <p>{{element.name}}</p>
            </div>
         </div>

        <h2>List 2 v-dragable-for</h2>
        <div class="dragArea">
            <div v-dragable-for="element in data.list2" options='{"group":"people"}'>{{element.name}}</div>
         </div>
     </div>

    <div class="normal">
        <h2>List 1 v-for</h2>
        <div>
            <div v-for="element in data.list1">{{element.name}}</div>
         </div>

        <h2>List 2 v-for</h2>
        <div>
            <div v-for="element in data.list2">{{element.name}}</div>
        </div>
    </div> -->
  </div>
</template>

<script>

  // import Vue from 'vue';
  // import VueDraggable from 'vuedraggable';
  // Vue.component('draggable', VueDraggable);

  // import Vue from 'vue';
  // import Vue from 'vue';
  import store from '../core/store';

  // // import * as Sortable from 'sortablejs';
  // import VueDraggable from 'vuedraggable';
  // // Vue.use(VueDraggable);
  //
  // Vue.component('draggable', VueDraggable);

  export default {
    name: 'Logger',

    store,

    components: {
      // Sortable,
      // VueDraggable,
    },

    vuex: {
      actions: {
      },

      getters: {
        exampleList: (state) => state.exampleList,
      },
    },
    // data: {
    // },
    // data: {
    //   list1: [
    //     { name: 'John' },
    //     { name: 'Joao' },
    //     { name: 'Jean' },
    //   ],
    //   list2: [
    //     { name: 'Juan' },
    //     { name: 'Edgard' },
    //     { name: 'Johnson' },
    //   ],
    // },
    computed: {

    },
    methods: {
      // initializeSortable: function() {
      //   document.getElementsByClassName('connectedSortable').sortable({
      //     // $('#sortable1, #sortable2').sortable({
      //     connectWith: '.connectedSortable',
      //   }).disableSelection();
      // },
    },

    created() {
      // // document.getElementsByClassName('connectedSortable').sortable({
      // // $('#sortable1, #sortable2').sortable({
      // document.getElementById.sortable({
      //   // $('#sortable1, #sortable2').sortable({
      //   // connectWith: '.connectedSortable',
      // }).disableSelection();
    },

    watch: {
      // list1: function watchList1() {
      //   console.log('Collection updated!');
      // },
    },
  };
</script>

<style lang="scss">
@import "../styles/foundation_settings.scss";
@import "../../node_modules/foundation-sites/scss/foundation.scss";
@import "../styles/foundation_modules.scss";

@import "../styles/variables.scss";
@import "../styles/global.scss";

body {

  p {
    color: $medium-grey;
  }

  .normal {
    background-color: grey;
  }
  .drag {
    background-color: green;
  }
  .dragArea{
    min-height: 10px;
  }
}
</style>
