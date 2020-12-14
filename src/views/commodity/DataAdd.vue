<template>
    <div class="add-page">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商品名称">
                <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品单价">
                <el-input v-model="form.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品类别名称">
                <!-- <el-input v-model="form.pid"></el-input> -->
                <el-cascader
                    :props="{ value: 'id', label: 'name', checkStrictly: true }"
                    :options="options"
                    v-model="form.goodsTypeId"
                    @change="handleChange"
                    ref="el-cascader"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="商品单位">
                <el-input v-model="form.goodsUnit"></el-input>
            </el-form-item>
            <!-- <el-form-item label="图片">
                <el-input v-model="form.goodsName"></el-input>
            </el-form-item> -->
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
import { addDict,editDict } from "./request.js";

import { getDictInfo } from "../dictionary/ledgerReq";

// import Bus from '../../bus';

export default {
    data() {
        return {
            form: {
                gmtCreate: "",
                gmtModified: "",
                goodsImage: "",
                goodsLimit: 0,
                goodsName: "",
                goodsPrice: 0,
                goodsTypeId: "",
                goodsTypeName: "",
                goodsUnit: "",
                id: "",
            },
            options: [],
        };
    },
    created() {
        this.getDictData();
        // console.log(this.options);
        this.form = this.$parent.handleData;
        // console.log(this.form);
    },
    methods: {
        handleChange(value) {
            //获取label 也就是商品类型名字
            let label=this.$refs['el-cascader'].getCheckedNodes()[0].pathLabels
            this.form.goodsTypeName=label[label.length-1];
            //获取value 也就是商品类型id
            this.form.goodsTypeId = value[value.length-1];

            console.log(value[0],this.form.goodsTypeName);
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
        getDictData() {
            getDictInfo({ id: 0 }).then((res) => {
                if (res.success) {
                    this.options = JSON.parse(JSON.stringify(res.data));
                }
            });
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