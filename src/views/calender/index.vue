<template>
    <!-- <div class="calender-container">
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
    </div> -->
    <div class="container">
        <Calender :grouped-lists="groupedLists" @current-date="saveCurrentDate">
        </Calender>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { defineProps, ref, computed, inject, defineEmits, onMounted, reactive } from 'vue';
import { reqCalender } from '@/api/taskLists';
import Calender from '@/components/calender.vue'

const year = ref(dayjs().year())
const month = ref(dayjs().month())
function saveCurrentDate(value: string) {
    year.value = Number(value.split('-')[0])
    month.value = Number(value.split('-')[1])
}

// 获取数据并渲染
let groupedLists = ref({})
const getCalenderInfo = async () => {
    let request = await reqCalender({ "userId": 1, "year": year.value, "month": month.value + 1 })
    if (request.code === 200) {
        groupedLists.value = request.data
    }
}


onMounted(() => {
    // emit('send-date', active.value.date.format('YY-MM-DD'))
    getCalenderInfo()
})



</script>
<style scoped lang="scss">
.container {
    height: 100vh;

    :deep(.calender-container) {
        height: 100vh;
    }

    :deep(.calender-header) {
        height: 2.1429rem;
        font-size: 1.7143rem;

        .el-icon {
            width: 2.1429rem;
        }
    }


    :deep(.calender-table_weeks) {
        height: 2.8571rem;
        grid-template-columns: repeat(7, minmax(14.2857rem, 1fr));
        grid-template-rows: 2.8571rem;

        th {
            font-size: 1.2857rem;
        }
    }

    :deep(.calender-table_days) {
        width: 100%;
        height: calc(100vh - 7.1429rem);

        th {
            min-height: 7.1429rem;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            align-items: start;
            overflow: auto;
            justify-content: flex-start;

            .calender-table_list {
                height: 1.7857rem;
                line-height: 1.7857rem;
            }
        }
    }
}
</style>