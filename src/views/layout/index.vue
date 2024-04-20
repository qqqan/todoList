<template>
    <div class="layout-container">
        <div class="layout-header">
            <!-- 用户头像 -->
            <div class="header-avatar">
                <img :src="userStore.avatar" alt="">
            </div>
            <!-- 导航栏 -->
            <div class="header-menu">
                <div class="header-navs">
                    <router-link to="/home">
                        <nav>
                            <list />
                        </nav>
                    </router-link>
                    <router-link to="/calender">
                        <nav>
                            <Collection />
                        </nav>
                    </router-link>
                    <router-link to="/more">
                        <nav>
                            <PieChart />
                        </nav>
                    </router-link>
                    <router-link to="/charts">
                        <nav>
                            <Search />
                        </nav>
                    </router-link>
                </div>
            </div>
            <div class="header-more">
                <!-- 刷新 -->
                <Refresh @click="refresh()" style="cursor: pointer;" />
                <!-- 退出 -->
                <router-link to="/setting">
                    <MoreFilled style="margin-top: 1.0714rem;" />
                </router-link>
            </div>
        </div>
        <div class="layout-main" v-if="isRouterActive">
            <router-view></router-view>
        </div>
    </div>


</template>

<script setup lang="ts">
import { inject } from 'vue';
// 实现无感刷新页面
import { provide, nextTick, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user';
const userStore = useUserStore()
const isRouterActive = ref(true)
provide('reload', () => {
    isRouterActive.value = false
    nextTick(() => {
        isRouterActive.value = true
    })
})

const reload = inject('reload')
function refresh() {
    reload()
}
</script>

<style scoped lang="scss">
.layout-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
}

.layout-header {
    position: relative;
    width: 3.2143rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);

}

.layout-main {
    flex: 1;
    height: 100vh;
    background-color: var(--bg-color);
    color: var(--text-color)
}

.header-avatar {
    width: 2.1429rem;
    height: 2.1429rem;
    background-color: var(--bg-color);
    margin-top: 1.7857rem;

    img {
        width: 100%;
        height: 100%;
    }
}

.header-menu {
    width: 1.7857rem;

    nav {
        margin-top: 1.4286rem;
    }

}


.header-more {
    position: absolute;
    bottom: 1.7857rem;
    width: 1.7857rem;

}
</style>