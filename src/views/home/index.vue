<template>
    <div class="home-container">
        <div class="home-submenu">
            <SubMenu></SubMenu>
        </div>
        <div class="home-main">
            <Main></Main>
        </div>
        <div class="home-silder">
            <Slider v-if="isActive"></Slider>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SubMenu from './components/subMenu.vue'
import Main from './components/main.vue'
import Slider from './components/slider.vue'
import { ref, provide, nextTick } from 'vue'

// 实现无感刷新
const isActive = ref(true)
provide('reloadSubTask', () => {
    isActive.value = false
    nextTick(() => {
        isActive.value = true
    })
})
</script>

<style scoped lang="scss">
.home-container {
    display: flex;
    height: 100vh;
}

.home-submenu {
    width: 17.8571rem;
}

.home-main {
    flex: 1;
}

.home-slider {
    width: 28.5714rem;
}
</style>