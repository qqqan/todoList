<template>
    <div class="custom-select">
        <div class="selected-option" @click="toggleDropdown">
            <div class="slot-prev">
                <slot name="prev"></slot>
            </div>
            <h1 :class="{ selected: selectedOption !== '' }">{{ selectedOption || placeholder }}</h1>
            <el-icon class="selected-option_icon">
                <ArrowDown v-if="isOpen" />
                <ArrowRight v-else />
            </el-icon>
        </div>
        <div class="select-options" v-if="isOpen">
            <ul class="options">
                <li v-for="(option, index) in options" :key="index"
                    @click="selectOption(option); emit('send-data', selectedOption)"
                    :class="{ 'select_active': option === selectedOption }">
                    {{ option }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    selected: {
        type: String,
        default: ""
    }
})

const isOpen = ref(false)
const selectedOption = ref(props.selected)

function toggleDropdown() {
    isOpen.value = !isOpen.value
}

function selectOption(option: any) {
    selectedOption.value = option
    isOpen.value = false
}

const emit = defineEmits(['send-data'])

</script>

<style lang="scss">
.selected {
    color: var(--main-color);
}

.custom-select {
    width: inherit;
    position: relative;
    margin: 1.0714rem 0;
    color: var(--text-color);
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

    .selected-option_icon {
        position: absolute;
        right: 0;
    }
}

.select-options {
    position: absolute;
    width: 100%;
    border-radius: .3571rem;
    background-color: var(--bg-color);
    box-shadow: .3rem .3rem 1rem rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.options {
    width: 100%;
    padding: .1429rem;
    max-height: 14.2857rem;
    overflow: auto;

    li {
        height: 2.1429rem;
        line-height: 2.1429rem;
        padding-left: .7143rem;
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 0 .2143rem;
        border-radius: .2143rem;
        cursor: pointer;
    }

    li:hover {
        background-color: var(--input-bg-color);
    }
}

.select_active {
    background-color: var(--input-bg-color);
    color: var(--main-color);
}
</style>