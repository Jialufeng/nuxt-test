<!--
 * @Author: your name
 * @Date: 2021-08-31 23:22:07
 * @LastEditTime: 2021-09-23 14:01:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/help.vue
-->
<template>
  <section class="topics">
    <Header />

    <section class="help-auto">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>题目列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <section class="topics-whole">
        <section
          v-for="(item, index) in tableData"
          :key="index"
          class="topics-item"
          @click="handleHref(item)"
        >
          <section class="topics-h">
            <el-row :gutter="20">
              <el-col :span="7" class="">({{index +1}}) 知识点：{{ item.learnPort }}</el-col>
              <el-col :span="7" :offset="5"
                >难度：{{ name[item.difficultyLevel] }}</el-col
              >
            </el-row>
          </section>
          <section class="topics-content">
            <p>标签：{{ item.uniqueId }}</p>
            <section class="topics-content-t" v-html="item.analyse"></section>
          </section>
        </section>
      </section> -->
      <section style="margin-top: 20px" class="topics-table">
        <el-table
          :data="tableData"
          @row-click="handleRow"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="uniqueId" label="标签" width="180">
          </el-table-column>
          <el-table-column label="题型" width="100">
            <template slot-scope="scope">
              {{ subject[scope.row.tsubject] }}
            </template>
          </el-table-column>
          <el-table-column label="难度" width="100">
            <template slot-scope="scope">
              {{ name[scope.row.difficultyLevel] }}
            </template>
          </el-table-column>
          <el-table-column prop="learnPort" label="知识点" width="200">
          </el-table-column>
          <el-table-column prop="analyse" label="题目内容">
            <template slot-scope="scope">
              <p v-html="scope.row.analyse"></p>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </section>
    <Footer />
    <el-dialog title="题目预览" :visible.sync="isTopics" width="50%">
      <section v-if="info">
        <section>
          <el-row :gutter="20">
            <el-col :span="12" class="tsubjectDesc">{{
              info.tsubjectDesc || "-"
            }}</el-col>
            <el-col :span="12" style="text-align: right"
              >标签：{{ info.uniqueId }} 日期：{{
                getLocalTime(info.createTime / 1000)
              }}</el-col
            >
          </el-row>
        </section>
        <section>
          难度：{{ name[info.difficultyLevel] }} 知识点：{{ info.learnPort }}
        </section>
        <section class="brief-title">
          {{ info.briefTitle }}
        </section>
        <section class="brief-title">
          <template v-if="info.tsubject == 3"> {{ info.answer }}</template>
          <template v-else>
            <p
              class="brief-title-p"
              v-for="(item, index) in info.answerList"
              :key="index"
            >
              {{ item.option }} 、<span
                class="brief-title-s"
                v-html="item.text"
              ></span>
            </p>
            【答案】：<span
              v-for="(item, index) in info.answerList"
              :key="index"
            >
              {{ item.isCorrect == 2 ? item.option : "" }}
            </span>
          </template>
        </section>
        <section class="brief-title">
          【解析】：<span class="brief-title-s" v-html="info.analyse"></span>
        </section>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isTopics = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        > -->
      </span>
    </el-dialog>
  </section>
</template>
<script>
import { url } from "../util";
export default {
  data() {
    return {
      tableData: [],
      // 0容易 1简单 2中等 3较难 4 困难
      name: {
        0: "容易",
        1: "简单",
        2: "中等",
        3: "较难",
        4: "困难"
      },
      subject: {
        0: '其他',
        1: '判断',
        2: '单选',
        3: '多选',
        4: '填空题',
        5: '综合题',
        6: '实操题',
        10: '完形填空',
        11: '阅读理解',

      },
      isTopics: false,
      info: null
    };
  },
  methods: {
    async handleRow(row) {
      this.isTopics = true;
      const data = await this.$axios.post(url.getSubjectBankDetail, {
        id: row.id
      });
      this.info = data.data.result;
    },
    handleHref(row) {
      // const userinfo = sessionStorage.getItem("userinfo");
      // const user = JSON.parse(userinfo);
      location.href = `${row.url}`;
      // if(user) {
      //   // location.href = `${row.url}?ticket=${user.token}`
      // } else {

      // }
    },
    getLocalTime(s) {
      var now = new Date(s * 1000);
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return `${year}-${month}-${date} ${hour}:${minute}`;
    }
  },
  async fetch() {
    const list = await this.$axios.$post(url.topicsList, {
      id: this.$route.query.id
    });
    this.tableData = list.result.records;
  },
  created() {
    this.$fetch();
  }
};
</script>

<style lang="scss" scoped>
.help-auto {
  width: 1200px;
  margin: 20px auto;
}
.topics-whole {
  margin-top: 40px;
  .topics-item {
    background: #fff;
    border-radius: 6px;
    margin: 20px 0;
    cursor: pointer;
    .topics-h {
      padding: 18px 30px;
      border-bottom: 1px solid #f0f0f0;
    }
    .topics-content {
      padding: 30px 30px;
    }
    .topics-content-t {
      text-align: center;
      padding: 20px 0;
    }
  }
}
.brief-title,
.tsubjectDesc {
  // font-weight: bold;
  margin: 6px 0;
  color: #000;
  .brief-title-p {
    margin-left: 5px;
    padding: 2px 0;
  }
}
.tsubjectDesc {
  font-size: 16px;
}
</style>
