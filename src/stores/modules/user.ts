// 创建用户相关的小仓库
import { reqLogin, reqLogout } from "@/api/users";
import type { dataType, reqUserForm, userInfoResponseData } from "@/api/users/type";
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token";
import { reqUserInfo } from "@/api/users";
import { defineStore } from "pinia";


// 创建用户小仓库
export const useUserStore = defineStore('User', {
    state: () => {
        return {
            token: GET_TOKEN(),
            phoneNum: "",
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            id: 0,
        }
    },
    actions: {
        async userLogin(data: reqUserForm) {
            const request: dataType = await reqLogin(data)
            if (request.code === 200) {
                this.token = request.token as string
                SET_TOKEN(request.token as string)
                console.log("设置token成功")
                console.log(this.token)
                return 'ok'
            } else {
                return Promise.reject(new Error(request.message))
            }
        },
        //获取用户信息
        async userInfo() {
            const request: userInfoResponseData = await reqUserInfo()
            if (request.code === 200) {
                console.log(request.data)
                this.phoneNum = request.data.phoneNum
                this.avatar = request.data.avatar ? request.data.avatar : this.avatar
                this.id = request.data.id
                return 'ok'
            } else {
                return Promise.reject(new Error(request.message))
            }
        },
        // 退出登录
        async userLogout() {
            const request: any = await reqLogout()
            if (request.code === 200) {
                this.token = ''
                this.id = 0
                this.phoneNum = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'ok'
            } else {
                return Promise.reject(new Error(request.message))
            }
        },
        clearUserInfo() {
            this.token = ""
            this.phoneNum = ""
            this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
            this.id = 0
        }
    }
})