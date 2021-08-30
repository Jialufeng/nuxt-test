
const serverUrl= 'http://120.24.180.140:8888';



const url = {
    bannerList:  'web/api/sysBanner/show', // banner
    getRecommendedList:  'web/api/bankLibrary/getRecommendedList', //  推荐列表
    randomImage: 'sys/randomImage/'+Math.random()
    
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
    // getRequest,
}