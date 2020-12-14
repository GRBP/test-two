<template>
    <div class="home">
        <div class="sidebar-left" :class="{ active: isShow }">
            <div class="left-top">
                <img src="@/assets/logo.png" alt="" />
                管理系统
            </div>
            <sidebar :siderbarList="siderbarList"></sidebar>
        </div>
        <div class="right">
            <div class="right-top">
                <i class="el-icon-s-fold" @click="sidebarSwitch"></i>
                <div class="user">
                    <i class="el-icon-s-fold"></i>
                    <img src="@/assets/img/猫.jpg" alt="" />
                    <span>管理员</span>
                    <i class="el-icon-s-fold"></i>
                </div>
            </div>
            <div class="right-center">
                <div class="tag-box">
                    <div
                        v-for="(tag,index) in tags"
                        :key="tag.path"
                        class="tag"
                       
                        :class="{ 'tag-active': isTagShow(tag.path) }"
                    >
                        <span  @click="tagClick(tag.path)">{{ tag.name }}</span>
                        <i class="icon iconfont iconguanbi ml5" @click="closeThisTag(tag.path,index)"></i>
                    </div>
                </div>
                <div class="tag-control">
                    <i class="icon iconfont iconshuaxin"></i>
                    <!-- <div>
                        <i
                            class="icon iconfont iconcaidan tag-caidan"
                            @click="openCaidan"
                        >
                        </i>
                        <ul v-show="caidanShow">
                            <li @click="closeAllTag">关闭所有标签</li>
                            <li @click="closeOtherTag">关闭其他标签</li>
                        </ul>
                    </div> -->
                    <el-dropdown placement="top" trigger="click">
                        <i class="iconfont iconcaidan pointer"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="closeAllTag"
                                >关闭所有标签</el-dropdown-item
                            >
                            <el-dropdown-item @click.native="closeOtherTag"
                                >关闭其他标签</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="right-bottom">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import Sidebar from "@/components/Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            siderbarList: [], //获取vuex的侧边栏信息数组传递给侧边栏组件
            isShow: false, //是否收起侧边栏
            caidanShow: false,
            // isTagShow:false,
            tags: [
                // { name: '标签一', type: '' },
                // { name: '标签二', type: 'success' },
            ],
        };
    },
    created() {
        this.siderbarList = this.$store.state.menuList;
    },
    watch: {
        $route: {
            immediate: true, // immediate选项可以开启首次赋值监听
            handler(to) {
                // console.log(to);
                for (let i = 0; i < this.tags.length; i++) {
                    if (this.tags[i].path == to.path) {
                        return;
                    }
                }

                if (this.tags.length >= 5) {
                    this.tags.splice(0, 1);
                }

                this.tags.push({
                    name: to.meta.title,
                    path: to.path,
                });
            },
        },
    },
    methods: {
        sidebarSwitch() {
            this.isShow = !this.isShow;
        },
        openCaidan() {
            this.caidanShow = !this.caidanShow;
        },
        tagClick(path) {
            if (path != this.$route.path) {
                this.$router.push(path);
            }
        },
        isTagShow(path) {
            return this.$route.path === path;
        },
        closeAllTag() {
            this.tags = [
                {
                    name: "学生",
                    path: "/student",
                },
            ];
            if (this.$route.path == "/student") return;
            this.$router.push("student");
        },
        closeOtherTag() {
            this.tags = [
                {
                    name: this.$route.meta.title,
                    path: this.$route.path,
                },
            ];
        },
        closeThisTag(path,index){
            console.log(path,index);
            if(this.tags.length==1){
                this.closeAllTag();
            }else{
                if(this.$route.path==path){
                    console.log("yyyyyyyyy");
                    this.tags.splice(index, 1);
                    this.$router.push(this.tags[0].path);
                }else{
                     this.tags.splice(index, 1);
                }
            }
        }
    },
};
</script>

<style  scoped lang="less">
.home {
    display: flex;
    // justify-content: space-between;
}
.right{
    width: calc(100% - 300px);
    flex: 1;
}
.sidebar-left {
    flex-shrink: 0;
    margin-right: 5px;
    background-color: #242730;
    box-shadow: 5px 0 5px #888888;
    box-sizing: border-box;
    height: 100vh;
    width: 240px;

    overflow: hidden;
    transition: all 0.5s;
}
.left-top {
    width: 240px;
    height: 100px;
    background-color: #242730;
    color: #ffffff;
    font-size: 20px;
    font-weight: 150;
    line-height: 100px;
}
.left-top img {
    width: 100px;
    height: 100px;
}
.active {
    width: 60px;
}

.right-top {
    height: 50px;
    background-color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: space-between;
}
.right-top i {
    font-size: 28px;
    line-height: 50px;
    padding-left: 10px;
}

.user {
    display: flex;
    line-height: 50px;

    align-items: center; /*flex垂直居中*/
    font-size: 14px;

    margin-right: 10px;
}
.user img {
    border-radius: 20px; /* 圆形边缘弧度 */
    width: 40px;
    height: 40px; 

    margin-left: 10px;
    margin-right: 10px;
}

.tag {
    height: 24px;
    font-size: 12px;
    padding: 0 10px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 90px;
    cursor: pointer;
}
.tag-active {
    background-color: #409eff;
    color: #ffffff;
}

.right-center {
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 3px;
    border: 0;
    border-top: 2px solid #b1adad;
    .tag-box {
        display: flex;
        margin: 0 5px;
        .tag {
            margin: 3px;
        }
    }
    .tag-control {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fff;
        height: 34px;
        width: 120px;
        font-size: 22px;

        margin-right: 40px;
        // .tag-caidan {
        //     position: relative;
        //     ul {
        //         position: absolute;
        //         top: 18px;
        //         right: -55px;

        //         font-size: 14px;
        //         width: 115px;

        //         text-align: center;

        //         border: 1px solid #e6e6e6;
        //         border-radius: 6px;
        //         background-color: #fff;

        //         li {
        //             padding: 10px 7px;
        //         }
        //     }
        // }
    }

    
}

.right-bottom{
        padding: 10px 10px;
    }

</style>
