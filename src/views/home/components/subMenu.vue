<template>
    <div class="layout-menu">
        <Subnav title="今天" count="2">
            <Notebook style="width: inherit;" />
        </Subnav>
        <Subnav title="最近七天" count="10">
            <Tickets style="width: inherit;" />
        </Subnav>
        <Subnav title="全部" count="20">
            <FolderChecked style="width: inherit;" />
        </Subnav>
    </div>
</template>

<script setup lang="ts">
import Subnav from '@/components/subnav.vue'
</script>

<style scoped lang="scss">
.layout-menu {
    width: 17.8571rem;
    height: 100vh;
    background-color: #fff;
    border-right: 1px solid #C3C3C3;
}
</style>