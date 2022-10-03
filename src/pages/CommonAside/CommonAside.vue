<template>
  <div>
    <el-menu
      default-active="首页"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"
    >
      <h2>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h2>
      <router-link
        v-for="item of noChildren"
        :key="item.path"
        :to="{ name: item.name, path: item.path }"
      >
        <el-menu-item :index="item.label" @click="clickMenu(item)">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-for="p of hasChildren" :key="p.path" :index="p.label">
        <template slot="title">
          <i :class="`el-icon-${p.icon}`"></i>
          <span>{{ p.label }}</span>
        </template>
        <el-menu-item-group v-for="subItem of itemChildren" :key="subItem.path">
          <router-link :to="{ name: subItem.name, path: subItem.path }">
            <el-menu-item :index="subItem.label">
              {{ subItem.label }}
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "CommonAside",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(val){
      console.log(1);
      this.$store.commit('CommonHeader/clickMenu',val)
    }
  },
  computed: {
    ...mapState("CommonAside", ["isCollapse", "menu"]),
    ...mapGetters("CommonAside", ["noChildren", "hasChildren"]),
    itemChildren() {
      return this.$store.state.CommonAside.menu[3].children;
    },
  },
  mounted() {
    // console.log(this.title);
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  background-color: #545c64;
}
.el-menu {
  width: auto;
  height: 100vh;
  border: none;
  overflow: hidden;
  user-select: none;
  h2 {
    color: #fff;
    text-align: center;
    line-height: 60px;
    // padding: 0 45px;
  }
}
</style>