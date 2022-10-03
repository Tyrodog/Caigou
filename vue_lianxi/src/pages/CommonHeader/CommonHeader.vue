<template>
  <header>
    <div class="l-countent">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          class="ziti"
          v-for="item of tabsList"
          :key="item.path"
          :to="{
            path: item.path,
            name:item.name
          }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  methods: {
    handleMenu() {
      this.$store.commit("CommonAside/handleMenu");
    },
    // 退出登录
    logOut(){
      this.$store.commit('Users/clearToken')
      this.$store.commit('CommonAside/clearMenu')
      this.$store.commit('CommonHeader/onlyMenu')
      this.$router.push({name:'Login'})
    }
  },
  computed: {
    // ...mapMutations('CommonAside',['handleMenu']),
    ...mapState("CommonHeader", ["userImg", "tabsList"]),
  },
  
};
</script>

<style lang="less" scoped>
.el-icon-arrow-down {
  font-size: 12px;
}
img {
  vertical-align: middle;
}
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .el-breadcrumb {
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
  }
  .ziti /deep/ .el-breadcrumb__inner {
    color: white;
    // cursor: pointer;
  }
  .ziti /deep/ .el-breadcrumb__inner:hover {
    color: #ccc;
    cursor: pointer;
  }
}
</style>