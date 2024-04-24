import type { taskListType } from "@/api/taskLists/type";
import { defineStore } from "pinia";


export const useCurrentTaskStore = defineStore('currentTask', {
    state() {
        return {
            submenu: {
                category: "today",
                title: '今天',
                unfold: true
            },

            currentTask: {
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
            } as taskListType
        }
    },
    actions: {
        resetCurrentTask() {
            this.currentTask = {
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
            }
        },
        changeCategory(category: string) {
            this.submenu.category = category
            switch (category) {
                case "today":
                    this.submenu.title = "今天"
                    break
                case "thisDays":
                    this.submenu.title = "最近七天"
                    break
                case "all":
                    this.submenu.title = "全部"
            }
        }
    },
    persist: true
})


export const useNewTaskStore = defineStore('newTask', {
    state() {
        return {
            newTask: {
                "finished": false,
                "title": "",
                "desc": "",
                "date": "",
                "time": "",
                "alarm": "",
                "repeat": "",
                "userId": 0
            }
        }
    },
    actions: {
        resetNewTask() {
            this.newTask = {
                "finished": false,
                "title": "",
                "desc": "",
                "date": "",
                "time": "",
                "alarm": "",
                "repeat": "",
                "userId": 0
            }
        }
    }
})