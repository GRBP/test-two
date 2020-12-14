<template>
  <div>财务
    <div class="test" @click="debounce(add,1000)()"></div>
    <!-- <div id="test"  @click="throttle(sub,3000)()">{{sum}}</div> -->
  </div>
</template>

<script>
export default {
data(){
  return {
    a:0,
    sum:0,
  }
},
mounted(){
   debounce(add,1000)
},
methods:{
  add(){
    // this.sum++;
     let test=document.getElementsByClassName('test')[0];
     test.innerHTML=this.sum++;
  },
  sub(){
    this.sum--;
  },
  debounce(func,wait){
    // console.log('xxx');
    let timer=null;
    return function(...args){
      if(timer){
          clearTimeout(timer);
      }
      timer=setTimeout(() =>{
        func.apply(this,args);
      },wait);
      // timer=setTimeout(()=>{func()},wait);
    }
  },
  // throttle(func,wait){
  //   let timer;
  //   return function(){
  //     if(timer) return;
  //     timer=setTimeout(() =>{
  //       func();
  //       timer=null;
  //     },wait);
  //   }
  // }
}
}
</script>

<style lang="less" scoped>
.test{
  background-color: red;
  color: #000;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
#test{
  background-color:#fff;
  color: #000;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>