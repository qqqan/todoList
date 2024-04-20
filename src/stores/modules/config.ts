// 设置相关数据
import { defineStore } from "pinia";

export const useConfigStore = defineStore('config', {
    state() {
        return {
            theme: localStorage.getItem("Theme") || "base"
        }
    },
    actions: {
        changeTheme(theme: string) {
            document.documentElement.setAttribute('theme', theme)
            this.theme = theme
            localStorage.setItem('Theme', theme)
        }
    }
})