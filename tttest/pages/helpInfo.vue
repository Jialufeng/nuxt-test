<!--
 * @Author: your name
 * @Date: 2021-08-30 18:09:18
 * @LastEditTime: 2021-09-23 14:01:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/question.vue
-->
<template>
  <section class="question">
    <Header />
    <section class="banner">
      <section class="body-content">
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/help'}"> 帮助</el-breadcrumb-item>
        </el-breadcrumb>
        <section v-html="info.content" class="help-content"></section>
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
      subjectList: {}
    };
  },
  async asyncData({ $axios, params, redirect }) {
    const data = await $axios.post(url.getContentDetail, {
      id: params.id
    });

    return {
      info: data.data.result
    };
  },

  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.banner {
  // height: 500px;
  padding-top: 38px;
}
.body-content {
  width: 1200px;
  margin: 0 auto;
  .el-breadcrumb {
    span {
    }
  }
  .help-content {
    margin-top: 50px;
  }

}

</style>
