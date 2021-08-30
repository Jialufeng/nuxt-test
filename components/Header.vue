<!--
 * @Author: your name
 * @Date: 2021-08-27 14:56:46
 * @LastEditTime: 2021-08-29 19:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: /tomexam/components/header.vue
-->
<template>
  <section class="header">
    <section class="header-content">
      <a class="logo" href="javascript:;">
        <img src="/image/logos.png" width="100%" />
      </a>
      <section class="menu-nav">
        <section class="menu-nav-l">
          <a href="javascript:;" class="active">首页</a>
          <a href="javascript:;">题库</a>
          <a href="javascript:;">帮助</a>
          <a href="javascript:;">联系我们</a>
        </section>
        <section class="menu-nav-r">
          <el-input
            placeholder="搜索您感兴趣的题库"
            v-model="name"
            class="input-select"
          >
            <el-button
              slot="append"
              class="search-but"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </section>
      </section>
      <section class="login">
        <a href="javascript:;">登陆 </a>
        <span>|</span>
        <a href="javascript:;"> 注册</a>
      </section>
    </section>
    <Login />
  </section>
</template>
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
    top: 10px;
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
        border-radius: 15px;
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

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  created() {}
};
</script>
