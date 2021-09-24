<template>
  <section>
    <el-dialog
      title=""
      :close-on-click-modal="false"
      :visible.sync="isLogin"
      class="login-popup"
      :before-close="handleClose"
    >
      <el-tabs v-model="isLoginTab" @tab-click="handleTab">
        <el-tab-pane label="手机验证码登录" name="0"></el-tab-pane>
        <el-tab-pane label="手机号登陆" name="1"></el-tab-pane>
      </el-tabs>

      <!-- 登陆 -->
      <el-form :model="form" :rules="rules" ref="form">
        <template v-if="isLoginTab == 0">
          <el-form-item prop="phone" class="form-item-b">
            <el-input
              placeholder="手机号登陆"
              prefix-icon="el-icon-user"
              v-model="form.phone"
              class="login-ipt"
              maxlength="11"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-item-b">
            <el-input
              placeholder="登陆密码"
              prefix-icon="el-icon-lock"
              show-password
              v-model="form.password"
              autocomplete="new-password"
              class="login-ipt"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="imageCode" class="form-item-b">
            <el-row :gutter="20" type="flex">
              <el-col :span="12">
                <el-input
                  placeholder="输入验证码"
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.imageCode"
                  class="login-ipt"
                  maxlength="4"
                >
                </el-input>
              </el-col>
              <el-col :span="8">
                <section class="code-img" @click="handleCode">
                  <img :src="code" width="100%" />
                </section>
              </el-col>
            </el-row>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item prop="username" class="form-item-b">
            <el-input
              placeholder="手机号码"
              prefix-icon="el-icon-phone-outline"
              v-model="form.username"
              maxlength="11"
              class="login-ipt"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha" class="form-item-b">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input
                  placeholder="输入验证码"
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.captcha"
                  maxlength="6"
                  class="login-ipt"
                >
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-button
                  v-if="isSms"
                  class="code"
                  plain
                  @click="handleGetCode"
                  >获取验证码</el-button
                >
                <el-button
                  v-else
                  class="code"
                  plain
                  disabled
                  style="width: 112px"
                  >{{ sms }}S</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="login-but" @click="handleLogin">立即登陆</el-button>
        <p style="text-align: center">
          <el-button type="text" @click="handleForget">忘记密码？</el-button>
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
  props: {
    isLogin: {
      default: false
    }
  },
  inject: ['app'],
  data() {
    return {
      Random: '',
      isSms: true,
      sms: 60,
      code: null,
      isLoginTab: "0",
      dialogLoginVisible: true,
      form: {
        name: "",
        phone: "",
        username: "",
        captcha: "",
        password: "",
        imageCode: '',
        imageCodeKey: '',
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号",
            trigger: "blur"
          }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        imageCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号",
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  async asyncData({ $axios }) {
    const code = await $axios.post(url.randomImage, {});
    return {
      codes: code.data
    };
  },

  methods: {
    // 忘记密码
    handleForget() {
      this.$emit("forget", false);
    },
    // 获取验证码
    async handleGetCode() {
      if(this.form.username == '' && this.form.username.length != '11') {
        this.$message.error("请输入11位手机号");
        return false;
      }
      const data = await this.$axios.$post(url.sendSecurityCode, {
        phone: this.form.username
      });
      if (data.code == 200) {
        this.isSms = false;
        this.timer = setInterval(() => {
          if (--this.sms <= 0) {
            this.sms = 60;
            this.isSms = true;
            clearInterval(this.timer);
          }
        }, 1000);
        this.$message("验证码已发送");
      }
    },
    async handleLogin() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.isLoginTab == 0) {
            const data = await this.$axios.post(url.loginPwd, {
              username: this.form.phone,
              password: this.form.password,
              imageCodeKey: this.Random,
              imageCode: this.form.imageCode
            });
            console.log("data");
            console.log(data.data.result);
            if (data.data.code == 200) {
              this.handleClose(1);
              this.app.userinfo = data.data.result;
              sessionStorage.setItem('userinfo', JSON.stringify(data.data.result))
              this.$message.success("登陆成功");
            } 
            // login
          } else {
            const data = await this.$axios.post(url.login, {
              username: this.form.username,
              captcha: this.form.captcha
            });
            console.log("data");
            console.log(data.data.result);
            if (data.data.code == 200) {
              this.handleClose();
              this.app.userinfo = data.data.result;
              sessionStorage.setItem('userinfo', JSON.stringify(data.data.result))
              this.$message.success("登陆成功");
            } 
          }
          //
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // if (this.isLoginTab == 0) {

      //   const aw = await this.$axios.post(url.loginPwd, {
      //     // username: this.form.mobile,
      //     phone: "sysadmin",
      //     password: "123456"
      //   });
      //   console.log(aw);
      // } else {
      // }
    },
    async handleCode() {
      this.Random = parseInt(Math.random()*1000000000+1);
      const code = await this.$axios.$get(url.randomImage +  this.Random, {});
      this.code = code.result;
    },
    handleClose() {
      this.$emit("close", false);
    },
    handleTab(index) {
      console.log(1);
      this.$refs["form"].resetFields();
    }
  },
  async fetch() {
  },
  created() {
    this.handleCode();
  }
};
</script>
