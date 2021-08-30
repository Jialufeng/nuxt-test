
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
  .sanwen-text {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 24px;
    padding-bottom: 35px;
    p {
      padding-top: 32px;
    }
  }
  .sanwen-on {
    background: #e0fbe0;
    border: 1px solid #6fcb6f;
    border-radius: 6px;
    margin: 23px 0;
    padding: 20px 23px;
    height: 100%;
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
        background: #B9BCC5;
      }
    }
  }
}
</style>
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
            <img :src="item.url" width="100%" height="400px" />
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
              <section class="recommended-head"></section>
              <section class="recommended-content">
                <h5>{{ item.sblName }}</h5>
                <p>题量：{{ item.sblSbNum }}题</p>
                <section class="recommended-foot">
                  <el-button class="look">预览</el-button>
                  <el-button>购买</el-button>
                </section>
              </section>
            </section>
          </el-col>
        </el-row>
      </section>
      <section class="index-title">欢迎使用SanWen在线题库系统</section>
      <section class="sanwen">
        <el-row :gutter="20">
          <el-col :span="14">
            <section class="sanwen-text">
              <p>
                TomExam第一版发布于2010年，在过去的数年中，为数以万计的用户提供了良好的网络考试解决方案。基于Java与MySQL开发，可以稳定、顺畅的运行在Windows与Linux平台上。您可以在公网或局域网快捷方便的创建题库，发布试卷，组织考试，并由系统自动批改。高度的可配置性和灵活性使得TomExam可以被应用于很多领域。
              </p>
              <p>
                TomExam支持各种常见题型，提供普通试卷、随机试卷两种形式，并且支持试题随机混排，单题与整卷展示模式，有效防止作弊。TomExam支持试题批量导入，在线学习，断电数据保存等若干实用新功能，并对试卷自动批改，统计分析，试卷创建等功能进行功能和性能优化。
              </p>
            </section>
          </el-col>
          <el-col :span="10">
            <section class="sanwen-on">
              <h5>立即试用SanWen在线题库系统</h5>
              <p>
                免费版支持200个账号，支持局域网和互联网私有部署，支持各种常见题型，支持普通试卷、随机试卷，支持试题随机混排，单题与整卷展示模式，客观题自动批改等功能。
              </p>
              <section class="sanwen-on-but">
                <a href="javascript:;">立即试用</a>
              </section>
            </section>
          </el-col>
        </el-row>
      </section>
      <section class="index-title">功能与特性介绍</section>
      <section class="intro">
        <el-row :gutter="20">
          <el-col :span="8" class="intro-box">
            <section class="e-icon e-icon1">
              <h5>安全、稳定、高效</h5>
              <p>
                基于高效的缓存机制，安全、严谨的程序算法开发，支持横向扩展，提升处理能力。
              </p>
            </section>
          </el-col>
          <el-col :span="8" class="intro-box">
            <section class="e-icon e-icon2">
              <h5>高度可配置化</h5>
              <p>
                帮助您快速、智能的实现可定制化的在线考试应用。人工操作加自动处理并行，效率翻倍。
              </p>
            </section>
          </el-col>
          <el-col :span="8" class="intro-box">
            <section class="e-icon e-icon3">
              <h5>操作方便、灵活</h5>
              <p>优化操作流程，鼠标拖拽，数据克隆等技术使得操作更快捷。</p>
            </section>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 25px;">
          <el-col :span="8" class="intro-box">
            <section class="e-icon e-icon4">
              <h5>多题型支持</h5>
              <p>
                对象化试题模型，支持常见考试题型、根据您的需要，进行灵活配置与扩展。
              </p>
            </section>
          </el-col>
          <el-col :span="8" class="intro-box">
            <section class="e-icon e-icon5">
              <h5>高度智能</h5>
              <p>
                智能批改瞬间完成、人工干预方便高效，确保数据准确无误，智能提醒、数据容灾降低风险。
              </p>
            </section>
          </el-col>
          <el-col :span="8" class="intro-box">
            <section class="e-icon e-icon6">
              <h5>数据分析</h5>
              <p>
                自带核心统计功能，并可根据需求定制数据分析功能，让您快速掌握考试情况。
              </p>
            </section>
          </el-col>
        </el-row>
      </section>
    </section>
    <!-- <Tutorial/> -->
    <Footer />
  </section>
</template>

<script>
import { url } from "../util";
export default {
  async asyncData({ $axios }) {
    const banner = await $axios.post(url.bannerList, {
      type: 1
    });
    const recommendedList = await $axios.post(url.getRecommendedList, {
    });
    return {
      banner: banner.data,
      recommendedList: recommendedList.data,
    };
  }
  // async fetch() {
  //   console.log("11111@@@");
  //   console.log(mountains);
  // },
  // created() {
  //   this.$fetch();
  // }
};
</script>
