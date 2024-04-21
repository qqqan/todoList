<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from './stores/modules/config';
import { onMounted } from 'vue';
const configStore = useConfigStore()
onMounted(() => {
    configStore.changeTheme(localStorage.getItem('Theme') ? localStorage.getItem('Theme') : 'base')
})
</script>

<style scoped></style>