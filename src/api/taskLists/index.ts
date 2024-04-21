// 任务相关数据接口
import request from "@/utils/request";
import type { addTaskDataType, taskListsResponseData, taskListType, taskListResponseData, reqCalenderDataType, updateFinishedType } from "./type";
import { ca } from "element-plus/es/locales.mjs";


// 枚举地址
enum API {
    ADD_URL = '/tasklists',
    GETALL_URL = '/tasklists',
    DETAIL_URL = '/tasklists/detail',
    DELETE_URL = '/tasklists/delete',
    UPDATE_URL = '/tasklists/update',
    CALENDER_URL = '/tasklists/calender',
    UPDATEFINISHED_URL = '/tasklists/updateFinished'
}

// 添加
export const reqAddTask = (data: addTaskDataType) => request.post<addTaskDataType, any>(API.ADD_URL, data)


// 获取指定userId下全部任务数据
export const reqGetAllTask = (userId: number, category: string) => request.get<any, taskListsResponseData>(API.GETALL_URL, { params: { userId: userId, category: category } })


// 获取指定id的详情数据
export const reqGetDetail = (id: number) => request.get<any, taskListResponseData>(API.GETALL_URL, { params: { id: id } })


// 删除指定id任务
export const reqDeleteTask = (id: number) => request.delete<any, any>(API.DELETE_URL, { params: { id: id } })


// 修改指定id数据
export const reqUpdateTask = (data: taskListType) => request.patch<any, any>(API.UPDATE_URL, data)


// 获取calender页所需数据
export const reqCalender = (data: reqCalenderDataType) => request.post<any, any>(API.CALENDER_URL, data)

// 更新指定任务id的finished
export const reqFinished = (data: updateFinishedType) => request.patch<any, any>(API.UPDATEFINISHED_URL, data)