<template>
    <div class="task-item">
        <input type="checkbox">
        <div class="task-item_title">体测</div>
        <div class="task-item_timer">
            2024年4月1日
        </div>
        <div class="task-item_delete">
            <Delete />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps(['title', 'count'])
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