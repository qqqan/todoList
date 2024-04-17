// 任务相关数据接口
import request from "@/utils/request";
import type { addSubTaskDataType, subTasksResponseData, subTaskType } from "./type";


// 枚举地址
enum API {
    ADD_URL = '/subtasks',
    GETALL_URL = '/subtasks',
    DELETE_URL = '/subtasks/delete',
    UPDATE_URL = '/subtasks/update'
}

// 添加
export const reqAddSubTask = (data: addSubTaskDataType) => request.post<addSubTaskDataType, any>(API.ADD_URL, data)


// 获取指定taskId下全部任务数据
export const reqGetAllSubTask = (taskId: number) => request.get<any, subTasksResponseData>(API.GETALL_URL, { params: { taskId: taskId } })


// 删除指定id任务
export const reqDeleteSubTask = (id: number) => request.delete<any, any>(API.DELETE_URL, { params: { id: id } })

// 修改指定id数据
export const reqUpdateSubTask = (data: subTaskType) => request.patch<any, any>(API.UPDATE_URL, data)
