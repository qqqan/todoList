<template>
    <div class="login">
        <div class="login-bg"><img src="@/assets/images/bg.svg" alt=""></div>
        <div class="login-container">
            <div class="login-title">Done List</div>
            <el-form class="login-form" :model="loginForm" :rules="rules">
                <el-form-item prop="phoneNum">
                    <el-input v-model="loginForm.phoneNum" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input v-model="loginForm.pass" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
const loginForm = reactive({
    phoneNum: '',
    pass: ''
})

const validatorPhoneNumber = (rule: any, value: any, callback: any) => {
    if (/^1\d{10}$/.test(value)) {
        callback();
    } else {
        callback(new Error('手机号格式不正确'))
    }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback();
    } else {
        callback(new Error('密码长度至少六位'))
    }
}
const rules = {
    phoneNum: [{ trigger: 'change', validator: validatorPhoneNumber }],
    pass: [{ trigger: 'change', validator: validatorPassword }]
}

</script>

<style scoped lang="scss">
.login {
    display: flex;
}

.login-bg {
    width: 60%;
    height: 100vh;
    background-color: #E3ECFF;
    display: flex;
    justify-content: center;

    img {
        width: 60%;
    }
}

.login-container {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login-title {
        font-size: 4.2857rem;
        font-weight: 700;
        color: #4B6FDE;
    }

    .login-form {
        width: 60%;
        margin-top: 3.5714rem;

        .el-form-item {
            margin-bottom: 1.4286rem;
        }

        .el-input {
            height: 2.8571rem;
        }

        .el-button {
            width: 100%;
            height: 2.8571rem;
            background-color: #4B6FDE;
            font-size: 1.4286rem;
            color: #fff;


        }
    }
}
</style>