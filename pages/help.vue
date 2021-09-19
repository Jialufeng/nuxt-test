<!--
 * @Author: your name
 * @Date: 2021-08-31 23:22:07
 * @LastEditTime: 2021-09-18 13:50:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/help.vue
-->
<template>
  <section class="help">
    <Header />
    <section class="help-banner">
      <section class="help-banner-content">
        <el-row
          :gutter="20"
          type="flex"
          justify="space-between"
          class="help-banner"
        >
          <el-col :span="6" :offset="2" class="help-text">
            <h5>帮助中心</h5>
            <p>Help center</p>
          </el-col>
          <el-col :span="10">
            <img src="/image/help_banner.png" width="100%" />
          </el-col>
        </el-row>
      </section>
    </section>
    <section class="help-auto">
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>帮助</el-breadcrumb-item>
        <el-breadcrumb-item>常见问题</el-breadcrumb-item>
      </el-breadcrumb>
    </section>
    <section class="content-auto">
      <div class="help-search">
        <el-input
          placeholder="请输入要搜索的内容"
          v-model="name"
          class="input-with-content"
          @keyup.enter.native="handleSearchHelp"
        >
          <el-button
            slot="append"
            class="input-with-but"
            @click="handleSearchHelp"
            >搜索一下</el-button
          >
        </el-input>
      </div>
      <section class="problem">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in list" :key="index">
            <section class="problem-item">
              <a href="javascript:;" @click="handleDetail(item)"> {{ item.title }}</a>
            </section>
          </el-col>
        </el-row>
        <section v-if="list && list.length == 0">
          <el-empty description="未搜索到内容"></el-empty>
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
      name: "",
      list: []
    };
  },
  methods: {
    async handleSearchHelp() {
      if(this.name == '0') {
        this.$message.error("请输入搜索内容");
        return false;
      }
      const data = await this.$axios.post(url.getContentList, {
        type: 4,
        title: this.name
      });
      this.list = data.data.result;
    },
    handleDetail(row) {
      this.$router.push(`/helpInfo/${row.id}`);
    }
  },
  async fetch() {
    const data = await this.$axios.post(url.getContentList, {
      type: 4
    });
    this.list = data.data.result;
    console.log(data.data.result);
    // getContentList
  },
  created() {
    this.$fetch();
  }
};
</script>

<style lang="scss" scoped>
.help-banner {
  height: 300px;
  background: linear-gradient(139deg, #2fb383, #18a86b);
  .help-banner-content {
    width: 1200px;
    margin: 0 auto;
    .help-banner {
      align-items: flex-end;
    }
    .help-text {
      align-self: center;
      h5 {
        font-size: 36px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }
      p {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
.help-auto {
  width: 1200px;
  margin: 20px auto;
}
.help-search {
  width: 894px;
  margin: 20px auto;
  .el-input-group__append {
    border-radius: 30px;
  }
}
.problem .problem-item {
  background: #fff;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  margin: 10px 0;

  a {
    color: #6fcb6f;
  }
}
.input-with-content {
  // border: 1px #6fcb6f solid;
  outline: 0;
}
</style>
