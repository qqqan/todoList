<template>
    <div class="layout-container">
        <div class="layout-head">

            <Head></Head>
        </div>
        <div class="layout-main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Head from './head/index.vue'
import Main from './main/index.vue'

</script>

<style scoped>
.layout-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
}

.layout-head {
    width: 21.0714rem;
    height: 100vh;
    background-color: #F6F9FF;

}

.layout-main {
    flex: 1;
    height: 100vh;
    background-color: #fff;
}
</style>