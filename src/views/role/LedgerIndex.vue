<template>
  <div>
      <component :is="component"  @changePageAdd="changePageAdd" @changePageLedger="changePageLedger"/>
  </div>
</template>

<script>
import Ledger from './Ledger';
import LedgerAdd from './LedgerAdd';
export default {
    components: {
        Ledger,LedgerAdd
    },
    data(){
        return {
            component: "Ledger",
            handleData:{},
        }
    },
    created(){
        // console.log(this.handleData);
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