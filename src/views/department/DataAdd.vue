<template>
    <div class="add-page">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="部门名称">
                <el-input v-model="form.deptName"></el-input>
            </el-form-item>

             <el-form-item label="是否有效">
                <el-select v-model="form.enable" placeholder="请选择">
                    <el-option label="有" :value="true"></el-option>
                    <el-option label="无" :value="false"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="部门父ID">
                <!-- <el-input v-model="form.pid"></el-input> -->
                <el-cascader
                    :props="{ value: 'id', label: 'deptName', checkStrictly: true }"
                    :options="options"
                    v-model="form.pid"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="部门管理人姓名">
                <el-input v-model="form.managerName"></el-input>
            </el-form-item>
            <el-form-item label="部门座机号码">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
        </el-form>

        <div class="add-page-button">
            <el-button type="primary" size="mini" @click="save">保存</el-button>
            <el-button type="primary" size="mini" @click="changePage"
                >取消</el-button
            >
        </div>
    </div>
</template>

<script>
import { addDict, editDict } from "./ledgerReq.js";

export default {
    data() {
        return {
            form: {
                    deptName: "",
                    enable:"",
                    managerName: "",
                    phone: "",
                    pid: "0",
            },
            options: [],
        };
    },
    created() {
        //级联框数据
        this.options = this.$parent.treeList;
        // console.log(this.options);
        //修改对象的数据
        if(this.$parent.handleData.pid){
             this.form = this.$parent.handleData;
        }
        // console.log(this.form);
        //根据修改点击的id找对象
        this.findBanData(this.options,this.form.id,false);
    },
    methods: {
        findBanData(treeList,banId,flag){
            for (let item of treeList) {
                if(flag){
                    item.disabled = true;
                }

                if(item.id==banId){
                    item.disabled = true;
                    flag = true;
                }else{
                    flag = false;
                }
                if(item.children){
                    this.findBanData(item.children,banId,flag)
                }
            }
        },

        handleChange(value) {
            // if(this.form.id){

            //     for (const k in value) {
            //         if(value[k]==this.form.id){
            //             // this.$parent.handleData.deptName="";
            //             alert('不允许选择本部或者本部的分部');
            //             this.$router.go(0);
            //         }
            //     }
            //     // console.log(this.form.id);
            //     // console.log(value);
            // }
            
            this.form.pid = value[value.length-1];
        },
        changePage() {
            for (const key in this.$parent.handleData) {
                this.$parent.handleData[key] = "";
            }
    
            this.$emit("changePageLedger", "Dictionary");
        },
        save() {
            if (this.form.id) {
                editDict(this.form).then((res) => {
                    this.changePage();
                });
            } else {
                addDict(this.form).then((res) => {
                    this.changePage();
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.add-page {
    background-color: #fff;
    border-radius: 5px;
    // margin: 20px 100px;
    padding: 30px 0;
    // box-shadow: aquamarine;
    display: flex;
    flex-direction: column;
    // align-content:space-between;
    align-items: center;
    .add-page-button {
        margin-top: 20px;
    }
}
</style>