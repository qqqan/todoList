// 用户相关数据接口
import request from '@/utils/request'
import type { reqUserForm, userInfoResponseData } from './type'

// 枚举地址
enum API {
    REGISTER_URL = '/users',
    LOGIN_URL = '/users/login',
    LOGOUT_URL = '/users/logout',
    USERINFO_URL = '/users'
}

// 注册接口
export const reqRegister = (data: reqUserForm) => request.post<any, any>(API.REGISTER_URL, data)

// 登录接口
export const reqLogin = (data: reqUserForm) => request.post<any, userInfoResponseData>(API.LOGIN_URL, data)

// 退出登录
// 退出登录传入token即可，token本来应该在请求拦截器中自动添加，此时还没设置
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)

export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
