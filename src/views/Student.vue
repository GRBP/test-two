<template>
    <div class="student">
        <div class="find-box">
            <ul class="find">
                <li>
                    <p>姓名:</p>
                    <el-input
                        v-model="input"
                        placeholder="请输入内容"
                        size="mini"
                        class="input-right"
                    ></el-input>
                </li>
                <li>
                    <p>所属部门:</p>
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
                    <p>送戒单位:</p>
                    <el-input
                        v-model="input"
                        placeholder="请输入内容"
                        size="mini"
                        class="input-right"
                    ></el-input>
                </li>
                <li>
                    <p>账号:</p>
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
                    <span>新增</span>
                </div>
                <div class="import-data data-button-components">
                    <i class="iconfont iconimport"></i>
                    <span>导入</span>
                </div>
                <div class="export-data data-button-components">
                    <i class="iconfont icondaochu"></i>
                    <span>导出</span>
                </div>
            </div>
            <div class="student-data">
                <el-table :data="tableData" style="width: 100%" border empty-text>
                    <el-table-column type="selection" width="55" align="center"> </el-table-column>
                    <el-table-column prop="sex" label="性别" align="center"> </el-table-column>
                    <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
                    <el-table-column prop="days" label="出生年月" align="center"> </el-table-column>
                    <el-table-column prop="age" label="年龄" align="center"> </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope"> 
                            <el-button @click="handleClick(scope.row)" type="text" size="small" >修改</el-button >
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <span class="demonstration">共 {{ this.allPage }} 页</span>
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="5"
                    layout="prev, pager, next, jumper"
                    :total="20"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            allPage: 1,
            input: "",
            options: [],
            value: "",
            tableData: [
                // {
                //     name: "吴嘉伟",
                //     age: "23",
                //     days: "1997-11-15",
                //     sex: "男",
                // },
            ],
        };
    },
    methods: {
        handleClick(data) {
            console.log(data);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    },
    created() {},
};
</script>

<style lang="less" scoped>
.student {
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
            justify-content:center;
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

        .student-data {
            // width: 100%;
            // width: 1000px;
            margin: 10px 15px 15px;
        }
    }
}

.data-button-components {
    height: 24px;
    padding: 0 7px;
    font-size: 14px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-right: 10px;
}

</style>