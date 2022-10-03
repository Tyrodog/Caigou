<template>
  <div>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h3 class="login_title">系统登陆</h3>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="login_submit">
        <el-button 
        type="primary"
        class="login_submit"
        @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getMenu} from '../../assets/api/data'
export default {
  name: "Login",
  data() {
    return {
      form: {

      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({data})=>{
        console.log(data,'我是服务器返回的登录数据嗷');
        if(data.code === 20000){
            //  这里要想办法调用服务器传过来的路由数据存到数据仓库 而且得存到本地或者session cookie中
            // 要按照自己思路修改 url对应的路径 
            this.$store.commit('CommonAside/clearMenu',data.data.menu)
            this.$store.commit('CommonAside/setMenu',data.data.menu)
            this.$store.commit('Users/setToken',data.data.token)
            this.$store.commit('CommonAside/addMenu',this.$router)
            this.$router.push({name: 'Home'})
            console.log(this.$router,'this.$router');
        } else{
          this.$message.warning(data.message)
        }
      })
      
    },
  },
};
</script>

<style lang="less" scoped>
/* .text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
} */

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit {
  margin: 10px auto 0px auto;
}
</style>