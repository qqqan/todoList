//定义用户相关数据的ts类型
//用户登录接口携带参数的ts类型
export interface reqUserForm {
    phoneNum: string,
    password: string
}

//定义全部接口返回数据都拥有ts类型
export interface dataType {
    token?: string,
    code?: number,
    message?: string
}

export interface userInfoType {
    id: number,
    phoneNumber: string,
    password: string,
    avatar: string
}

//定义获取用户信息返回数据类型
export interface userInfoResponseData extends dataType {
    data: userInfoType
}