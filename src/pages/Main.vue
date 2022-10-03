<template>
  <div>
    <el-container>
      <el-aside width="auto" height="100vh">
        <CommonAside />
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <!-- <CommonTag /> -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeader from "./CommonHeader/CommonHeader.vue";
import CommonAside from "./CommonAside/CommonAside.vue";
import CommonHome from "./CommonHome/CommonHome.vue";
export default {
  name: "Main",
  components: {
    CommonHeader,
    CommonAside,
    CommonHome,
  },
  beforeCreate(){
    this.$router.push({
      name:'Home'
    })
  }
};
</script>

<style lang="less">
    .el-container:first-child{
        height: 100vh;
        background-color: white;
        .el-aside{
            height: 100%;
            // background-color: orange;
        }
    }
    .el-header{
        width: auto;
        height: auto;
        background-color: #333;
        line-height: 60px;
    }
    
</style>