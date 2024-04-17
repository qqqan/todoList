<template>
    <div class="calender-container">
        <div class="calender-header">
            <el-icon>
                <DArrowLeft @click="() => { date = date.subtract(1, 'year') }" />
            </el-icon>
            <el-icon>
                <ArrowLeft @click="() => { date = date.subtract(1, 'month') }" />
            </el-icon>
            {{ year }} 年 {{ month + 1 }} 月
            <el-icon>
                <ArrowRight @click="() => { date = date.add(1, 'month') }" />
            </el-icon>
            <el-icon>
                <DArrowRight @click="() => { date = date.add(1, 'year') }" />
            </el-icon>
        </div>
        <div class="calender-table-container">
            <table class="calender-table">
                <tbody>
                    <tr class="calender-table_weeks">
                        <th>周日</th>
                        <th>周一</th>
                        <th>周二</th>
                        <th>周三</th>
                        <th>周四</th>
                        <th>周五</th>
                        <th>周六</th>
                    </tr>
                    <tr class="calender-table_days">
                        <th v-for="(v, i) in days" :key="i">
                            <div> {{ v.date.date() }}</div>
                            <div class="calender-table_list" v-if="isDone(v.date)"
                                v-for="(list, i) in groupedLists[v.date.format('YYYY-MM-DD')]" :key="i">
                                {{ list.title }}</div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { defineProps, ref, computed, inject, defineEmits, onMounted, reactive } from 'vue';
import { reqCalender } from '@/api/taskLists';
interface dateType {
    date: dayjs.Dayjs,
    status: ""
}

const date = ref(dayjs())
const active = ref({
    date: date.value,
    status: "active"
})
const year = computed(() => { return dayjs(date.value).year() })
const month = computed(() => { return dayjs(date.value).month() })
const week = computed(() => { return dayjs(date.value).day() })

function checkSame(nowDate: dateType) {
    console.log(nowDate)
    return active.value.date.year() === nowDate.date.year() &&
        active.value.date.month() === nowDate.date.month() &&
        active.value.date.date() === nowDate.date.date()
}

// 获取前一个月天数
function getPrevMonthDays() {
    const firstDayOfMonth = dayjs().year(year.value).month(month.value).startOf('month')
    const firstDayWeek = dayjs(firstDayOfMonth).day()
    const prevMonthDays = []
    for (let i = firstDayWeek; i > 0; i--) {
        prevMonthDays.push({
            date: firstDayOfMonth.subtract(i, 'day'),
            status: 'prev'
        })
    }
    return prevMonthDays
}

// 获取当前月天数
function getCurrentMonthDays() {
    const curDayOfMonth = dayjs().year(year.value).month(month.value).daysInMonth()
    const curMonthDays = []
    for (let i = 1; i <= curDayOfMonth; i++) {
        curMonthDays.push({
            date: dayjs().year(year.value).month(month.value).date(i),
            status: 'current'
        })
    }
    return curMonthDays
}

// 获取下一个月天数
function getNextMonthDays() {
    const lastDayOfMonth = dayjs().year(year.value).month(month.value).endOf('month')
    const lastDayWeek = dayjs(lastDayOfMonth).day()
    const nextMonthDays = []
    for (let i = 1; i <= 6 - lastDayWeek; i++) {
        nextMonthDays.push({
            date: lastDayOfMonth.add(i, 'day'),
            status: 'next'
        })
    }

    return nextMonthDays
}

const days = computed(() => {
    return [...getPrevMonthDays(), ...getCurrentMonthDays(), ...getNextMonthDays()]
})

// 向父组件传递选定的日期信息
const emit = defineEmits(['send-date'])

// 获取数据并渲染
let groupedLists = ref({})
const getCalenderInfo = async () => {
    let request = await reqCalender({ "userId": 1, "year": year.value, "month": month.value + 1 })
    if (request.code === 200) {
        groupedLists.value = request.data
    }
}

function isDone(date: dayjs.Dayjs) {
    if (groupedLists.value[date.format('YYYY-MM-DD')]) {
        console.log(date.format('YYYY-MM-DD'))
        console.log(groupedLists.value[date.format('YYYY-MM-DD')])
        return true
    }
    return false
}

onMounted(() => {
    emit('send-date', active.value.date.format('YY-MM-DD'))
    getCalenderInfo()
})



</script>
<style>
.prev,
.next {
    color: #C0C0C0;
}

.active {
    background-color: #4772FA;
    color: #fff;
    border-radius: 1.0714rem;
}

.now {
    background-color: yellow;
}

.calender-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .el-icon {
        cursor: pointer;
    }
}


.calender-header {
    width: 100%;
    height: 30px;
    font-size: 1.7143rem;
    margin: 1.0714rem auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    .el-icon {
        width: 2.1429rem;
    }
}

.calender-table {
    width: 100%;

    .calender-table_weeks {
        width: 100%;
        height: 2.8571rem;
        display: grid;
        grid-template-columns: repeat(7, minmax(14.2857rem, 1fr));
        grid-template-rows: 2.8571rem;
        border-bottom: .0714rem solid #ccc;

        th {
            font-size: 1.2857rem;
            line-height: 2.8571rem;
        }

    }

    .calender-table_days {
        width: 100%;
        height: calc(100vh - 7.1429rem);
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border-collapse: collapse;


        th {
            min-height: 7.1429rem;
            cursor: pointer;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: .3571rem;
            overflow: auto;

            .calender-table_list {
                height: 1.7857rem;
                line-height: 1.7857rem;
            }
        }

        th:hover {
            cursor: pointer;
        }
    }
}
</style>