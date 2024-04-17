// 二次封装axios
import axios from "axios";
import { ElMessage } from "element-plus";
const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-type": "application/json"
    },
    timeout: 5000,
})

// 请求拦截器


// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        let message = ''
        const status = error.response.status
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
                break
        }
        ElMessage({
            type: 'error',
            message,
        })
        return Promise.reject(error)
    }
)

export default request