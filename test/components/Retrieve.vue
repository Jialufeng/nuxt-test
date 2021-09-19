<template>
  <section>
    <el-dialog
      title=""
      :close-on-click-modal="false"
      :visible.sync="isRetriver"
      class="login-popup"
      :before-close="handleClose"
    >
      <template>
        <section class="welcome-t">找回密码</section>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="username" class="form-item-b">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input
                  placeholder="手机号"
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.username"
                  maxlength="11"
                  class="login-ipt"
                >
                </el-input>
              </el-col>
              <el-col :span="8" >
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
          <el-form-item prop="captcha" class="form-item-b">
            <el-input
              placeholder="输入验证码"
              prefix-icon="el-icon-lock"
              v-model="form.captcha"
              maxlength="6"
              
              class="login-ipt"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="form-item-b">
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
          <el-form-item label="" prop="verifyPassword" class="form-item-b">
            <el-input
              placeholder="再次输入登陆密码"
              prefix-icon="el-icon-lock"
              autocomplete="new-password"
              show-password
              v-model="form.verifyPassword"
              class="login-ipt"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </template>

      <div slot="footer" class="dialog-footer">
        <el-button class="login-but" @click="handleRegister"
          >立即找回</el-button
        >
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { url } from "../util";
export default {
  props: {
    isRetriver: {
      default: false
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isSms: true,
      sms: 60,
      code: null,
      dialogLoginVisible: true,
      form: {
        password: "",
        verifyPassword: "",
        username: "",
        captcha: ""
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifyPassword: [{ validator: validatePass2, trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
    async handleRegister() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = this.$axios.post(url.rediscoverPwd, this.form);
          if (data.code == 200) {
            this.$message("密码找回成功");
            this.handleClose();
          } else {
            this.$message.error('密码找回失败');
          }
          console.log(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async handleGetCode() {
      if(this.form.username == '' && this.form.phone.username != '11') {
        this.$message.error("请输入11位手机号");
        return false;
      }
      const data = await this.$axios.$post(url.sendSecurityCode, {
        phone: this.form.phone
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
    handleClose() {
      this.$emit("close", false);
    },
    handleClick(index) {}
  },

  created() {}
};
</script>
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
.welcome-t {
  color: #6fcb6f;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  margin: 10px 0;
}
.form-item-b {
  margin-bottom: 10px;
  .el-form-item__error {
    padding-top: 0;
    top: 96%;
  }
}
</style>
