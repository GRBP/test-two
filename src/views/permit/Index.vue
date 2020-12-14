<template>
  <div>
      <component :is="component"  @changePageAdd="changePageAdd" @changePageLedger="changePageLedger"/>
  </div>
</template>

<script>
import Dictionary from './Dictionary';
import DataAdd from './DataAdd';
export default {
    components: {
        Dictionary,DataAdd
    },
    data(){
        return {
            component: "Dictionary",
            treeList: [],
            handleData:{},
        }
    },
    created(){
    },
    methods:{
        changePageAdd(name){
            this.component=name;
        },
        changePageLedger(name){
            this.component=name;
        },

        
    }
}
</script>

<style>

</style>