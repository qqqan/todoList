<template>
    <div class="main-container">
        <div class="main-center">
            <div class="main-head">
                <el-icon :size="24">
                    <Expand />
                </el-icon>
                <h1>今天</h1>
            </div>
            <div class="main-add">
                <el-input v-model="title" placeholder="+添加任务">
                    <template #suffix>
                        <el-icon class="el-input__icon">
                            <calendar />
                        </el-icon>
                    </template>
                </el-input>
            </div>
            <div class="main-tasks">
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    已过期
                </button>
                <Task />
                <Task />
                <Task />
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    今天
                </button>
                <Task />
                <Task />
                <Task />
                <button>
                    <el-icon style="margin-right: .3571rem;">
                        <ArrowRight />
                    </el-icon>
                    已完成
                </button>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />

            </div>
        </div>
        <div class="slider">
            <Slider></Slider>
        </div>
    </div>

</template>

<script setup lang="ts">
import Slider from '../slider/index.vue'
import { ref } from 'vue'
import Task from '@/components/task.vue'
const title = ref('')
</script>

<style scoped lang="scss">
.main-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.main-center {
    flex-grow: 1;
    padding: 2.1429rem 1.4286rem;
    border-right: 1px solid #C3C3C3;

    .main-head {
        display: flex;

        h1 {
            font-size: 1.7143rem;
            font-weight: 700;
            margin-left: .7143rem;
        }

    }

    .main-add {
        width: 100%;
        margin: 1.4286rem auto;

        .el-input {
            width: 100%;
            height: 2.8571rem;
            padding: 1.4286rem;
            border-radius: .3571rem;
            background-color: #F3F4F7;
            border: 0;

            ::v-deep .el-input__wrapper {
                background-color: #F3F4F7;
                box-shadow: none;
            }

        }
    }


    .main-tasks {
        width: 100%;
        height: calc(100% - 5.7143rem);
        overflow: auto;

        button {
            width: 100%;
            background-color: #fff;
            height: 2.1429rem;
            display: flex;
            align-items: center;
            font-weight: 700;
            border: 0;
        }
    }
}
</style>