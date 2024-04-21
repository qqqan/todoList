<template>
    <div class="layout-menu">
        <Subnav title="今天" count="2" :class="{ submenu_selected: isActive === 1 ? true : false }"
            @click="currentTaskStore.changeCategory('today'), isActive = 1">
            <Notebook style="width: inherit;" />
        </Subnav>
        <Subnav title="最近七天" count="10" :class="{ submenu_selected: isActive === 2 ? true : false }"
            @click="currentTaskStore.changeCategory('thisDays'), isActive = 2">
            <Tickets style="width: inherit;" />
        </Subnav>
        <Subnav title="全部" count="20" :class="{ submenu_selected: isActive === 3 ? true : false }"
            @click="currentTaskStore.changeCategory('all'), isActive = 3">
            <FolderChecked style="width: inherit;" />
        </Subnav>
    </div>
</template>

<script setup lang="ts">
import Subnav from '@/components/subnav.vue'
import { ref } from 'vue';
import { useCurrentTaskStore } from '@/stores/modules/tasks';
const isActive = ref(1)
const currentTaskStore = useCurrentTaskStore()
</script>

<style scoped lang="scss">
.submenu_selected {
    background-color: var(--input-bg-color);
    color: var(--text-color);
    font-weight: 700;
    border-radius: .3571rem;
}

.layout-menu {
    width: 17.8571rem;
    height: 100vh;
    background-color: var(--bg-color);
    border-right: 1px solid var(--border-color);
    padding: 1.4286rem 0;
}
</style>