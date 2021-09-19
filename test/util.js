/*
 * @Author: your name
 * @Date: 2021-08-24 13:59:26
 * @LastEditTime: 2021-09-18 14:07:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tomexam/util.js
 */

const serverUrl= 'http://120.24.180.140:8888';
const Random = Math.random();



const url = {
    bannerList:  'web/api/sysBanner/show', // banner
    getRecommendedList:  'web/api/bankLibrary/getRecommendedList', //  推荐列表
    randomImage: 'sys/randomImage/',
    subjectList: 'web/api/bankLibrary/getSubjectBankLibraryList', // 题库列表
    login: 'web/api/user/login', // login
    loginPwd: 'web/api/user/loginPwd',
    getContentList: '/web/api/sysContent/getContentList',
    topicsList: 'web/api/subjectBank/getSubjectBankList', //题目列表
    sendSecurityCode:'web/api/user/sendSecurityCode', // 短信发送
    registered: 'web/api/user/registered', // 注册
    rediscoverPwd: 'web/api/user/rediscoverPwd', //找回密码
    getSubjectBankLibraryDetail: 'web/api/bankLibrary/getSubjectBankLibraryDetail', //题库详情
    loginOut: 'web/api/user/loginOut', // 登出
    getContentDetail:'web/api/sysContent/getContentDetail', //帮助详情
    getSubjectBankDetail: 'web/api/subjectBank/getSubjectBankDetail', // 题目详情
    
}


import axios from "axios";

// const getRequest = function (url, method, data) {
//     return new Promise((resolve, reject) => {
//         axios({
//                 url: serverUrl + url,
//                 method: method,
//                 data: data,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then((res) => {
//                 resolve(res.data)
//             })
//             .catch((err) => {
               
//             })
//     })
// }



export {
    url,
    Random
    // getRequest,
}