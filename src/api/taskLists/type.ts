//定义任务相关数据的ts类型
//定义全部接口返回数据都拥有ts类型
export interface dataType {
    token?: string,
    code?: number,
    message?: string
}

export interface addTaskDataType {
    finished: boolean,
    title: string,
    desc: string,
    date: string,
    time: string,
    alarm: string,
    repeat: string,
    userId: number,
    finishedDate: string,
}

// 获取任务信息返回数据类型
export interface taskListType {
    id: number,
    finished?: boolean,
    title?: string,
    desc?: string,
    date?: string,
    time?: string,
    alarm?: string,
    repeat?: string,
    userId: number,
    finishedDate: string
}

export interface taskListsType {
    data: taskListType[] | []
}

export interface updateFinishedType {
    id: number,
    finished: boolean
}

//获取全部任务数据返回数据类型
export interface taskListsResponseData extends dataType {
    data: taskListType[] | []
}


// 获取单个任务详情返回数据类型
export interface taskListResponseData extends dataType {
    data: taskListType
}



export interface reqCalenderDataType {
    userId: number,
    year: number,
    month: number
}

