<template>
    <div class="subnav-item">
        <el-icon style="width: 1.4286rem;">
            <slot></slot>
        </el-icon>
        <h4>{{ title }}</h4>
        <p>{{ count }}</p>
        <button @click="getUserInfo">获取用户信息</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps(['title', 'count'])
import request from '@/utils/request';
function getUserInfo() {
    request({
        url: "/userInfo"
    }).then(response => {
        console.log(response)
    })
}
</script>

<style scoped lang="scss">
.subnav-item {
    position: relative;
    width: 17.8571rem;
    padding: 1.4286rem .7143rem 0;
    display: flex;
    align-items: center;

    h4 {
        padding-left: .7143rem;
        font-size: 1.1429rem;
    }

    p {
        position: absolute;
        right: 1.4286rem;
        float: right;
    }

}
</style>