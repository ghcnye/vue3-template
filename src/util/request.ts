import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'

// axios的配置项
const config = {
    // baseURL: import.meta.env.VITE_BASEURL,  
    baseURL: "/flowChart",  
    timeout: 10000
}
// 定义返回值类型
export interface Result<T = any> {
    status: number,
    msg: string,
    data: T
}

class Http {
    // axios的实例
    private instance: AxiosInstance;
    // 初始化的作用
    constructor(configs: AxiosRequestConfig) {
        // 创建axios的实例
        this.instance = axios.create(configs)
        // 配置拦截器
        this.interceptors()
    }
    private interceptors() {
        // 拦截请求
        this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            // 这里面可以设置请求头的信息，设置token等。。。
            let token = ''
            if (token && config) {
                config.headers!['token'] = token
            }
            return config
        }), (error: any) => {
            error.data = {}
            error.data.msg = '服务器异常请联系管理员'
            return error
        }
        // 拦截响应
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            // 这里面可以做一些接口返回状态的判断
            if (res.data.code == 200) {
                return res.data
            } else {
                return Promise.reject(res.data.msg || '接口报错')
            }
        }), (error: any) => {
            console.log('报错');
            return Promise.reject(error)
        }
    }
    // 下面是对几个请求方式的封装
    // post
    post<T = Result>(url: string, data?: object): Promise<T> {
        return this.instance.post(url, data)
    }
    //put
    put<T = Result>(url: string, data?: object): Promise<T> {
        return this.instance.put(url, data)
    }
    // get
    get<T = Result>(url: string, params?: object): Promise<T> {
        return this.instance.get(url, { params })
    }
    // delete
    delete<T = Result>(url: string): Promise<T> {
        return this.instance.delete(url)
    }
    // 图片上传
    upload<T = Result>(url: string, params?: object): Promise<T> {
        return this.instance.post(url, params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
export default new Http(config)