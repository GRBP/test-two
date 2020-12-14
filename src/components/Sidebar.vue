<template>
  <div class="sidebar">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <div v-for="(item, index) in menuList" :key="index">
        <div v-if="item.children">
          <el-submenu :title="item.title" :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span style="padding-left: 7px">{{ item.title }}</span>
            </template>
            <div v-for="(item2, index) in item.children" :key="index">
              <div v-if="item2.children && item2.children.length > 0"></div>
              <div v-else>
                <el-menu-item :index="item2.url"
                  >{{ item2.title }}
                </el-menu-item>
              </div>
            </div>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="item.url">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    siderbarList: {
      type: Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      menuList: [],
      // isCollapse: false
    };
  },

  created() {
    //从Vuex中拿state的数据
    this.menuList = this.$store.state.menuList;
  },
  components: {},
  methods: {},
};
</script>

<style scoped>
.sidebar {
  width: 100%;
}
.el-menu {
  border-right: 0 !important;
}

</style>