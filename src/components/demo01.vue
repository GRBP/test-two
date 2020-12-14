<template>
  <div>
      <div>{{value}}</div>
      <button @click="change">xxasda</button>
  </div>
</template>

<script>
export default {
    props: {
        value: ''
    },
    methods: {
        change(){
            
            this.$emit('input',this.value + 1);
        }
    }
}
</script>

<style>

</style>