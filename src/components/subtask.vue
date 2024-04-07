<template>
    <div class="subtask-item">
        <input type="checkbox">
        <input type="text">
        <div class="subtask-item_timer">
            <AlarmClock />
        </div>
        <div class="subtask-item_delete">
            <Delete />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps(['title', 'count'])
</script>

<style scoped lang="scss">
.subtask-item {
    height: 2.8571rem;
    // background-color: pink;
    display: flex;
    align-items: center;
}

input[type=checkbox] {
    margin-right: .7143rem;
    width: 1.1429rem;
    height: 1.1429rem;
}

input[type=text] {
    width: 21.4286rem;
    border: 0;
    border-bottom: 1px solid #C3C3C3;
    font-size: 1.1429rem;
    height: 2.8571rem;
}

input[type=text]:focus {
    border-bottom: 2px solid #3F6DE6;
}

.subtask-item_timer {
    width: 1.4286rem;
    height: 1.4286rem;
    margin-right: .7143rem;
}

.subtask-item_delete {
    width: 1.4286rem;
    height: 1.4286rem;
}
</style>