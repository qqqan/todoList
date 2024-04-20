<template>
    <div class="subtask-item">
        <input type="checkbox" v-model="subTask.finished">
        <input type="text" v-model="subTask.title">
        <div class="subtask-item_timer">
            <AlarmClock />
        </div>
        <div class="subtask-item_delete">
            <Delete @click="deleteSubTask()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { subTaskType } from '@/api/subTasks/type';
import { reqDeleteSubTask } from '@/api/subTasks';

const props = defineProps<{
    subTask: subTaskType
}>()

const subTask = ref(props.subTask)

// 删除数据
const reloadSubTask = inject("reloadSubTask")
const deleteSubTask = async () => {
    let request = await reqDeleteSubTask(subTask.value.id)
    if (request.code === 200) {
        console.log("子任务删除成功")
        // 刷新列表
        reloadSubTask()
    }
}
</script>

<style scoped lang="scss">
.subtask-item {
    height: 2.8571rem;
    // background-color: pink;
    display: flex;
    align-items: center;
}

input[type=checkbox] {
    margin-right: .7143rem;
    width: 1.1429rem;
    height: 1.1429rem;
    background-color: var(--input-bg-color);
    color: var(--input-bg-color);
}

input[type=checkbox]::after {
    background-color: var(--main-color);
}

input[type=checkbox]:checked {
    background-color: var(--main-color);
}

input[type=text] {
    width: 21.4286rem;
    border: 0;
    border-bottom: 1px solid var(--border-color);
    font-size: 1.1429rem;
    height: 2.8571rem;
    background-color: var(--bg-color);
}

input[type=text]:focus {
    border-bottom: 2px solid var(--main-color);
}

.subtask-item_timer {
    width: 1.4286rem;
    height: 1.4286rem;
    margin-right: .7143rem;
}

.subtask-item_delete {
    width: 1.4286rem;
    height: 1.4286rem;
}
</style>