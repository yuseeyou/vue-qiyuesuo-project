import axios, {AxiosInstance} from 'axios'
import router from "@/router";
import qs from 'qs';
import {handelError} from '@/utils'

const httpAxios: AxiosInstance = axios.create({
    timeout: 20000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    }
})


httpAxios.interceptors.request.use(
    config => {
        config.withCredentials = true;
        config.params = Object.assign(config.params || {}, {cb: timeStamp()})
        return config;
    }, error => {
        return Promise.reject(error);
    })


httpAxios.interceptors.response.use(
    response => {
        if (response?.data.code === 403) {
            handelError(response?.data?.message);
            router.push({name: 'Login'})
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data)
    }
)


// 获取时间戳
function timeStamp(): number {
    return new Date().getTime();
}


// 封装get请求
export function httpGet(url: string, params?: any) {
    return httpAxios.get(url, {
        params
    });
}

//封装post请求
export function httpPost(url: string, data?: any) {
    return httpAxios.post(url, qs.stringify(data), {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        }
    })
}
