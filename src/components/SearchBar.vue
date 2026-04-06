<template>
    <div
        class="flex items-center pl-3 justify-center border gap-4 border-gray-200/30 h-[46px] mx-2 rounded-full overflow-hidden max-w-md w-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 30 30" fill="#6B7280">
            <path
                d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :value="modelValue" type="text" placeholder="Rechercher une note" :class="inputClass"
            class="w-full h-full outline-none  text-sm">
    </div>
</template>



<script setup lang="ts">

const props = defineProps({
    modelValue: String,
    inputClass: {
        type: String,
        default: "text-gray-500 bg-transparent placeholder-gray-500"
    }
})

const emit = defineEmits(['update:modelValue']);
</script>
