<template>
    <div class="selector">
        <div class="selector-header">
            <el-icon class="el-input__icon" style="position: relative;" v-if="!(!exist && task.date)">
                <Calendar @click="show = !show" style="cursor: pointer;" />
            </el-icon>
            <div class="showDate" v-if="task.date" @click="show = !show" style="cursor: pointer;">{{ formatDate(
                task.date) }} {{ task.time }}
            </div>
        </div>
        <div class="selector-container" v-if="show === true">
            <div class="selector-title">日期</div>
            <!-- <Calender @send-date="(value) => { task.date = value }" /> -->
            <Calender :active-date="task.date" @send-date="(value) => { task.date = value }" />
            <div class="selector-time">
                <CustomSelect :options="timeOptions" placeholder="时间" @send-data="(value) => { task.time = value }"
                    :selected="task.time">
                    <template #prev>
                        <el-icon>
                            <Clock />
                        </el-icon>
                    </template>
                </CustomSelect>
            </div>
            <div class="selector-alarm">
                <CustomSelect :options="alarmOptions" placeholder="提示" @send-data="(value) => { task.alarm = value }"
                    :selected="task.alarm">
                    <template #prev>
                        <el-icon>
                            <AlarmClock />
                        </el-icon>
                    </template>
                </CustomSelect>
            </div>
            <div class="selector-repeat">
                <CustomSelect :options="repeatOptions" placeholder="重复" @send-data="(value) => { task.repeat = value }"
                    :selected="task.repeat">
                    <template #prev>
                        <el-icon>
                            <Link />
                        </el-icon>
                    </template>
                </CustomSelect>
            </div>
            <div class="selector-button">
                <button @click="confirm()">确定</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Calender from './calender.vue';
import CustomSelect from './customSelect.vue';
import { ref } from 'vue'
import dayjs from 'dayjs';
import { useNewTaskStore } from '@/stores/modules/tasks';
import { storeToRefs } from 'pinia';
import type { taskListType } from '@/api/taskLists/type';
import type { PropType } from 'vue';

const props = defineProps({
    exist: {
        type: Boolean,
        default: false,
        required: false
    },
    task: {
        type: Object as PropType<taskListType>,
        default: {
            "id": 0,
            "finished": false,
            "title": "",
            "desc": "",
            "date": "",
            "time": "",
            "alarm": "",
            "repeat": "",
            "userId": 0,
            "finishedDate": ""
        },
        required: false
    }
})

const show = ref(false) //控制是否显示下拉框
const exist = props.exist // 控制是否同时显示
// const task = props.task //传过来的task信息

// 生成时间列表
function generateTimeList() {
    const startTime = dayjs().startOf('day')
    const endTime = dayjs().endOf('day')
    const timeList = []

    let currentTime = startTime
    while (currentTime.isBefore(endTime)) {
        timeList.push(currentTime.format('HH:mm'))
        currentTime = currentTime.add(30, 'minute')
    }

    return timeList
}
const timeOptions = generateTimeList()
const alarmTimeOptions = ["准时", "提前5分钟", "提前30分钟", "提前1小时", "提前1天"]
const alarmOptions = ["当天 (9:00)", "提前1天 (9:00)", "提前2天 (9:00)", "提前3天 (9:00)", "提前1周 (9:00)"]
const repeatOptions = ["每天", "每周", "每月", "每年", "法定工作日"]

const emit = defineEmits(['send-info'])

// 渲染时间格式转换
function formatDate(YYYY_MM_DD: string) {
    if (YYYY_MM_DD) {
        // 将 YYYY-MM-DD 格式的日期字符串解析成 Date 对象
        const dateParts = YYYY_MM_DD.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // 月份从 0 开始，需要减去 1
        const day = parseInt(dateParts[2], 10);

        const date = new Date(year, month, day);

        // 使用 Date 对象的方法获取年、月、日
        const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

        return formattedDate;
    }
}

// 点击确定时将数据传到父组件
// const newTaskStore = useNewTaskStore()
// const { newTask } = storeToRefs(newTaskStore)

// // 确认时更新store里的数据并关闭窗口
// function confirm() {
//     show.value = !show.value
//     newTaskStore.$patch({
//         newTask: newTask.value
//     })
// }

// 确认
function confirm() {
    show.value = !show.value
}



</script>

<style lang="scss" scoped>
.selector {
    position: relative;
    z-index: 10;
}


.selector-header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    .showDate {
        color: var(--main-color);
        margin-left: .7143rem;
    }
}

.selector-container {
    position: absolute;
    width: 18.5714rem;
    top: 1.4286rem;
    left: -50%;
    padding: 1.0714rem;
    background-color: var(--bg-color);
    box-shadow: .3rem .3rem 1rem rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.selector-title {
    width: 60%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: .3571rem;
    background-color: var(--input-bg-color);
    margin: .3571rem auto;
}

.selector-button {
    display: flex;
    justify-content: end;
}

button {
    width: 4.2857rem;
    height: 2.1429rem;
    border-radius: .3571rem;
    border: 0;
    background-color: var(--main-color);
    color: var(--bg-color);
    margin-top: .3571rem;
    cursor: pointer;
}
</style>