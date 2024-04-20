import { useUserStore } from "./stores/modules/user";
import pinia from './stores'
import router from "./router";

const userStore = useUserStore(pinia)
// 全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    //to:将要访问哪儿
    //from:从哪儿来
    //next：路由放行函数
    const token = userStore.token
    const id = userStore.id

    if (token) {
        // 登陆成功，访问登录页时不可以访问，直接跳转到首页
        if (to.path == '/') {
            next({ path: '/home' })
        } else {
            //其余时候如果有用户信息就放行
            if (id) {
                next()
            } else {
                try {
                    console.log(userStore.token)
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    await userStore.userLogout()
                    next({ path: '/', query: { redirect: to.path } })
                }
            }
        }
    } else {
        // 用户未登录判断
        if (to.path == '/') {
            next()
        } else {
            next({ path: '/', query: { redirect: to.path } })
        }
    }
})
