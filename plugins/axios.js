/*
 * @Author: your name
 * @Date: 2021-08-28 14:13:17
 * @LastEditTime: 2021-08-28 15:13:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/plugins/axios.js
 */
export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400");
    }
  });
}
