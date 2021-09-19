<!--
 * @Author: your name
 * @Date: 2021-08-30 18:09:18
 * @LastEditTime: 2021-09-18 13:48:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/question.vue
-->
<template>
  <section class="question">
    <Header />
    <section class="banner">
      <section class="body-content">
        <el-breadcrumb class="breadcrumb breadcrumb-c" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>高等数学</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
            <img v-if="info.coverPic" :src="info.coverPic" width="100%" class="row-bg-img" />
          </el-col>
          <el-col :span="16" :offset="1">
            <section class="subject">
              <section class="subject-t">
                <h5>{{ info.sblName }}</h5>
                <p>更新时间：{{ getLocalTime(info.sblCreateTime / 1000) }}</p>
              </section>
              <section class="subject-date">
                <section class="subject-date-text">选择时长：</section>
                <section class="subject-m">
                  <section
                    class="subject-list"
                    v-for="(item, index) in info.configs"
                    :key="index"
                    :class="type == index ? 'active' :''"
                    @click="type = index"
                  >
                    <el-row>
                      <el-col :span="12" class="subject-list-y">{{item.type}}年
                        <span v-if="index == 1">9折</span>
                        <span v-if="index == 2">8折</span>
                      </el-col>
                      <el-col :span="12" class="subject-price">
                        <section class="price-y">
                          <span>{{item.value}}</span> 元/年
                        </section>
                        <p class="price">总价：{{item.type * item.value}}元</p>
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
              </section>
              <section class="subject-but">
                <a href="javascript:;" @click="handlePreview">预览</a>
                <a href="javascript:;" class="buy" @click="handleBuy">购买</a>
              </section>
            </section>
          </el-col>
        </el-row>
      </section>
      <section class="question-b">
        <section class="question-b-detail">
          <h5 class="question-t"><i></i>题库详情</h5>
          <section class="question-text">
            {{info.content || '-'}}
          </section>
        </section>
        <section class="question-b-detail">
          <h5 class="question-t"><i></i>题量</h5>
          <section class="question-text">{{info.sblSbNum || '0'}}题</section>
        </section>
        <section class="question-b-detail">
          <h5 class="question-t"><i></i>学科名称</h5>
          <section class="question-text">{{info.sblSubjectName || '-'}}</section>
        </section>
      </section>
    </section>
    <Footer />
    <Pay :subjectInfo="info" :isPay="isPay" @close="isPay = false"></Pay>
  </section>
</template>
<script>
import { url } from "../util";
import Pay from "../components/pay.vue";
export default {
  components: {
    Pay
  },
  data() {
    return {
      subjectInfo: null,
      isPay: false,
      type: 0,
      page: {
        pageSize: 20,
        page: 1
      },
      info: '',
      subjectList: {}
    };
  },
 
  async asyncData({ $axios, params, redirect }) {
    const data = await $axios.post(url.getSubjectBankLibraryDetail, {
      id: params.id
    });

    return {
      info: data.data.result
    };

    // if (filteredMountain) {
    //   return {
    //     continent: filteredMountain.continent,
    //     mountain: filteredMountain.title
    //   }
    // } else {
    //   redirect('/')
    // }
  },

  created() {
    // this.$fetch();
  },
  methods: {
    handleBuy() {
      this.isPay = true;
    },
    getLocalTime(str) {
      var now = new Date(str * 1000);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return (`${year}-${month}-${date} ${hour}:${minute}:${second}`);
    },
    handlePreview() {
      this.$router.push(`/topicsList?id=${this.info.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  // height: 500px;
  background: linear-gradient(180deg, #6fcb6f, #f0f0f0);
  width: 100%;
  padding-top: 38px;
}
.body-content {
  width: 1200px;
  margin: 0 auto;
  .el-breadcrumb {
    span {
      color: #fff;
    }
  }
  .row-bg {
    // align-items: flex-end;
    background: #fff;
    padding: 23px 25px;
    margin-top: 20px;
    .row-bg-img {
      // margin-top: 45px;
    }
    .subject {
      .subject-t {
        h5 {
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #000;
        }
        p {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          line-height: 24px;
          margin-top: 24px;
        }
      }
      .subject-date-text {
        font-weight: 600;
        line-height: 24px;
      }
      .subject-but {
        margin-top: 45px;
        a {
          font-size: 18px;
          width: 160px;
          height: 50px;
          line-height: 50px;
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          margin-right: 30px;
          background: #b9bcc5;
          border-radius: 6px;
          display: inline-block;
          text-align: center;
        }
        .buy {
          background: #6fcb6f;
        }
      }
    }
  }
  .subject-date {
    margin-top: 30px;
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
          right: 5px;
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
    .active {
      border: 2px solid #6fcb6f;
    }
  }
}
.question-b {
  width: 1140px;
  margin: 0 auto;
  margin-top: 20px;
  background: #fff;
  padding: 0 30px;
  padding-bottom: 80px;
  .question-t {
    i {
      width: 5px;
      height: 18px;
      background: #6fcb6f;
      border-radius: 3px;
      display: inline-block;
      margin-right: 10px;
    }
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 32px;
  }
  .question-text {
    padding-left: 16px;
    margin-top: 40px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
