import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 5000000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })

    instance.interceptors.request.use(
        config => {
          if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
          }
       
          return config;
        },
        error => {
          return Promise.reject(error);
        });

    // console.log('xxxxxxxxxxxxxxx');
    return instance(config);
}