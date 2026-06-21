<template>
  <div v-if="visible" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
    <div class="bg-white rounded-xl shadow-2xl p-6 flex flex-col gap-4 w-80 transform transition-all">
      <div class="flex items-center gap-3 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 bg-red-100 rounded-full p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 class="text-lg font-bold text-gray-800">Supprimer ?</h2>
      </div>
      <p class="text-gray-500 text-sm">
        Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.
      </p>
      <div class="flex items-center justify-end gap-3 mt-4">
        <button @click="$emit('cancel')" :disabled="loading" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:scale-95 transition disabled:opacity-70">
          Annuler
        </button>
        <button @click="$emit('confirm')" :disabled="loading" class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 active:scale-95 transition flex items-center justify-center min-w-[100px] disabled:opacity-70">
          <span v-if="!loading">Supprimer</span>
          <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  loading?: boolean
}>()
defineEmits(['confirm', 'cancel'])
</script>
