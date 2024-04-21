<template>
    <div class="main-container">
        <div class="main-center">
            <div class="main-head">
                <el-icon :size="24">
                    <Expand />
                </el-icon>
                <h1>{{ submenu.title }}</h1>
            </div>
            <div class="main-add">
                <el-input v-model="newTaskStore.newTask.title" placeholder="+添加任务" @keyup.enter="saveNewTask()">
                    <template #suffix>
                        <Selector />
                    </template>
                </el-input>
            </div>
            <div class="main-tasks">
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    已过期
                </button>
                <div class="taskContainer">
                    <Task v-for="task in lisUsed" :key="task.id" :task="task" @click="updateCurrentStore(task)" />
                </div>
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    {{ submenu.title }}
                </button>
                <div class="taskContainer">
                    <Task v-for="task in lisToday" :key="task.id" :task="task" @click="updateCurrentStore(task)" />
                </div>
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    已完成
                </button>
                <div class="taskContainer">
                    <Task v-for="task in lisFinished" :key="task.id" :task="task" @click="updateCurrentStore(task)" />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { addTaskDataType, taskListType, taskListsType, taskListsResponseData } from '@/api/taskLists/type';
import { reqGetAllTask, reqAddTask } from '@/api/taskLists';
import { useCurrentTaskStore, useNewTaskStore } from '@/stores/modules/tasks';
import { storeToRefs } from 'pinia';

const userId = ref(1)  //当前用户id
let tasklists = ref<taskListType[]>([]) //全部任务信息
let lisToday = ref<taskListType[]>([])   //今天
let lisFinished = ref<taskListType[]>([])  // 今天已完成
let lisUsed = ref<taskListType[]>([])   // 过去未完成
let lisUsedFinished = ref<taskListType[]>([])

// category:all,thisDays,today
const getAllTasks = async () => {
    // 清空当前list
    lisToday.value = []
    lisFinished.value = []
    lisUsed.value = []
    lisUsedFinished.value = []
    let result: taskListsResponseData = await reqGetAllTask(userId.value, submenu.value.category)
    if (result.code === 200) {
        tasklists.value = result.data
        console.log(tasklists.value)
    }
    divideTask()
}


// 分别划分任务为已过期、今天、已完成、过去已完成
function divideTask() {
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    tasklists.value.forEach(function (item) {
        let date = new Date(item.date)
        date.setHours(0, 0, 0, 0)
        if (date < currentDate) {
            item.finished === false ? lisUsed.value.push(item) : lisUsedFinished.value.push(item)
        } else {
            item.finished === false ? lisToday.value.push(item) : lisFinished.value.push(item)
        }
    })
}

const currentTaskStore = useCurrentTaskStore()
const { submenu } = storeToRefs(currentTaskStore)
function updateCurrentStore(task: taskListType) {
    currentTaskStore.currentTask = task
}


// 新Task相关逻辑
const newTaskStore = useNewTaskStore()
// 创建提交新Task
const saveNewTask = async () => {
    newTaskStore.newTask.userId = userId.value
    // 重设date格式
    if (newTaskStore.newTask.date) {
        const dateParts = newTaskStore.newTask.date.split('-');
        let year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // 月份从 0 开始，需要减去 1
        const day = parseInt(dateParts[2], 10);
        if (year < 100) {
            // 假设 100 年之前的日期是 20xx 年
            year += 2000;
        }
        const date = new Date(year, month, day);
        newTaskStore.newTask.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    // 调用接口添加新任务
    let request = await reqAddTask(newTaskStore.newTask)
    if (request.code == 200) {
        console.log("添加任务成功")
        // 渲染数据到页面
        let currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)
        let date = new Date(request.data.date)
        date.setHours(0, 0, 0, 0)
        if (date < currentDate) {
            request.data.finished === false ? lisUsed.value.push(request.data) : lisUsedFinished.value.push(request.data)
        } else {
            request.data.finished === false ? lisToday.value.push(request.data) : lisFinished.value.push(request.data)
        }
        // 重置store里的newTask数据
        newTaskStore.resetNewTask()
    }
}


onMounted(() => {
    getAllTasks()
})

watch(submenu.value, (newValue, oldValue) => {
    console.log("submenu发生了变化", newValue)
    getAllTasks()
})


</script>

<style scoped lang="scss">
.main-container {
    width: 100%;
    min-width: 35.7143rem;
    height: 100%;
    display: flex;
}

.main-center {
    flex-grow: 1;
    padding: 2.1429rem 1.4286rem;

    .main-head {
        display: flex;

        h1 {
            font-size: 1.7143rem;
            font-weight: 700;
            margin-left: .7143rem;
        }

    }

    .main-add {
        width: 100%;
        margin: 1.4286rem auto;

        .el-input {
            width: 100%;
            height: 2.8571rem;
            padding: 1.4286rem;
            border-radius: .3571rem;
            background-color: var(--input-bg-color);
            border: 0;
            --el-component-size: 14px;

            ::v-deep .el-input__wrapper {
                background-color: var(--input-bg-color);
                box-shadow: none;
            }

        }
    }


    .main-tasks {
        width: 100%;
        height: calc(100% - 5.7143rem);
        overflow: auto;

        button {
            width: 100%;
            background-color: var(--bg-color);
            height: 2.1429rem;
            display: flex;
            align-items: center;
            font-weight: 700;
            border: 0;
        }
    }
}
</style>