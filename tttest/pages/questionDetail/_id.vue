<!--
 * @Author: your name
 * @Date: 2021-09-05 15:26:10
 * @LastEditTime: 2021-09-05 15:54:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/pages/question/_id.vue
-->
<template>
  <div>
    <h1>{{ id }}</h1>
    <p>Path: {{ $route.path }}</p>
  </div>
</template>
<script>
  export default {
    async asyncData({ params }) {
      const id = params.id
      return { id }
    },
  }
</script>
