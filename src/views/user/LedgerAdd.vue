<template>
    <div class="add-page">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="昵称">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
        </el-form>

        <!-- 交易凭证 上传图片 -->
        <!-- <div class="up-img"> -->
            <!-- <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog> -->
            <!-- <input type="file" @change="fileChange()" /> -->
        <!-- </div> -->
        <div class="add-page-button">
            <el-button type="primary" size="mini" @click="save">保存</el-button>
            <el-button type="primary" size="mini" @click="changePage"
                >取消</el-button
            >
        </div>

        <!-- 新增页面
      <div class="add-page-button">
        <el-button type="primary" size="mini" >保存</el-button>
          <el-button type="primary" size="mini">取消</el-button>
      </div> -->
    </div>
</template>

<script>
import { addBillInfo, editBill } from "./ledgerReq.js";

// import { addBillInfo } from "@/network/ledger";

export default {
    data() {
        return {
            ledgerData: {},
            form: {
                nickname: "",
                password: "",
                username: "",
            },
            dialogImageUrl: "",
            dialogVisible: false,
        };
    },
    created() {
        this.form = this.$parent.handleData;
        console.log(this.form);
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        changePage() {
            for (const key in this.$parent.handleData) {
                this.$parent.handleData[key] = "";
            }

            this.$emit("changePageLedger", "Ledger");
        },
        save() {
            if (this.form.id) {
                editBill(this.form).then((res) => {
                    // if (res.success){
                    //请求完切换页面
                    this.changePage();
                    // }
                });
            } else {
                addBillInfo(this.form).then((res) => {
                    // if (res.success){
                    //请求完切换页面
                    this.changePage();
                    // }
                });
            }
        },
        getValue(value) {
            // console.log(value);
            this.form.billTypeName = value;
        },
        fileChange() {
            console.dir(event.target.files[0]);
            let file = event.target.files[0];
            let form = new FormData();
            form.append("file", file);
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