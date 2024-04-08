import { defineStore } from "pinia";
import { computed, ref } from 'vue'
export const useUserStore = defineStore("user", {
    state: () => ({ count: 0 }),
    getters: {
        double: (state) => state.count * 2
    },
    actions: {
        increment() {
            this.count++
        }
    }
})