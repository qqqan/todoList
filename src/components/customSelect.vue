<template>
    <div class="custom-select">
        <div class="selected-option" @click="toggleDropdown">
            <div class="slot-prev">
                <slot name="prev"></slot>
            </div>
            {{ selectedOption || placeholder }}
            <el-icon>
                <ArrowDown v-if="isOpen" />
                <ArrowRight v-else />
            </el-icon>
        </div>
        <div class="select-options" v-if="isOpen">
            <ul class="options">
                <li v-for="(option, index) in options" :key="index"
                    @click="selectOption(option); emit('send-data', selectedOption)"
                    :class="{ 'active': option === selectedOption }">
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Select an option'
    }
})

const isOpen = ref(false)
const selectedOption = ref(null)

function toggleDropdown() {
    isOpen.value = !isOpen.value
}

function selectOption(option) {
    selectedOption.value = option
    isOpen.value = false
}

const emit = defineEmits(['send-data'])

</script>

<style scoped lang="scss">
.custom-select {
    width: inherit;
    position: relative;
}

.selected-option {
    cursor: pointer;
    display: flex;
    align-items: center;

    .slot-prev {
        display: flex;
        align-items: center;
        margin-right: .3571rem;
    }

    .el-icon {
        position: absolute;
        right: 0;
    }
}

.select-options {
    position: absolute;
    width: 100%;
    border-radius: .3571rem;
    background-color: #fff;
    box-shadow: .3rem .3rem 1rem rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.options {
    width: 100%;
    padding: .1429rem;
    max-height: 14.2857rem;
    overflow: auto;

    li {
        padding-left: .7143rem;
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 0 .2143rem;
        border-radius: .2143rem;
        cursor: pointer;
    }

    li:hover {
        background-color: #F8F8F8;
    }
}

.active {
    background-color: #fff;
    color: #4772FA;
}
</style>