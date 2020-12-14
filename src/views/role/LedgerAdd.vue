<template>
    <div class="add-page">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="角色名称">
                <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色说明">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>

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
            form: {
                	remark: "",
	                roleName: "",
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