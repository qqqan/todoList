<!-- <template>
    <div class="father">
        <h3>父组件</h3>
        <Child @send-toy="saveToy"/>
        <div>孩子给的玩具：{{ toy }}</div>
    </div>
</template>

<script setup lang="ts" name="Father">
import Child from './Child.vue'
import { ref } from 'vue'

const toy = ref('')
function saveToy(value: string) {
    toy.value = value
}
</script> -->

<template>
    <div class="father">
        <h3>子组件</h3>
        <h4>玩具：{{ toy }}</h4>
        <button @click="emit('send-toy', toy)">给爸爸玩具</button>
    </div>
</template>

<script setup lang="ts" name="Child">
import { ref } from 'vue'

const toy = ref('奥特曼')
const emit = defineEmits(['send-toy'])
</script>