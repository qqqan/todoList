import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'  //全局样式
import '@/styles/theme.scss'  // 主题样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './permission' //引入路由鉴权文件
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import pinia from './stores'
import 'element-plus/theme-chalk/dark/css-vars.css' //暗黑模式
app.use(pinia)
app.use(router)

app.mount('#app')
