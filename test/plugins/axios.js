/*
 * @Author: your name
 * @Date: 2021-08-28 14:13:17
 * @LastEditTime: 2021-09-03 16:22:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/plugins/axios.js
 */
import { Message } from 'element-ui';
export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });
  $axios.onResponse(response => {
    if(response.data.code == 500) {
      Message({
        message: response.data.message,
        type: 'error'
      });
    }
    console.log(response.data)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 500) { 
      console.log('500')
    }
    if (code === 400) {
      redirect("/400");
    }
  });
}
