<template>
    <div class="ledger">
        <div class="find-box">
            <ul class="find">
                <li>
                    <p>部门名称:</p>
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option> 
                    </el-select>
                </li>
                <li>
                    <p>台账类型:</p>
                    <el-select v-model="value" placeholder="请选择" size="mini">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <p>用户姓名:</p>
                    <el-input
                        v-model="input"
                        placeholder="请输入内容"
                        size="mini"
                        class="input-right"
                    ></el-input>
                </li>
            </ul>
            <div class="find-button">
                <button class="button-find">搜索</button>
                <button class="button-c-router">重置</button>
            </div>
        </div>

        <div class="data">
            <div class="data-button">
                <div class="add-data data-button-components">
                    <i class="iconfont iconjia"></i>
                    <span @click="changePage">新增</span>
                </div>
                <div class="import-data data-button-components">
                    <i class="iconfont iconimport"></i>
                    <span @click="openImport">导入</span>
                </div>
                <div class="export-data data-button-components">
                    <i class="iconfont icondaochu"></i>
                    <span @click="exportData">导出</span>
                </div>
                <div class="export-data data-button-components">
                    <i class="iconfont icondaochu"></i>
                    <span @click="deleteDatas">批量删除</span>
                </div>
            </div>
            <div class="ledger-data">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    empty-text
                    @selection-change="selection"
                >
                    <el-table-column type="selection" width="55" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="billName"
                        label="台账名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="billTypeName"
                        label="台账类别名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户姓名"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="台账金额"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="userCard"
                        label="用户卡号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="voucherImage"
                        label="交易凭证"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleClick(scope.row)"
                                type="text"
                                size="small"
                                >修改</el-button
                            >
                            <el-button
                                type="text"
                                size="small"
                                @click.native="deleteData(scope.row.id)"
                                @click="deleteChuang(scope.row.id)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <table width="100%">
                    <tr>
                        <th>性别</th>
                        <th>姓名</th>
                        <th>出生年月</th>
                        <th>年龄</th>
                        <th>性别</th>
                    </tr>
                </table> -->
            </div>
            <div class="block">
                <!-- <span class="demonstration">共 {{ this.allPage }} 页</span> -->
                <el-pagination
                    :total="pagination.total"
                    :page-size="pagination.size"
                    :current-page="pagination.page"
                    layout="prev,pager,next,jumper,total,sizes"
                    :page-sizes="[8, 10, 12]"
                    @current-change="pageChange"
                    @size-change="sizeChange"
                    background
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <inputFile @getFile="getFile" ref="inputFile" />

            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="importBill"
                    >确 定</el-button
                >
                <el-button size="mini" @click="dialogVisible = false"
                    >取 消</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import {
// getBillInfo,
//     deleteBillInfo,
//     importBillInfo,
//     exportBillInfo,
// } from "@/network/ledger.js";

import {
    getBillInfo,
    deleteBillInfo,
    importBillInfo,
    exportBillInfo,
    deleteBillList,
} from "./ledgerReq.js";

export default {
    components: {},
    data() {
        return {
            downloadFileName: "台账表",
            dialogVisible: false, //弹窗
            formFile: null, //文件
            currentPage: 1,
            allPage: 1,
            input: "",
            options: [],
            value: "",
            tableData: [],
            pagination: {
                page: 1,
                size: 8,
                total: 100,
            },
            selectArr: [],
        };
    },
    created() {
        this.getBillData();
        // axios.get("/api/bill/findByPage")
    },
    methods: {
        handleClick(data) {
            // console.log(data);
            this.$parent.handleData=data;
            this.changePage();
        },
        pageChange(page) {
            this.pagination.page = page;
            this.getBillData();
        },
        sizeChange(size) {
            this.pagination.size = size;
            this.getBillData();
        },
        getBillData() {
            getBillInfo({
                page: this.pagination.page,
                size: this.pagination.size,
            }).then((res) => {
                if (res.success) {
                    this.pagination.total = res.data.total;
                    this.tableData = res.data.list;
                }
            });
        },
        //换到增加页面
        changePage() {
            this.$emit("changePageAdd", "LedgerAdd");
        },
        deleteData(id) {
            deleteBillInfo(id).then((res) => {});
        },
        getFile(file) {
            let form = new FormData();
            form.append("file", file);
            this.formFile = form;
        },
        deleteChuang(id) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    deleteBillInfo(id).then((res) => {
                        this.getBillData();
                    });
                })
                .catch((o) => {});
        },
        importBill() {
            importBillInfo(this.formFile).then((res) => {                                                                                                                                                                     
                this.dialogVisible = false;
            });
        },
        openImport() {
            setTimeout(() => {
                this.$refs.inputFile.file = null;
            }, 0);
            this.dialogVisible = true;
        },
        exportData() {
            this.$prompt("请输入文件名", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            })
                .then(({ value }) => {
                    this.downloadFileName = value;
                    console.log(this.downloadFileName);
                    exportBillInfo().then((res) => {
                        // window.location.href = urls; // 本窗口打开下载
                        // window.open(urls, "_blank"); // 新开窗口下载
                        console.log(res);

                        let blob = new Blob([res.data], {
                            type: "application/vnd.ms-excel",
                        });
                        let url = window.URL.createObjectURL(blob);
                        let link = document.createElement("a");
                        link.style.display = "none";
                        link.href = url;
                        link.download = this.downloadFileName + ".xlsx";
                        document.body.appendChild(link);
                        link.click();
                    });
                })
                .catch((error) => {});
        },
        deleteDatas() {
            setTimeout(()=>{
                 deleteBillList(this.selectArr).then(() => {
                this.getBillData();
            });
            })
           
        },
        selection(res) {
            console.log(res);
            this.selectArr=[];
            res.forEach((item) => {
                this.selectArr.push(item.id);
            });
        },
    },
};
</script>

