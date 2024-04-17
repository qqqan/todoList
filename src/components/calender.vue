<template>
    <div class="calender-container">
        <div class="calender-header">
            <el-icon>
                <DArrowLeft @click="() => { date = date.subtract(1, 'year') }" />
            </el-icon>
            <el-icon>
                <ArrowLeft @click="() => { date = date.subtract(1, 'month') }" />
            </el-icon>
            <span>{{ year }}年{{ month + 1 }}月</span>
            <el-icon>
                <ArrowRight @click="() => { date = date.add(1, 'month') }" />
            </el-icon>
            <el-icon>
                <DArrowRight @click="() => { date = date.add(1, 'year') }" />
            </el-icon>
        </div>
        <table class="calender-table">
            <tbody>
                <tr class="calender-table_weeks">
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
                <tr class="calender-table_days">
                    <th v-for="(v, i) in days" :key="i" :class="[v.status, { 'active': checkSame(v) === true }]"
                        @click="active.date = v.date; emit('send-date', active.date.format('YY-MM-DD'))">{{
                            v.date.date() }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { defineProps, ref, computed, inject, defineEmits, onMounted } from 'vue';
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

onMounted(() => {
    emit('send-date', active.value.date.format('YY-MM-DD'))
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

    .el-icon {
        cursor: pointer;
    }
}

.calender-header {
    width: 100%;
    margin: 1.0714rem auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon {
        width: 1.4286rem;
    }
}

.calender-table {
    th {
        width: 2.1429rem;
    }

    .calender-table_weeks {
        display: flex;
        justify-content: center;
    }

    .calender-table_days {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        th {
            width: 2.1429rem;
            height: 2.1429rem;
            line-height: 2.1429rem;
            text-align: center;
        }

        th:hover {
            cursor: pointer;
        }
    }
}
</style>