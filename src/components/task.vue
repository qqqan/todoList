<template>
    <div class="task-item">
        <input type="checkbox" v-model="finished">
        <div class="task-item_title">{{ title }}</div>
        <div class="task-item_timer">
            {{ formattedDate }}
        </div>
        <div class="task-item_delete">
            <Delete @click="deleteTask()" style="cursor: pointer;" />
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, type PropType, inject } from 'vue'
import type { taskListType } from '@/api/taskLists/type';
import { reqDeleteTask } from '@/api/taskLists';
import { useCurrentTaskStore } from '@/stores/modules/tasks';

const props = defineProps<{
    task: taskListType
}>()

const finished = ref(props.task.finished)
const title = ref(props.task.title)
const date = ref(props.task.date)


// 修改日期展示模式
const formattedDate = computed(() => {
    let formDate = new Date(date.value)
    console.log(formDate)
    let year = formDate.getFullYear();
    let month = formDate.getMonth() + 1; // 月份从0开始，需要加1
    let day = formDate.getDate();

    return year + "年" + month + "月" + day + "日";
})

// 删除任务
const reload = inject('reload')
const currentTaskStore = useCurrentTaskStore()
const deleteTask = async () => {
    let result = await reqDeleteTask(props.task.id)
    if (result.code === 200) {
        console.log("删除任务成功")
        // 重置currentTask的内容，调整slider
        currentTaskStore.resetCurrentTask()
    }
    // 刷新页面
    reload()
}
</script>

<style scoped lang="scss">
.task-item {
    height: 2.8571rem;
    display: flex;
    align-items: center;
    border-radius: .3571rem;
}

.task-item:hover {
    background-color: var(--input-bg-color);
}


input[type=checkbox] {
    margin-left: 1.4286rem;
    margin-right: .7143rem;
    width: 1.1429rem;
    height: 1.1429rem;

}

.task-item_title {
    flex: 1;
}


.task-item_timer {
    margin-right: .7143rem;
    color: var(--main-color);
    font-size: .8571rem;

}

.task-item_delete {
    width: 1.4286rem;
    height: 1.4286rem;
    margin-right: .7143rem;
}
</style>