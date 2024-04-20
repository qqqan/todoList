// 二次封装axios
import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import router from "@/router";
const request = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-type": "application/json"
    },
    timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers.token = userStore.token
        }
        return config
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        const userStore = useUserStore()
        let message = ''
        const status = error.response.status
        switch (status) {
            case 401:
                console.log("token过期")
                message = 'TOKEN过期'
                // 清除token信息，跳转到登录页
                localStorage.removeItem('token')
                userStore.clearUserInfo()
                router.push('/')
                break
            case 403:
                message = '无权访问'
                console.log("无权访问")
                // 清除token信息，跳转到登录页
                localStorage.removeItem('token')
                userStore.clearUserInfo()
                router.push('/')
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