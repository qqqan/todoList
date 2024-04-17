<template>
    <div class="layout-container">
        <div class="layout-header">
            <!-- 用户头像 -->
            <div class="header-avatar">
                <img src="" alt="">
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
                <MoreFilled style="margin-top: 1.0714rem;" />
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
    color: #6E6E6E;
    background-color: #F6F9FF;

}

.layout-main {
    flex: 1;
    height: 100vh;
    background-color: #fff;
}

.header-avatar {
    width: 2.1429rem;
    height: 2.1429rem;
    background-color: white;
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

// .layout-container {
//     display: flex;
//     flex-wrap: nowrap;
// }

// .menu {
//     position: relative;
//     width: 3.2143rem;
//     height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     color: #6E6E6E;
// }

// .header-avatar {
//     width: 2.1429rem;
//     height: 2.1429rem;
//     background-color: white;
//     margin-top: 1.7857rem;

//     img {
//         width: 100%;
//         height: 100%;
//     }
// }

// .header-menu {
//     width: 1.7857rem;

//     nav {
//         margin-top: 1.4286rem;
//     }

// }


// .header-more {
//     position: absolute;
//     bottom: 1.7857rem;
//     width: 1.7857rem;

// }

// .submenu {
//     border-right: 1px solid #C3C3C3;
// }</style>