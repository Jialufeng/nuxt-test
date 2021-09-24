<template>
  <section>
    <Header />
    <section class="body">
      <section class="body-slide">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item
            v-if="banner.result && banner.result.length"
            v-for="(item, index) in banner.result"
            :key="index"
          >
            <img :src="item.url" width="100%" />
          </el-carousel-item>
        </el-carousel>
      </section>
      <section class="index-title">题库商品推荐</section>
      <section class="recommended">
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-if="recommendedList.result && recommendedList.result.length"
            v-for="(item, index) in recommendedList.result"
            :key="index"
          >
            <section class="recommended-item">
              <section class="recommended-head" @click="handleHrefDetail(item)">
                <img :src="item.coverPic" width="100%" />
              </section>
              <section class="recommended-content">
                <h5 @click="handleHrefDetail(item)">{{ item.sblName }}</h5>
                <p>题量：{{ item.sblSbNum }}题</p>
                <section class="recommended-foot">
                  <el-button class="look" @click="handlePreview(item)">
                    预览</el-button
                  >
                  <el-button @click="handlePay(item)">购买</el-button>
                </section>
              </section>
            </section>
          </el-col>
        </el-row>
      </section>
      <section class="index-title">欢迎使用SanWen在线题库系统</section>
      <section
        class="sanwen"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseLeave"
      >
        <el-row :gutter="20">
          <el-col :span="14">
            <section class="sanwen-text">
              <p>
                {{ serviceStr }}
                <transition name="el-zoom-in-center"
                  ><span v-if="ifServer">{{ serviceStrOf }}</span></transition
                >
              </p>
            </section>
          </el-col>
          <el-col :span="10">
            <section class="sanwen-on">
              <img :src="service[0].contentUrl" width="100%" />
              <!-- <h5>立即试用SanWen在线题库系统</h5>
              <p>
                免费版支持200个账号，支持局域网和互联网私有部署，支持各种常见题型，支持普通试卷、随机试卷，支持试题随机混排，单题与整卷展示模式，客观题自动批改等功能。
              </p>
              <section class="sanwen-on-but">
                <a href="javascript:;">立即试用</a>
              </section> -->
            </section>
          </el-col>
        </el-row>
      </section>
      <section class="index-title">功能与特性介绍</section>
      <section class="intro">
        <el-row :gutter="20">
          <el-carousel arrow="always">
            <el-carousel-item v-for="items in 2" :key="items">
              <el-col
                :span="8"
                class="intro-box"
                v-for="(item, index) in chara.result"
                :key="index"
              >
                <template v-if="items == 1">
                  <section
                    class="e-icon e-icon1"
                    :style="{
                      background: 'url(' + item.contentUrl + ') #fff no-repeat'
                    }"
                  >
                    <h5>{{ item.title }}</h5>
                    <p>
                      {{ item.content }}
                    </p>
                  </section>
                </template>
                <template v-if="index > 5">
                  <section
                    class="e-icon e-icon1"
                    :style="{
                      background: 'url(' + item.contentUrl + ') #fff no-repeat'
                    }"
                  >
                    <h5>{{ item.title }}</h5>
                    <p>
                      {{ item.content }}
                    </p>
                  </section>
                </template>
              </el-col>
            </el-carousel-item>
          </el-carousel>
        </el-row>
      </section>
    </section>
    <!-- <Tutorial/> -->
    <Pay :subjectInfo="subjectInfo" :isPay="isPay" @close="isPay = false"></Pay>
    <Footer />
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
      ifServer: false,
      isPay: false,
      subjectInfo: null,
    };
  },
  methods: {
    // 购买
    async handlePay(row) {
      this.isPay = true;
      const data = await this.$axios.post(url.getSubjectBankLibraryDetail, {
        id: row.id
      });
      this.subjectInfo = data.data.result;
    },
    handleMouseover() {
      this.ifServer = true;
    },
    handleMouseLeave() {
      this.ifServer = false;
    },
    handleHrefDetail(row) {
      this.$router.push(`/questionDetail/${row.id}`);
    },
    handlePreview(row) {
      this.$router.push(`/topicsList?id=${row.id}`);
    }
  },
  async asyncData({ $axios }) {
    const banner = await $axios.post(url.bannerList, {
      type: 1
    });
    const recommendedList = await $axios.post(url.getRecommendedList, {});
    const service = await $axios.post(url.getContentList, {
      type: 2
    });

    let serviceStr = service.data.result[0].content.substr(0, 290);
    let serviceStrOf = service.data.result[0].content.substr(290);
    const chara = await $axios.post(url.getContentList, {
      type: 5
    });

    return {
      banner: banner.data,
      recommendedList: recommendedList.data,
      service: service.data.result,
      serviceStr: serviceStr,
      serviceStrOf: serviceStrOf,
      chara: chara.data
    };
  }
  // created() {
  //   this.$fetch();
  // }
};
</script>

<style lang="scss" scoped>
.body {
  width: 1200px;
  margin: 0 auto;
}
.index-title {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 28px;
}
.intro-box {
  h5 {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    padding-top: 14px;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
  }
}
.e-icon {
  height: 130px;
  padding-left: 150px;
  margin: 10px 0;
}
.e-icon1 {
  background: url(/image/r1.png) no-repeat #fff;
}
.e-icon2 {
  background: url(/image/r2.png) no-repeat #fff;
}
.e-icon3 {
  background: url(/image/r3.png) no-repeat #fff;
}
.e-icon4 {
  background: url(/image/r4.png) no-repeat #fff;
}
.e-icon5 {
  background: url(/image/r5.png) no-repeat #fff;
}
.e-icon6 {
  background: url(/image/r6.png) no-repeat #fff;
}
.sanwen {
  background: #ffffff;
  border-radius: 6px;
  padding: 0 26px;
  cursor: pointer;
  .sanwen-text {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    padding-bottom: 35px;
    p {
      padding-top: 32px;
      text-indent: 2em;
    }
  }
  .sanwen-on {
    // background: #e0fbe0;
    // border: 1px solid #6fcb6f;
    // border-radius: 6px;
    // margin: 23px 0;

    padding: 20px 23px;
    img {
      height: 220px;
    }
    // height: 100%;
    h5 {
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #007900;
      text-align: center;
    }
    p {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      margin-top: 20px;
      font-size: 16px;
    }
    .sanwen-on-but {
      text-align: center;
      a {
        width: 140px;
        height: 35px;
        line-height: 35px;
        font-size: 16px;
        background: #6fcb6f;
        border-radius: 17px;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        margin-top: 20px;
      }
    }
  }
}
.body-slide {
  margin-top: 14px;
}
.recommended {
  .recommended-item {
    background: #fff;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  .recommended-head {
    height: 145px;
    background: #00d2d7;
  }
  .recommended-content {
    padding: 18px 19px;
    cursor: pointer;
    h5 {
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
    }
    p {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #666666;
      margin-top: 10px;
    }
    .recommended-foot {
      margin-top: 12px;
      button {
        background: #6fcb6f;
        color: #fff;
        width: 110px;
        line-height: 10px;
        height: 35px;
        border-radius: 16px;
      }
      .look {
        background: #b9bcc5;
      }
    }
  }
}
</style>
