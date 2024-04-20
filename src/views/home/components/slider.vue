<template>
    <div class="slider-container">
        <div class="slider-container_type1" v-if="selected">
            <div class="slider-head">
                <input type="checkbox" v-model="currentTask.finished" class="checkbox">
                <Selector></Selector>
                <!-- <el-date-picker type="datetime" v-model="currentTask.date" class="date"></el-date-picker> -->
            </div>
            <div class="slider-info">
                <input class="slider-info_title" type="text" v-model="currentTask.title" placeholder="标题"> </input>
                <Textarea class="slider-info_desc" :placeholder="placeholder" :value="currentTask.desc"
                    @update:value="currentTask.desc = $event" :autoSize="true"></Textarea>
            </div>
            <div class="slider-subtask" :key="state.updateKey">
                <div class="subtaskList" v-if="subTasks && subTasks.length != 0">
                    <Subtask v-for="item in subTasks" :key="item.id" :subTask="item" />
                </div>
                <button class="slider-addTask" @click="addSubTask()">+添加子任务</button><br>
                <button class="slider-save" @click="saveData()">保存</button>
            </div>
        </div>
        <div class="slider-container_type2" v-else>
            <h1>请选择一个task查看详情</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import Subtask from '@/components/subtask.vue'
import { onMounted, ref, watch, inject, reactive, provide, nextTick } from 'vue'
import { useCurrentTaskStore } from '@/stores/modules/tasks';
import { storeToRefs } from 'pinia';
import type { taskListType } from '@/api/taskLists/type';
import type { subTasksResponseData, subTaskType } from '@/api/subTasks/type';
import { reqGetAllSubTask, reqAddSubTask } from '@/api/subTasks';
import Textarea from '@/components/textarea.vue';
import Selector from '@/components/selector.vue';

const currentTaskStore = useCurrentTaskStore()
const { currentTask } = storeToRefs(currentTaskStore)
const subTasks = ref<subTaskType[]>([])
const selected = ref(currentTask.value.id ? true : false)
const state = reactive({ updateKey: 0 })
const placeholder = "描述"


// 获取子任务列表
const getSubTasks = async (taskId: number) => {
    let request: subTasksResponseData = await reqGetAllSubTask(taskId)
    if (request.code === 200) {
        subTasks.value = []
        request.data.forEach((item) => {
            subTasks.value.push(item)
        })
        console.log("!!!", subTasks.value)
    }
}

onMounted(() => {
    console.log("slider组件挂载")
    getSubTasks(currentTask.value.id)
})

// 监听当前任务是否发生变化
watch(() => currentTask.value, (newValue, oldValue) => {
    if (currentTask.value.id) {
        getSubTasks(currentTask.value.id)
        selected.value = true
        newSubTask.value.taskId = currentTask.value.id
    }
})

const newSubTask = ref({
    finished: false,
    title: "",
    date: "",
    time: "",
    taskId: currentTask.value.id
})

// 添加子任务
const reload = inject('reload')
const addSubTask = async () => {
    let request = await reqAddSubTask(newSubTask.value)
    if (request.code === 200) {
        console.log("任务添加成功")
        // 通过修改列表渲染的key实现强制更新界面
        getSubTasks(currentTask.value.id)
    }
}

// 更新任务信息
function saveData() {
    console.log('保存信息')
}


</script>

<style scoped lang="scss">
.slider-container {
    width: 28.5714rem;
    height: 100vh;
    color: var(--text-color);
    border-left: 1px solid var(--border-color);
}

.slider-container_type1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.slider-head {
    height: 4.2857rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);

    .checkbox {
        margin: 0 1.4286rem;
        width: 1.4286rem;
        height: 20px;
    }
}

.slider-info {
    border-bottom: 1px solid var(--border-color);
    padding: .7143rem .7143rem 0;
    color: var(--text-color);

    input {
        width: 100%;
        border-radius: .3571rem;
        background-color: var(--bg-color);
        border: 0;
    }

    .slider-info_title {
        font-size: 1.4286rem;
    }

    .slider-info_desc {
        width: 100%;
        margin: 10px 0;
        border: 0;
    }

}

.slider-subtask {
    flex: 1;
    position: relative;
    width: 100%;
    padding: 0 1.4286rem;
    // height: calc(100vh - 15rem);
    overflow: auto;

    .slider-addTask {
        margin-top: .7143rem;
        color: var(--main-color);
        background-color: var(--bg-color);
        border: 0;
    }

    .slider-save {
        position: relative;
        top: 2.1429rem;
        left: 20rem;
        width: 4.2857rem;
        height: 2.1429rem;
        font-size: 1.1429rem;
        background-color: var(--main-color);
        color: var(--bg-color);
        border: 0;
        border-radius: .3571rem;
    }
}
</style>