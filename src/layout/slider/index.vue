<template>
    <div class="slider-container">
        <div class="slider-head">
            <input type="checkbox" v-model="checked" class="checkbox">
            <el-date-picker type="datetime" v-model="value" class="date"></el-date-picker>
        </div>
        <div class="slider-info">
            <el-input v-model="input" placeholder="上课" />
            <el-input v-model="textarea" :autosize="{ minRows: 3 }" type="textarea" placeholder="地点：明理楼" />
        </div>
        <div class="slider-subtask">
            <Subtask />
            <button>+添加子任务</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Subtask from '@/components/subtask.vue'

const checked = ref(true)
const value = ref(new Date)
const input = ref('')
const textarea = ref('')
</script>

<style scoped lang="scss">
.slider-container {
    width: 28.5714rem;
    height: 100vh;
    color: #111;
}

.slider-head {
    height: 4.2857rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #C3C3C3;

    .checkbox {
        margin: 0 1.4286rem;
        width: 1.4286rem;
        height: 20px;
    }
}

.slider-info {
    border-bottom: 1px solid #C3C3C3;
    padding: .7143rem .7143rem 0;


    .el-input {
        width: 100%;
        border-radius: .3571rem;
        background-color: #fff;
        border: 0;


        ::v-deep .el-input__wrapper {
            background-color: #fff;
            box-shadow: none;
            font-size: 1.2857rem;
            font-weight: 700;
            color: #111;
        }

    }

    .el-textarea {
        width: 100%;
        border-radius: .3571rem;
        background-color: #fff;
        border: 0;
        --el-input-hover-border-color: #fff;
        --el-input-focus-border-color: #fff;
        --el-input-border-color: #fff;
        --el-border-color: #fff;
    }
}

.slider-subtask {
    padding: 0 1.4286rem;

    button {
        margin-top: .7143rem;
        color: #3F6DE6;
        background-color: #fff;
        border: 0;
    }
}
</style>