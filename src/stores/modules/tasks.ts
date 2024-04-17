import { defineStore } from "pinia";

export const useCurrentTaskStore = defineStore('currentTask', {
    state() {
        return {
            currentTask: {
                "id": 0,
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
                "userId": 0
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