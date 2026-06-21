<template>
    <button
        type="button"
        class=" p-2 bg-gray-800 active:scale-95 transition text-sm text-gray-500  rounded-lg inline-flex items-center justify-center relative disabled:opacity-70 disabled:cursor-not-allowed"
        @click="$emit('click')"
        :disabled="loading"
    >
        <span :class="{'opacity-0': loading}">
            <slot></slot>
        </span>
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </button>
</template>

<script setup>
const emit = defineEmits(['click'])
defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>
