//定义任务相关数据的ts类型
//定义全部接口返回数据都拥有ts类型
export interface dataType {
    token?: string,
    code?: number,
    message?: string
}

// 新增子任务数据信息
export interface addSubTaskDataType {
    finished: boolean,
    title: string,
    date: string,
    time: string,
    taskId: number
}

// 获取任务信息返回数据类型
export interface subTaskType {
    id: number,
    finished?: boolean,
    title?: string,
    date?: string,
    time?: string,
    taskId: number
}

//获取全部任务数据返回数据类型
export interface subTasksResponseData extends dataType {
    data: subTaskType[] | []
}



