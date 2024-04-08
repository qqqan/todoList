<template>
    <div class="selector">
        <el-icon class="el-input__icon" style="position: relative;">
            <Calendar @click="show = true" style="cursor: pointer;" />
        </el-icon>
        <div class="selector-container" v-if="show === true">
            <div class="selector-title">日期</div>
            <Calender />
            <div class="selector-time">我是时间选择器</div>
            <div class="selector-alarm">我是提醒</div>
            <div class="selector-repeat">我是重复</div>
        </div>
    </div>
</template>

<script setup>
import Calender from './calender.vue';
import { ref } from 'vue'

const show = ref(false)
</script>

<style lang="scss" scoped>
.selector {
    position: relative;
}

.selector-container {
    position: absolute;
    top: 1.4286rem;
    left: -8.5714rem;
    width: 17.8571rem;
    height: 35.7143rem;
    background-color: pink;
    color: #111;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: .7143rem;
}

.selector-title {
    width: 60%;
    height: 28px;
    line-height: 2rem;
    border-radius: .3571rem;
    align-self: center;
    background-color: #F3F3F3;
}
</style>