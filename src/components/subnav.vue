<template>
    <div class="subnav-item">
        <el-icon style="width: 1.4286rem;">
            <slot></slot>
        </el-icon>
        <h4>{{ title }}</h4>
        <!-- <p>{{ count }}</p> -->
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'count'])
</script>

<style lang="scss">
.subnav-item {
    height: 2.8571rem;
    display: flex;
    align-items: center;
    padding: 0 1.4286rem;

    h4 {
        margin-left: .7143rem;
        font-size: 1.1429rem;
    }
}
</style>