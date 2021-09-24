<!--
 * @Author: your name
 * @Date: 2021-09-17 18:32:27
 * @LastEditTime: 2021-09-22 20:32:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/components/pay.vue
-->
<template>
  <div>
    <el-dialog
      title=""
      :visible.sync="isPay"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="65%"
    >
      <section class="subject-date">
        <section class="subject-date-text">选择时长：</section>
        <section class="subject-m" v-if="subjectInfo && subjectInfo.configs">
          <section
            v-if="subjectInfo && subjectInfo.configs"
            class="subject-list"
            v-for="(item, index) in subjectInfo.configs"
            :key="index"
            :class="yearType == index ? 'sub-active' : ''"
            @click="yearType = index"
          >
            <el-row>
              <el-col :span="12" class="subject-list-y"
                >{{ item.type }}年 <span v-if="index == 1">9折</span>
                <span v-if="index == 2">8折</span></el-col
              >
              <el-col :span="12" class="subject-price">
                <section class="price-y">
                  <span>{{ item.value }}</span> 元/年
                </section>
                <p class="price">总价：{{ item.type * item.value }}元</p>
              </el-col>
            </el-row>
          </section>

          <!-- <section class="subject-list">
                    <el-row>
                      <el-col :span="12" class="subject-list-y"
                        >1年<span>5折</span></el-col
                      >
                      <el-col :span="12" class="subject-price">
                        <section class="price-y">
                          <span>5000</span> 元/年
                        </section>
                        <p class="price">总价：5000元</p>
                      </el-col>
                    </el-row>
                  </section>
                  <section class="subject-list">
                    <el-row>
                      <el-col :span="12" class="subject-list-y">1年</el-col>
                      <el-col :span="12" class="subject-price">
                        <section class="price-y">
                          <span>5000</span> 元/年
                        </section>
                        <p class="price">总价：5000元</p>
                      </el-col>
                    </el-row>
                  </section> -->
        </section>
        <section class="subject-date-text">订单信息：</section>
        <section class="order-info" v-if="subjectInfo && subjectInfo.configs">
          <el-row :gutter="20">
            <el-col :span="6">
              购买时长：{{ subjectInfo.configs[yearType].type }}年
            </el-col>
            <el-col :span="6"
              >到期时间：{{
                getLocalTime(subjectInfo.configs[yearType].type)
              }}</el-col
            >
            <el-col :span="6"
              >优惠：<span v-if="yearType == 0">￥0</span
              ><span v-if="yearType == 1"
                >￥{{
                  subjectInfo.configs[yearType].value *
                    subjectInfo.configs[yearType].type *
                    0.09
                }}</span
              ><span v-if="yearType == 2"
                >￥{{
                  subjectInfo.configs[yearType].value *
                    subjectInfo.configs[yearType].type *
                    0.08
                }}</span
              ></el-col
            >
            <el-col :span="6"
              >实际支付金额<span v-if="yearType == 1"
                >￥{{
                  subjectInfo.configs[yearType].type *
                    subjectInfo.configs[yearType].value -
                    subjectInfo.configs[yearType].value *
                      subjectInfo.configs[yearType].type *
                      0.09
                }}</span
              ><span v-if="yearType == 2"
                >￥{{
                  subjectInfo.configs[yearType].type *
                    subjectInfo.configs[yearType].value -
                    subjectInfo.configs[yearType].value *
                      subjectInfo.configs[yearType].type *
                      0.08
                }}</span
              ><span v-if="yearType == 0"
                >￥{{ subjectInfo.configs[yearType].value }}</span
              ></el-col
            >
          </el-row>
        </section>
        <section class="subject-date-text">支付方式：</section>
        <section class="pay-type">
          <ul>
            <li :class="type == 1 ? 'active' : ''" @click="type = 1">
              <span class="pay-type-icon1"></span>支付宝
            </li>
            <li :class="type == 2 ? 'active' : ''" @click="type = 2">
              <span class="pay-type-icon2"></span>微信支付
            </li>
          </ul>
        </section>
        <section>
          <el-button class="but-pay" @click="handlePay">去付款</el-button>
        </section>
      </section>
    </el-dialog>
    <el-dialog
      :title="type == 1 ? '支付宝支付' : '微信支付'"
      :visible.sync="isQRcode"
      width="40%"
    >
      <section style="width: 140px; height: 140px; margin: 0 auto;">
        <img
          :src="qrcode"
          width="100%"
        />
      </section>
      <section style="text-align: center; margin: 20px 0;">
        <span slot="footer" class="dialog-footer">
          <el-button class="but-pay" @click="isQRcode = false">确 定</el-button>
        </span>
      </section>
    </el-dialog>
  </div>
