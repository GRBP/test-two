<template>
    <div class="ledger">

        <div class="data">
            <div class="data-button">
                <div class="add-data data-button-components">
                    <i class="iconfont iconjia"></i>
                    <span @click="changePage">新增</span>
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
                    row-key="id"
                >
                    <el-table-column type="selection" width="55" align="center"> </el-table-column>
                    <el-table-column prop="name" label="字典名称" align="center" > </el-table-column>
                    <el-table-column prop="remark" label="备注" align="center" ></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                @click="editClick(scope.row)"
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
            </div>
        </div>

    </div>
</template>

<script>

import {
    getDictInfo,
    deleteDict,
    importBillInfo,
    exportBillInfo,
    deleteBillList,
} from "./ledgerReq.js";

// import Bus from '../../bus';

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
                size: 10,
                total: 100,
            },
            selectArr: [],
        };
    },
    created() {
        this.getDictData();
    },
    methods: {
        editClick(data) {
            //修改数据
            // console.log(data);
            this.$parent.handleData=data;
            this.changePage();
        },
        pageChange(page) {
            this.pagination.page = page;
            this.getDictData();
        },
        sizeChange(size) {
            this.pagination.size = size;
            this.getDictData();
        },
        getDictData() {
            getDictInfo({id:0}).then((res) => {
                if (res.success) {
                    this.tableData = res.data;
                    this.$parent.treeList = JSON.parse(JSON.stringify(this.tableData));
                }
            });
        },
        changePage() {
            this.$emit("changePageAdd", "DataAdd");
        },
        deleteData(id) {
            deleteDict(id).then((res) => {});
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
                    deleteDict(id).then((res) => {
                        this.getDictData();
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
                    // console.log(this.downloadFileName);
                    exportBillInfo().then((res) => {
                        // window.location.href = urls; // 本窗口打开下载
                        // window.open(urls, "_blank"); // 新开窗口下载
                        // console.log(res);

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
                this.getDictData();
            });
            })
           
        },
        selection(res) {
            // console.log(res);
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
                background-color: red;
                border-color:red;
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