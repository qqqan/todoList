<template>
    <div class="task-item">
        <input type="checkbox" v-model="list.finished">
        <div class="task-item_title">{{ list.title }}</div>
        <div class="task-item_timer">
            {{ formattedDate }}
        </div>
        <div class="task-item_delete">
            <Delete />
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, type PropType } from 'vue'
import type { listsType } from '@/api/user/type'

const props = defineProps({
    list: Object as PropType<listsType>
})

const list = reactive<listsType>(props.list)
// 修改日期展示模式
const formattedDate = computed(() => {
    const date = new Date(list.date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();

    return year + "年" + month + "月" + day + "日";
})
</script>

<style scoped lang="scss">
.task-item {
    height: 2.8571rem;
    display: flex;
    align-items: center;
    border-radius: .3571rem;
}

.task-item:hover {
    background-color: #F9F9F9;
}


input[type=checkbox] {
    margin-left: 1.4286rem;
    margin-right: .7143rem;
    width: 1.1429rem;
    height: 1.1429rem;

}

.task-item_title {
    flex: 1;
}


.task-item_timer {
    margin-right: .7143rem;
    color: #3F6DE6;
    font-size: .8571rem;

}

.task-item_delete {
    width: 1.4286rem;
    height: 1.4286rem;
    margin-right: .7143rem;
}
</style>