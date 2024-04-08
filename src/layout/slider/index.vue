<template>
    <div class="slider-container">
        <div class="slider-head">
            <input type="checkbox" v-model="currentList.finished" class="checkbox">
            <el-date-picker type="datetime" v-model="currentList.date" class="date"></el-date-picker>
        </div>
        <div class="slider-info">
            <el-input v-model="currentList.title" placeholder="上课" />
            <el-input v-model="currentList.desc" :autosize="{ minRows: 3 }" type="textarea" placeholder="地点：明理楼" />
        </div>
        <div class="slider-subtask">
            <div class="subtaskList" v-if="currentList && currentList.sublist.length != 0">
                <Subtask v-for="(item, index) in currentList.sublist" :key="item.sublistId" :subtaskList="item" />
            </div>
            <button>+添加子任务</button>
        </div>
        <button class="slider-save" @click="saveData()">保存</button>
    </div>
</template>

<script setup lang="ts">
import Subtask from '@/components/subtask.vue'
import type { listType } from '@/api/user/type'
import { ref, type PropType } from 'vue'

const props = defineProps({
    currentList: Object as PropType<listType>
})

function saveData() {
    console.log('保存信息')
}


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
    color: #111;


    .el-input {
        width: 100%;
        border-radius: .3571rem;
        background-color: #fff;
        border: 0;
        --el-input-text-color: #111;


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
        z-index: -1;
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

.slider-save {
    position: relative;
    left: 21.4286rem;
    top: 1.4286rem;
    width: 4.2857rem;
    height: 2.1429rem;
    font-size: 1.1429rem;
    background-color: #3F6DE6;
    color: #fff;
    border: 0;
    border-radius: .3571rem;


}
</style>