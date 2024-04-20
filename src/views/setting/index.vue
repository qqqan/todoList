<template>
    <div calss="setting-container">
        <div class="setting-userInfo">
            <div class="userInfo-avatar">
                <img :src="userStore.avatar" alt="">
            </div>
            <div class="userInfo-phoneNum">{{ userStore.phoneNum }}</div>
        </div>
        <div class="setting-theme">
            <h1>主题</h1>
            <button @click="configStore.changeTheme('base')">切换主题为base</button>
            <button @click="configStore.changeTheme('dark')">切换主题为dark</button>
            <button @click="configStore.changeTheme('sweet')">切换主题为sweet</button>
        </div>
        <div class="setting-logout" @click="logout()">
            <button>退出登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user';
import { useRouter } from 'vue-router';
import { useConfigStore } from '@/stores/modules/config';
const $router = useRouter()

const userStore = useUserStore()
const configStore = useConfigStore()
const logout = async () => {
    try {
        await userStore.userLogout()
        console.log("退出登录成功")
        $router.push({ path: '/' })
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
.setting-userInfo {
    img {
        width: 3.5714rem;
        height: 3.5714rem;
    }
}

.setting-theme {
    margin-top: 1.4286rem;

    h1 {
        font-size: 1.7143rem;
        font-weight: 700;
    }
}

.setting-logout {
    margin-top: 1.4286rem;

}
</style>