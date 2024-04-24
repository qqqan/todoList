<template>
    <div class="calender-container">
        <div class="calender-header">
            <el-icon>
                <DArrowLeft @click="() => { date = date.subtract(1, 'year') }" />
            </el-icon>
            <el-icon>
                <ArrowLeft @click="() => { date = date.subtract(1, 'month') }" />
            </el-icon>
            {{ year }}年{{ month + 1 }}月
            <el-icon>
                <ArrowRight @click="() => { date = date.add(1, 'month') }" />
            </el-icon>
            <el-icon>
                <DArrowRight @click="() => { date = date.add(1, 'year') }" />
            </el-icon>
            <button @click="console.log(groupedLists)">test</button>
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
                    <th v-for="(v, i) in days" :key="i" :class="v.status"
                        @click="active.date = v.date; emit('send-date', active.date.format('YYYY-MM-DD'));">
                        <div :class="{ 'active': checkSame(v) === true }" @click="show(v.date)">{{ v.date.date() }}
                        </div>
                        <div class="calender-table_list" v-if="groupedLists && isDone(v.date)"
                            v-for="(list, i) in groupedLists[v.date.format('YYYY-MM-DD')]" :key="i">
                            {{ list.title }}</div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { defineProps, ref, computed, inject, defineEmits, onMounted, watch } from 'vue';
interface dateType {
    date: dayjs.Dayjs,
    status: ""
}

function show(date) {
    console.log(date.format('YYYY-MM-DD'))
    console.log(groupedLists[date.format('YYYY-MM-DD')])
    console.log(groupedLists)
}

const props = defineProps({
    activeDate: {
        type: String,
        required: false
    },
    groupedLists: {
        type: Object,
        required: false
    }
})
const groupedLists = props.groupedLists

const date = ref(dayjs())
const activeDate = props.activeDate
const active = ref({
    date: activeDate ? dayjs(activeDate) : dayjs(),
    status: "active"
})
const year = computed(() => { return dayjs(date.value).year() })
const month = computed(() => { return dayjs(date.value).month() })
const week = computed(() => { return dayjs(date.value).day() })

function checkSame(nowDate: dateType) {
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
const emit = defineEmits(['send-date', "current-date"])

// 判定是否有数据
function isDone(date: dayjs.Dayjs) {
    if (groupedLists[date.format('YYYY-MM-DD')]) {
        console.log(date.format('YYYY-MM-DD'))
        console.log(groupedLists[date.format('YYYY-MM-DD')])
        return true
    }
    return false
}

onMounted(() => {
    emit('send-date', active.value.date.format('YYYY-MM-DD'))
})

watch(year, (newValue, oldValue) => {
    emit('current-date', `${year.value}-${month.value}`)
})

watch(month, (newValue, oldValue) => {
    emit('current-date', `${year.value}-${month.value}`)
})
</script>
<style>
.prev,
.next {
    color: var(--border-color);
}

.active {
    width: 1.4286rem;
    height: 1.4286rem;
    line-height: 1.4286rem;
    background-color: var(--main-color);
    color: #fff;
    border-radius: 1.0714rem;
}

.now {
    background-color: var(--active-color);
}

.calender-container {
    width: 100%;
    color: var(--text-color);
    display: flex;
    flex-direction: column;

    .el-icon {
        cursor: pointer;
    }
}


.calender-header {
    width: 100%;
    font-size: 1.1429rem;
    margin: 1.0714rem auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    .el-icon {
        width: 1.7857rem;
    }

}

.calender-table {
    width: 100%;

    .calender-table_weeks {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 2.1429rem;
        border-bottom: .0714rem solid #ccc;

        th {
            line-height: 2.1429rem;
        }

    }

    .calender-table_days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border-collapse: collapse;


        th {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: .3571rem;
            min-height: 2.1429rem;
        }

        th:hover {
            cursor: pointer;
        }
    }
}
</style>