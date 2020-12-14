<template>
  <div>
      <Demo01 v-model="value"  />
      <!-- <div>{{value}}</div> -->
  </div>
</template>

<script>
import Demo01 from './demo01'
export default {
    components: {
        Demo01
    },
    data(){
        return {
            value: 'xxf'
        }
    },
    methods: {
        input(val){
            this.value = val;
        }
    }
}
</script>

<style>

</style>