<template>
  <div class="input-file">
      <div @click="inputFile" class="input">
          <span v-if="file == null">点击上传Excel文件</span>
          <span v-else>{{this.file.name}}</span>
      </div>
      <input type="file" v-show='false' ref="import" @change="fileChange" />
  </div>
</template>

<script>
export default {
    data(){
        return {
            file: null
        }
    },
    methods: {
        inputFile(){
            //打开input file的窗口
            this.$refs.import.click();
        },
        // @change  当input的value改变时触发
        fileChange(){
            //获取文件的点击事件并赋值
            this.file = event.target.files[0];
            this.$emit("getFile",this.file);
        }
    }
}
</script>

<style lang="less" scoped>
.input-file{
    .input{
        width: 200px;
        height: 30px;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .input:hover{
        border-color: #409eff;
    }
}
</style>