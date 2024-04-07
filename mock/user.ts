// 创建用户数据
function createUserList() {
    return [
        {

            userId: 1,
            phoneNum: "18782494197",
            password: "111111",
            username: "七安",
            avatar: "https: //wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            token: "user token",
            lists: [
                {
                    listId: "1-1",
                    finished: false,
                    title: "学习前端",
                    desc: "html css javascript",
                    date: "2024.04.07",
                    time: "12:00",
                    alarm: "提前1小时",
                    repeat: "每天",
                    sublist: [
                        {
                            sublistId: "1-1-1",
                            finished: true,
                            title: "学习html",
                            date: "2024.04.07",
                            time: "12:00"
                        },
                        {
                            sublistId: "1-1-2",
                            finished: true,
                            title: "学习css",
                            date: "2024.04.07",
                            time: "12:00"
                        },
                        {
                            sublistId: "1-1-3",
                            finished: false,
                            title: "学习javascript",
                            date: "2024.04.07",
                            time: "12:00"
                        }
                    ]
                },
                {
                    listId: "1-2",
                    finished: true,
                    title: "饥荒攻略",
                    desc: "",
                    date: "2024.04.07",
                    time: "",
                    alarm: "",
                    repeat: "",
                    sublist: []
                },
                {
                    listId: "1-3",
                    finished: false,
                    title: "种地",
                    desc: "回家帮忙种地",
                    date: "2024.04.04",
                    time: "",
                    alarm: "",
                    repeat: "",
                    sublist: []
                }
            ],

        },
        {
            userId: 2,
            phoneNum: "15198282332",
            password: "111111",
            username: "二孬",
            avatar: "https: //wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            token: "user token",
            lists: []
        }
    ]
}


export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: { checkUser } }
        },
    },
]