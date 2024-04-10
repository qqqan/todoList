<template>
    <div class="main-container">
        <div class="main-center">
            <div class="main-head">
                <el-icon :size="24">
                    <Expand />
                </el-icon>
                <h1>今天</h1>
            </div>
            <div class="main-add">
                <el-input v-model="title" placeholder="+添加任务">
                    <template #suffix>
                        <Selector @send-info="saveInfo" />
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
                    <Task v-for="(list, index) in lisUsed.data" :key="index" :list="list" @click="showInfo(list)" />
                </div>
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    今天
                </button>
                <div class="taskContainer">
                    <Task v-for="(list, index) in lisToday.data" :key="index" :list="list" @click="showInfo(list)" />
                </div>
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    已完成
                </button>
                <div class="taskContainer">
                    <Task v-for="(list, index) in lisFinished.data" :key="index" :list="list" @click="showInfo(list)" />
                </div>
            </div>

            <div class="test">
                <button @click="getInfo">GET</button>
            </div>
        </div>
        <div class="slider">
            <Slider :currentList="currentList"></Slider>
        </div>
    </div>

</template>

<script setup lang="ts">
import Slider from '../slider/index.vue'
import Selector from '@/components/selector.vue'
import { ref, reactive, onMounted, toRefs, toRef } from 'vue'
import Task from '@/components/task.vue'
import request from '@/utils/request';
import type { listsType, userInfoType, listType } from '@/api/user/type'
import axios from 'axios';



interface timeInfoType {
    date: string,
    time: string,
    alarm: string,
    repeat: string,
}

let showDetail = ref(false)
let userInfo = ref<userInfoType>({
    id: 0,
    username: "",
    avatar: "",
    lists: []
}) //所有用户信息
let avatar = ref<string>("") // 头像
let lists = ref<listsType>({ data: [] }) //所有任务
const title = ref('')
let lisToday = ref<listsType>({ data: [] })  //今天
let lisFinished = ref<listsType>({ data: [] })  // 今天已完成
let lisUsed = ref<listsType>({ data: [] })  // 过去未完成
let lisUsedFinished = ref<listsType>({ data: [] })
// 分别划分任务为已过期、今天、已完成、过去已完成
function divideTask() {
    let currentDate = new Date()
    lists.value.data.forEach(function (item) {
        let date = new Date(item.date + "T" + item.time + ":00")
        if (date < currentDate) {
            item.finished === false ? lisUsed.value.data.push(item) : lisUsedFinished.value.data.push(item)
        } else {
            item.finished === false ? lisToday.value.data.push(item) : lisFinished.value.data.push(item)
        }
    })
}

function getUserInfo() {
    request({
        url: "/userInfo"
    }).then(response => {
        userInfo.value = response[0]
        avatar.value = userInfo.value.avatar
        lists.value.data = userInfo.value.lists
        divideTask()
    })
}


let currentList = ref<listType>({
    listId: 0,
    finished: false,
    title: "",
    date: "",
    time: "",
    sublist: [],
    desc: "",
    alarm: "准时",
    repeat: '无',
})

function showInfo(list: listType) {
    currentList.value = lists.value.data.find(item => item.listId === list.listId)
}

onMounted(() => {
    getUserInfo()
})

const newTask = ref({
    finished: false,
    title: "",
    desc: "",
    date: "",
    time: "",
    alarm: "",
    repeat: "",
    sublist: []
})

function saveInfo(value: timeInfoType) {
    console.log("Upperdate", value)
    newTask.value.date = value.date
    newTask.value.time = value.time
    newTask.value.alarm = value.alarm
    newTask.value.repeat = value.repeat

}

function getInfo() {
    axios({
        method: 'POST',
        url: "http://localhost:3000/userInfo?userId=1",
        data: {
            newTask
        }
    }).then(response => {
        console.log(response)
    })
}
</script>

<style scoped lang="scss">
.main-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.main-center {
    flex-grow: 1;
    padding: 2.1429rem 1.4286rem;
    border-right: 1px solid #C3C3C3;

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
            background-color: #F3F4F7;
            border: 0;

            ::v-deep .el-input__wrapper {
                background-color: #F3F4F7;
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
            background-color: #fff;
            height: 2.1429rem;
            display: flex;
            align-items: center;
            font-weight: 700;
            border: 0;
        }
    }
}
</style>