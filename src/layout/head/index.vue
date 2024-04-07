<template>
    <div class="layout-head-container">
        <div class="menu">
            <!-- 用户头像 -->
            <div class="head-avatar">
                <img src="" alt="">
            </div>
            <!-- 导航栏 -->
            <div class="head-menu">
                <div class="head-navs">
                    <nav>
                        <list />
                    </nav>
                    <nav>
                        <Collection />
                    </nav>
                    <nav>
                        <PieChart />
                    </nav>
                    <nav>
                        <Search />
                    </nav>
                </div>
            </div>
            <div class="head-more">
                <!-- 刷新 -->
                <Refresh />
                <!-- 退出 -->
                <MoreFilled style="margin-top: 1.0714rem;" />
            </div>
        </div>
        <div class="submenu">
            <Menu></Menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from '../menu/index.vue'
//刷新
const updateRefresh = () => {
    console.log("刷新")
}
</script>

<style scoped>
.layout-head-container {
    display: flex;
    flex-wrap: nowrap;
}

.menu {
    position: relative;
    width: 3.2143rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #6E6E6E;
}

.head-avatar {
    width: 2.1429rem;
    height: 2.1429rem;
    background-color: white;
    margin-top: 1.7857rem;

    img {
        width: 100%;
        height: 100%;
    }
}

.head-menu {
    width: 1.7857rem;

    nav {
        margin-top: 1.4286rem;
    }

}


.head-more {
    position: absolute;
    bottom: 1.7857rem;
    width: 1.7857rem;

}

.submenu {
    border-right: 1px solid #C3C3C3;
}
</style>