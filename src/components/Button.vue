<template>
    <button
        type="button"
        class=" p-2 bg-gray-800 active:scale-95 transition text-sm text-gray-500  rounded-lg "
        @click="ClickButton"
    >
        <div v-if="nomButton === 'Supprimer'" >
            <Trash2 class = "text-white"/>
        </div>
        <div v-if="nomButton === 'Détails'">
            <Eye class = "text-white"/>
        </div>
         <div v-if="nomButton === 'Modifier'">
            <Pencil class = "text-white"/>
        </div>
    </button>

</template>

<script setup>
import { Trash2, Pencil, Eye } from '@lucide/vue';

const props = defineProps({
    nomButton: String
})

const emit = defineEmits(['BtnSupp', 'BtnDetail', 'BtnModif'])

const ClickButton = () => {
  console.log('Button clicked:', props.nomButton)
  if (props.nomButton === 'Supprimer') {
      emit('BtnSupp')
    } else if (props.nomButton === 'Modifier'){
      emit('BtnModif')
    } else {
      emit('BtnDetail')
    }
}

</script>
