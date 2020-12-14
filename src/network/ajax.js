import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000000
})

instance.interceptors.request.use(config => {
    // console.log(config);
    return config;
})

instance.interceptors.response.use(config => {
    // console.log(config);
    return config.data;
})


// 添加请求拦截器，在请求头中加token
// instance.interceptors.request.use(
//     config => {
//       if (localStorage.getItem('Authorization')) {
//         config.headers.Authorization = localStorage.getItem('Authorization');
//       }
   
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     });



export default {
    $get: (url,params) => instance.get(url,{params: params}),
    $post: (url,params) => instance.post(url,params),
    $delete: (url,params) => instance.delete(url,{params: params}),
}

