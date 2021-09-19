<!--
 * @Author: your name
 * @Date: 2021-08-30 18:09:18
 * @LastEditTime: 2021-09-13 18:04:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/question.vue
-->
<template>
  <section class="question">
    <Header />
    <section class="banner">
      <section class="body-content">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
            <img src="/image/img1.png" width="100%" class="row-bg-img" />
          </el-col>
          <el-col :span="16" :offset="2">
            <section class="question-content">
              <h5>立即试用SanWen在线题库系统</h5>
              <p>
                支持200个账号，支持局域网和互联网私有部署，支持各种常见题型，支持普通试卷、随机试卷，
                支持试题随机混排，单题与整卷展示模式，客观题自动批改等功能。
              </p>
              <el-button type="primary" plain round class="but"
                >立即试用</el-button
              >
            </section>
          </el-col>
        </el-row>
      </section>
    </section>
    <section class="question-auto">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>高等数学</el-breadcrumb-item>
      </el-breadcrumb>
      <section class="recommended">
        <section v-if="subjectList && subjectList.length == 0">
          <el-empty description="未搜索到题库"></el-empty>
        </section>
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-if="
              subjectList && subjectList.length
            "
            v-for="(item, index) in subjectList"
            :key="index"
          >
            <section class="recommended-item">
              <section class="recommended-head" @click="handleHrefDetail(item)">
                <img :src="item.coverPic" width="100%"/>
              </section>
              <section class="recommended-content">
                <h5 @click="handleHrefDetail(item)">{{ item.sblName }}</h5>
                <p>题量：{{ item.sblSbNum }}题</p>
                <section class="recommended-foot">
                  <el-button class="look" @click="handlePreview(item)">预览</el-button>
                  <el-button>购买</el-button>
                </section>
              </section>
            </section>
          </el-col>
        </el-row>
        <section class="pages">
          <el-pagination
            @current-change="handleCurrent"
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="page.page"
            :page-size="page.pageSize"
          >
          </el-pagination>
        </section>
      </section>
    </section>
    <Footer />
  </section>
</template>
<script>
import { url } from "../util";
export default {
  data() {
    return {
      page: {
        pageSize: 20,
        page: 1
      },
      sblName: '',
      total: null,
      subjectList: {},
    };
  },
  
  // async asyncData({ $axios }) {
  //   const subjectList = await $axios.post(url.subjectList, {
  //     size: this.page.pageSize,
  //     current: this.page.page
  //   });
  //   console.log(subjectList.data);
  //   return {
  //     subjectList: subjectList.data
  //   };
  // },
  async fetch() {
    const subjectList = await this.$axios.post(url.subjectList, {
      size: this.page.pageSize,
      current: this.page.page,
      sblName: this.sblName
    });
    this.subjectList = subjectList.data.result.records;
    this.total = subjectList.data.result.total;
  },
  created() {
    console.log("asasas")
    this.sblName = this.$route.query.name;
    this.$fetch();
  },
  methods: {
    handleCurrent(val) {
      this.page.page = val;
      this.$fetch();
    },
    handleHrefDetail(row) {
      this.$router.push(`/questionDetail/${row.id}`);
    },
    handlePreview(row) {
      this.$router.push(`/topicsList?id=${row.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 300px;
  background-image: linear-gradient(#015eea, #00c0fa);
  width: 100%;
}
.body-content {
  width: 1200px;
  margin: 0 auto;
  .row-bg {
    align-items: flex-end;
    .row-bg-img {
      margin-top: 45px;
    }
  }
}
.question-content {
  h5 {
    font-size: 36px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
  }
  p {
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    margin-top: 25px;
  }
  .but {
    background: #6fcb6f;
    color: #fff;
    border: 1px #6fcb6f solid;
    margin-top: 36px;
  }
}
.question {
  .question-auto {
    width: 1200px;
    margin: 0 auto;
    .el-breadcrumb {
      margin: 20px 0;
    }
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
          background: #b9bcc5;
        }
      }
    }
  }
  .pages {
    text-align: right;
  }
}
</style>
