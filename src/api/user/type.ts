//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
    phoneNum: string,
    password: string
}

//定义全部接口返回数据都拥有ts类型
export interface dataType {
    message?: string
    token?: string
}

// 定义用户数据接口返回数据类型
export interface sublistType {
    sublistId: string,
    finished: boolean,
    title: string,
    date: string | '',
    time: string | '14:30'
}

export interface listType {
    listId: number,
    finished: boolean,
    title: string,
    desc: string | "",
    date: string,
    time: string,
    alarm: string | "准时",
    repeat: string | '无',
    sublist: sublistType[] | []
}

export interface listsType {
    data: listType[] | []
}


export interface userInfoType {
    userId: number,
    username: string,
    avatar: string,
    lists: listType[] | []
}



//定义登录接口返回数据类型
export interface loginResponseData extends dataType {
    code: number,
    data: dataType
}

//定义获取用户信息返回数据类型
export interface userInfoResponseData extends dataType {
    code: number,
    data: userInfoType
}