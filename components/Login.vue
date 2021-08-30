<template>
  <section>
    <el-dialog title="" :visible.sync="dialogLoginVisible" class="login-popup">
      <el-tabs v-model="isLogin" @tab-click="handleClick">
        <el-tab-pane label="用户名登陆" name="0"></el-tab-pane>
        <el-tab-pane label="手机号登陆" name="1"></el-tab-pane>
      </el-tabs>
      <template v-if="isLogin == 0">
        <el-form :model="form">
          <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user"
            v-model="form.name"
            class="login-ipt"
          >
          </el-input>
          <el-input
            placeholder="登陆密码"
            prefix-icon="el-icon-lock"
            v-model="form.name"
            class="login-ipt"
          >
          </el-input>
          <el-form-item>
            <el-row :gutter="20" type="flex">
              <el-col :span="12">
                <el-input
                  placeholder="输入验证码"
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.name"
                  class="login-ipt"
                >
                </el-input>
              </el-col>
              <el-col :span="8">
                  <section class="code-img" @click="handleCode">
                      <img :src="code" width="100%"/>
                  </section>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form :model="form">
          <el-input
            placeholder="手机号码"
            prefix-icon="el-icon-phone-outline"
            v-model="form.name"
            class="login-ipt"
          >
          </el-input>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-input
                  placeholder="输入验证码"
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.name"
                  class="login-ipt"
                >
                </el-input>
              </el-col>
              <el-col :span="8" :offset="4">
                <el-button class="code" plain>获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </template>

      <div slot="footer" class="dialog-footer">
        <el-button class="login-but" @click="dialogLoginVisible = false"
          >立即登陆</el-button
        >
        <p style="text-align: center">
          <el-button type="text">忘记密码？</el-button>
        </p>
      </div>
    </el-dialog>
  </section>
</template>
<style lang="scss">
.login-popup {
  .el-dialog {
    width: 530px;
    padding: 0 50px;
  }
  .el-tabs__active-bar {
    background: #6fcb6f;
  }
  .el-tabs__item {
    font-size: 16px;
  }
  .el-tabs__nav-scroll {
    padding-left: 100px;
  }
  .el-tabs__item:hover {
    color: #000;
  }
  .el-tabs__item.is-active {
    color: #6fcb6f;
  }
  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
  }
  .login-ipt {
    margin: 5px 0;
  }
  .login-but {
    background: #6fcb6f;
    width: 100%;
    color: #fff;
    font-size: 16px;
  }
  .el-input__inner:focus {
    border-color: #6fcb6f;
  }
  .code {
      margin-top: 4px;
  }
  .code:hover {
      color: #6fcb6f;
      border: 1px #6fcb6f solid;
  }
  .code-img {
      cursor: pointer;
  }
}
</style>
<script>
import { url } from "../util";
export default {
  data() {
    return {
      code: null,
      isLogin: "0",
      dialogLoginVisible: true,
      form: {
        name: ""
      }
    };
  },
  async asyncData({ $axios }) {
    const code = await $axios.post(url.randomImage, {
    });
    return {
      codes: code.data,
    };
  },

  methods: {
    handleCode() {
        this.$fetch();
    },
    handleClick(index) {}
  },
  async fetch() {
      const code = await this.$axios.$get(url.randomImage, {})
      this.code = code.result;
  },
  created() {
      this.$fetch();
  }
};
</script>