</template>

<script>
import { url } from "../util";
export default {
  props: {
    subjectInfo: {
      default: null
    },
    isPay: {
      default: false
    }
  },
  data() {
    return {
      type: 1,
      yearType: 0,
      isQRcode: false,
      qrcode: '',
    };
  },
  methods: {
    async handlePay() {
      const userinfo = sessionStorage.getItem("userinfo");
      const user = JSON.parse(userinfo);

      if(!user) {
          this.$message.error('请先登录');
          return false;
      }
      
      console.log(user);
      const data = await this.$axios.$post(
        url.payment,
        {
          money: this.subjectInfo.configs[this.yearType].value,
          orderType: 1,
          busId: 1,
          payType: this.type == 1 ? "1" : "2",
          remark: "test"
        },
        {
          headers: {
            'X-Access-Token': user.token
          }
        }
      );
      console.log(data.result);
      this.qrcode = data.result.imageData
    //   this.isQRcode = true;
    },
    handleClose() {
      this.$emit("close", false);
    },
    getLocalTime(Num) {
      var now = new Date();
      var year = now.getFullYear() + Num;
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return `${year}-${month}-${date}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.subject-date {
  margin-top: -30px;
  padding: 0 20px;
  .subject-date-text {
    font-weight: 600;
    line-height: 24px;
    margin: 20px 0;
  }
  .subject-m {
    margin-top: 10px;
    display: flex;
  }
  .subject-list {
    width: 214px;
    padding: 12px 20px;
    height: 46px;
    border: 1px solid #d8dae2;
    border-radius: 6px;
    float: left;
    margin-right: 50px;
    cursor: pointer;
    .subject-list-y {
      font-size: 28px;
      font-weight: bold;
      line-height: 50px;
      position: relative;
      span {
        padding: 0px 4px;
        background: #6fcb6f;
        border: 1px solid #6fcb6f;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 18px;
        position: absolute;
        top: 14px;
        right: 15px;
      }
    }

    .subject-price {
      .price-y {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 6px;
        span {
          font-size: 22px;
          font-weight: bold;
        }
      }
      .price {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
  .sub-active {
    border: 2px solid #6fcb6f;
  }
  .order-info {
    padding: 20px 20px;
    font-size: 16px;
    background: rgba(244, 246, 248, 1);
    span {
      color: rgba(240, 116, 43, 1);
      font-size: 18px;
      font-weight: bold;
    }
  }
  .pay-type {
    ul li {
      width: 180px;
      height: 60px;
      line-height: 60px;
      border-radius: 6px;
      text-align: center;
      font-size: 18px;
      border: 1px solid #d8dae2;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      //   transition: .1s;
      span {
        width: 26px;
        height: 26px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
      .pay-type-icon1 {
        background: url(/image/wx.png) no-repeat #fff;
        background-size: 100%;
      }
      .pay-type-icon2 {
        background: url(/image/zfb.png) no-repeat #fff;
        background-size: 100%;
      }
    }
    .active {
      border: 2px #6fcb6f solid;
    }
  }
}
.but-pay {
  //   background: rgba(240, 116, 43, 1);
  background: #6fcb6f;
  width: 50%;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 14px 0;
}
</style>