<style lang="less" scoped>
.ledger {
    // width: 99.9%;
    .find-box {
        padding: 15px 0;
        background: #fff;
        display: flex;
        align-items: center;
        .find {
            line-height: 25px;
            font-size: 14px;
            color: #666;
            display: flex;
            li {
                display: flex;
                align-items: center;
                p {
                    white-space: nowrap;
                    margin: 0px 5px 0px 12px;
                }
                /deep/ .el-input__inner {
                    height: 24px;
                }
                .input-right {
                    margin-right: 10px;
                }
            }
        }
        .find-button {
            button {
                margin-left: 5px;
                margin-right: 5px;
            }
        }
    }

    .data {
        margin-top: 20px;
        background: #fff;
        overflow: hidden; //防止父子margin冲突
        .block {
            display: flex;
            align-items: center;
            justify-content: center;
            // padding-left: 300px;
            padding-bottom: 15px;
            // width: 100%;
            .demonstration {
                font-size: 13px;
                min-width: 35.5px;
                height: 28px;
                line-height: 28px;

                font-weight: 400;
                color: #606266;
            }
        }
        .data-button {
            display: flex;
            margin-top: 15px;
            margin-left: 15px;
            // padding-top: 15px;
            .add-data {
                color: #fff;
                background-color: #2d8cf0;
                border-color: #2d8cf0;
                // height: 24px;
                // padding: 0 7px;
                // font-size: 14px;
                // border-radius: 3px;
                // display: flex;
                // align-items: center;
                // margin-right: 10px;
            }
            .import-data {
                color: #fff;
                background-color: #19be6b;
                border-color: #19be6b;
            }
            .export-data {
                color: #fff;
                background-color: #f90;
                border-color: #f90;
            }
        }

        .ledger-data {
            // width: 100%;
            // width: 1000px;
            margin: 10px 15px 15px;
        }
    }
}
</style>