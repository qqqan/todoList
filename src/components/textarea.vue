<!-- 自适应高度textarea：
    1. 根据输入内容自动调整高度
    2. 如果设置最小和最大行数，在最大行数内会自动调整高度，超过最大行数会出现滚动条 -->
<template>
    <textarea :placeholder="placeholder" ref="textAreaRef" :value="value"
        @input="$emit('update:value', $event.target.value)" :rows="minRow ?? 1"></textarea>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
const props = defineProps({
    placeholder: String,
    autoSize: [Boolean, Object],
    value: String
})
const emit = defineEmits(['update:value'])

let { minRow, maxRow } = props?.autoSize
const textAreaRef = ref<HTMLTextAreaElement>(null)
const content = ref("")

function adjustTextareaSize() {
    let textarea = textAreaRef.value
    textarea.style.height = 'auto'
    if (maxRow) {
        textarea.style.maxHeight = maxRow * 24 + 'px'
    }
    const height = textarea.scrollHeight

    if (height) {
        textarea.style.height = height + 'px'
        const rowsNum = Math.round(height / 24)
        textarea.style.overflowY = rowsNum > maxRow ? 'scroll' : 'hidden'
    }
}

onMounted(() => {
    props.autoSize && nextTick(adjustTextareaSize)
})

watch(() => content.value, () => {
    props.autoSize && nextTick(adjustTextareaSize)
})
</script>

<style scoped>
textarea {
    max-width: 100%;
    height: auto;
    min-height: 2.2857rem;
    vertical-align: bottom;
    resize: none;
    overflow: hidden;
    background-color: var(--input-bg-color);
    border-radius: .3571rem;
}
</style>