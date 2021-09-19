<!--
 * @Author: your name
 * @Date: 2021-08-31 23:22:26
 * @LastEditTime: 2021-09-18 13:55:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/contact.vue
-->
<template>
  <section class="contact">
    <Header />
    <section class="contact-content" v-html="list.content">
      <!-- <h5>湖南三文在线教育科技集团有限公司</h5>
      <section class="contact-text">
        <p>电子信箱：admin@xxx.com</p>
        <p>QQ号码: 12345667</p>
        <p>联系电话：111111111</p>
        <p>工作时间：工作日早9：00至18：00</p>
        <p>联系地址：北京朝阳</p>
      </section> -->
    </section>

    <Footer />
  </section>
</template>
<script>
import { url } from "../util";
export default {
  data() {
      return {
          list: null,
      }
  },
  async fetch() {
    const data = await this.$axios.post(url.getContentList, {
        type: 1,
    });
    this.list = data.data.result[0]
    console.log(data.data.result)
  },
  created() {
    this.$fetch();
  }
};
</script>

<style lang="scss">
.contact-content {
  width: 1200px;
  margin: 50px auto;
  h5 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .contact-text {
    p {
      font-size: 16px;
      color: #4c4c4c;
      line-height: 30px;
      font-weight: 500;
    }
  }
}
</style>
