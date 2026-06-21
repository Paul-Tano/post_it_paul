
<template>
  <!--alert suppression-->
  <div v-if="supprime" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-80">
      <div class="bg-green-100 rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
        <p class="text-gray-400 text-sm text-center">La note a été supprimée avec succès.</p>
    </div>
</div>

  <div :style="{ backgroundColor: bgCard, transform: `rotate(${rotation}deg)` }"
    class=" card border text-sm text-gray-500 w-full lg:basis-[calc(33.333%-1rem)]">
    <div ref="div" class="flex flex-col items-center gap-4 w-full p-4 pb-2  border-dashed border-b  border-gray-500/20">
      <h1 class ="font-bold text-lg">{{ title }}</h1>
      <p v-for="(ligne, i) in content" :key="i" class="break-all overflow-hidden line-clamp-3 w-full">{{ ligne }}</p>
    </div>
    <div class="flex flex-row items-center justify-between gap-4 w-full p-4 pb-2  border-gray-500/20">
      <p class="text-black">
        {{ new Date(createdAt).toLocaleDateString('fr-FR', options) }}
      </p>
      <div>
        <Button nomButton="Détails" @BtnDetail = 'detail' class="mr-4"/>
        <Button nomButton="Supprimer" @BtnSupp = 'supprimer'  />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { useNotesStore } from '../stores/note'
import { useRouter } from 'vue-router'
import {ref} from 'vue'

const router = useRouter()

const props = defineProps({
  bgCard: String,
  rotation: Number,
  title: String,
  id: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  content: {
    type: Array as () => string[],
    required: true
  }
})
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
} as const;

const store = useNotesStore()
const supprime = ref(false)

async function supprimer() {
  await store.supprimerNote(props.id);
  supprime.value = true;
  setTimeout(() => supprime.value = false, 3000);
}

function detail() {
    router.push(`/detail/${props.id}`)
}
</script>


<style scoped>
.card {
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.359);
}

@media(max-width: 992px) {

  .card {
    transform: rotate(0deg) !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.629);
  }
}

</style>


