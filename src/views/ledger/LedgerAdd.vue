<template>
    <div class="add-page">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="台账金额">
                <el-input v-model="form.amount"></el-input>
            </el-form-item>
            <el-form-item label="台账详情">
                <el-input v-model="form.billDetail"></el-input>
            </el-form-item>
            <el-form-item label="台账名称">
                <el-input v-model="form.billName"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="台账类别ID">
                <el-select
                    v-model="form.billTypeId"
                    placeholder="请选择活动区域"
                >
                    <el-option
                        v-for="item in billTypeList"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                        @click.native="getValue(item.value)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户卡号">
                <el-select v-model="form.userCard" placeholder="请选择活动区域">
                    <el-option label="用户卡号一" value="1"></el-option>
                    <el-option label="用户卡号二" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户ID">
                <el-select v-model="form.userId" placeholder="请选择活动区域">
                    <el-option label="用户ID一" value="1"></el-option>
                    <el-option label="用户ID二" value="2"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <!-- 交易凭证 上传图片 -->
        <div class="up-img">
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
            <input type="file" @change="fileChange()" />
        </div>
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
            billTypeList: [
                {
                    value: 0,
                    label: "选项一",
                },
                {
                    value: 1,
                    label: "选项二",
                },
                {
                    value: 2,
                    label: "选项三",
                },
            ],
            ledgerData: {},
            form: {
                amount: "",
                billDetail: "",
                billName: "",
                billTypeId: "",
                billTypeName: "",
                userId: "",
                userCard: "",
                id: null,
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