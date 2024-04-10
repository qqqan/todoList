<template>
    <div class="selector">
        <el-icon class="el-input__icon" style="position: relative;" v-if="showDate === false">
            <Calendar @click="show = !show" style="cursor: pointer;" />
        </el-icon>
        <div class="showDate" v-else @click="show = !show" style="cursor: pointer;">{{ formatDate(toUpperInfo.date) }}
            {{
                toUpperInfo.time }}</div>
        <div class="selector-container" v-if="show === true">
            <div class="selector-title">日期</div>
            <Calender @send-date="(value) => { toUpperInfo.date = value }" />
            <div class="selector-time">
                <CustomSelect :options="timeOptions" placeholder="时间"
                    @send-data="(value) => { toUpperInfo.time = value }">
                    <template #prev>
                        <el-icon>
                            <Clock />
                        </el-icon>
                    </template>
                </CustomSelect>
            </div>
            <div class="selector-alarm">
                <CustomSelect :options="alarmOptions" placeholder="提示"
                    @send-data="(value) => { toUpperInfo.alarm = value }">
                    <template #prev>
                        <el-icon>
                            <AlarmClock />
                        </el-icon>
                    </template>
                </CustomSelect>
            </div>
            <div class="selector-repeat">
                <CustomSelect :options="repeatOptions" placeholder="重复"
                    @send-data="(value) => { toUpperInfo.repeat = value }">
                    <template #prev>
                        <el-icon>
                            <Link />
                        </el-icon>
                    </template>
                </CustomSelect>
            </div>
            <div class="selector-button">
                <button @click="confirm(), emit('send-info', toUpperInfo)">确定</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Calender from './calender.vue';
import CustomSelect from './customSelect.vue';
import { ref } from 'vue'
import dayjs from 'dayjs';

const show = ref(false)
const showDate = ref(false)
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

// 需要传递给上层的信息
const toUpperInfo = ref({
    date: '',
    time: '',
    alarm: '',
    repeat: '',
})

const emit = defineEmits(['send-info'])
function confirm() {
    show.value = !show.value
    showDate.value = !showDate.value
    console.log(show.value)
    console.log(showDate.value)
}

// 渲染事件格式转换
function formatDate(yyMMdd) {
    // 将 YY-MM-DD 格式的日期字符串解析成 Date 对象
    const dateParts = yyMMdd.split('-');
    let year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // 月份从 0 开始，需要减去 1
    const day = parseInt(dateParts[2], 10);

    // 根据实际情况处理年份
    if (year < 100) {
        // 假设 100 年之前的日期是 20xx 年
        year += 2000;
    }

    const date = new Date(year, month, day);

    // 使用 Date 对象的方法获取年、月、日
    const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

    return formattedDate;
}
</script>

<style lang="scss" scoped>
.selector {
    position: relative;
}

.showDate {
    color: #4772FA;
}

.selector-container {
    position: absolute;
    top: 1.4286rem;
    left: -8.5714rem;
    width: 17.8571rem;
    color: #111;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: .7143rem;
    box-shadow: .3rem .3rem 1rem rgba(0, 0, 0, 0.5);
    background-color: #fff;
    z-index: 10;
}

.selector-title {
    width: 60%;
    height: 28px;
    line-height: 2rem;
    border-radius: .3571rem;
    align-self: center;
    background-color: #F3F3F3;
}

.selector-time,
.selector-alarm,
.selector-repeat {
    width: 100%;
}

.selector-button {
    align-self: self-end;

    button {
        width: 60px;
        height: 2.1429rem;
        border-radius: .3571rem;
        border: 0;
        background-color: #4772FA;
        color: #fff;
        margin-top: .3571rem;
        cursor: pointer;
    }
}
</style>