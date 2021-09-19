<!--
 * @Author: your name
 * @Date: 2021-08-27 14:56:46
 * @LastEditTime: 2021-09-18 14:36:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: /tomexam/components/header.vue
-->
<template>
  <section class="header">
    <section class="header-content">
      <a class="logo" href="/">
        <img src="/image/logos.png" width="100%" />
      </a>
      <section class="menu-nav">
        <section class="menu-nav-l">
          <a
            v-for="(item, index) in nav"
            :key="index"
            :href="item.path"
            :class="$route.path == item.path ? 'active' : ''"
            >{{ item.name }}</a
          >
        </section>
        <section class="menu-nav-r">
          <el-input
            placeholder="搜索您感兴趣的题库"
            v-model="name"
            class="input-select"
            @keyup.enter.native="handleSearch"
          >
            <el-button
              slot="append"
              class="search-but"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </section>
      </section>
      <section class="login">
        <template v-if="userinfo && userinfo.userInfo">
          {{ userinfo.userInfo.username }}
          <a
            href="javascript:;"
            @click="handleLoginOut"
            style="margin-left: 10px;"
            >退出
          </a>
          <a
            :href="`http://47.96.139.185?token=${userinfo.token}`"
            target="_black"
            style="margin-left: 10px;"
            >登陆后台
          </a>
        </template>
        <template v-else>
          <a href="javascript:;" @click="handleLogin">登陆 </a>
          <span>|</span>
          <a href="javascript:;" @click="handleRegister"> 注册</a>
        </template>
      </section>
    </section>
    <Login
      v-if="isLogin"
      :isLogin="isLogin"
      @close="handleLoginClose"
      @forget="handleForgetPass"
    />
    <Register
      v-if="isRegister"
      :isRegister="isRegister"
      @close="handleRegisterClose"
    />
    <Retrieve
      v-if="isRetriver"
      :isRetriver="isRetriver"
      @close="handleRetriverClose"
    />
  </section>
</template>

<script>
import { url } from "../util";
export default {
  data() {
    return {
      isLogin: false, // 登陆
      isRegister: false, // 注册
      isRetriver: false, // 忘记密码
      name: "",
      userinfo: null,
      nav: [
        { name: "首页", path: "/" },
        { name: "题库", path: "/question" },
        { name: "帮助", path: "/help" },
        { name: "联系我们", path: "/contact" }
      ]
    };
  },
  provide() {
    return {
      app: this
    };
  },
  methods: {
    // 搜索
    handleSearch() {
      if (this.name == "") {
        this.$message.error("请输入题库名称");
        return false;
      }
      location.href = `/question?name=${this.name}`;
      // this.$router.push(`/question?name=${this.name}`)
    },
    // 忘记密码
    handleForgetPass() {
      this.isLogin = false;
      this.isRetriver = true;
    },
    handleLogin() {
      this.isLogin = true;
    },
    handleRegister() {
      this.isRegister = true;
    },
    handleRetriverClose() {
      this.isRetriver = false;
    },
    handleLoginClose() {
      this.isLogin = false;
      this.login();
    },
    handleRegisterClose() {
      this.isRegister = false;
    },
    login() {
      const userinfo = sessionStorage.getItem("userinfo");
      const user = JSON.parse(userinfo);
      this.userinfo = user;
      console.log(user);
    },
    async handleLoginOut() {
      sessionStorage.removeItem("userinfo");
      this.userinfo = null;
      // const data = await this.$axios.post(url.loginOut, {});
    }
  },
  mounted() {
    this.login();
  },
  created() {
    this.name = this.$route.query.name;
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  background: #fff;
  .header-content {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .logo {
    position: absolute;
    left: 0;
    top: 6px;
    z-index: 1;
  }
  .login {
    position: absolute;
    right: 0;
    z-index: 1;
    top: 14px;
    font-size: 14px;
    a {
      color: #000;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }
    span {
      display: inline-block;
      margin: 0 6px;
    }
  }
  .menu-nav {
    text-align: center;
    display: flex;
    margin-left: 168px;
    .menu-nav-l {
      flex: 0.6;
      text-align: right;
      margin-right: 40px;
      margin-top: 5px;
      a {
        color: #000;
        font-size: 18px;
        font-weight: 600;
        padding: 6px 15px;
        margin: 0 5px;
      }
      a.active {
        background: #6fcb6f;
        color: #fff;
        border-radius: 18px;
      }
    }
    .menu-nav-r {
      width: 376px;
      margin-top: 4px;
      .input-select {
        border: 1px #6fcb6f solid;
        border-radius: 5px;
        outline: 0;
      }
      .search-but {
        background: #6fcb6f;
        border: 1px #6fcb6f solid;
        outline: 0;
        color: #fff;
        border-radius: 0;
      }
    }
  }
}
</style>
