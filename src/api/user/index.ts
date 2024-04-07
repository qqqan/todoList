// 统一管理用户相关接口
import request from '@/utils/request'
import type {
    loginFormData,
    loginResponseData,
    userInfoResponseData
} from './type'

//项目用户相关的请求地址
enum API {
    LOGIN_URL = '/user',
    USERINFO_URL = '/userInfo'
}

//登录接口
export const reqLogin = (data: loginFormData) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
    request.get<any, userInfoResponseData>(API.USERINFO_URL)
// //退出登录
// export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
