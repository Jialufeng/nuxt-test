/*
 * @Author: your name
 * @Date: 2021-09-17 20:40:16
 * @LastEditTime: 2021-09-18 00:22:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/ecosystem.config.js
 */
module.exports = {
  apps: [
    {
      name: 'NuxtAppName', // 
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
