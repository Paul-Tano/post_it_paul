
<template>
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
        <Button @click='detail' class="mr-4">
          <Eye class="text-white"/>
        </Button>
        <Button @click='showConfirm = true'>
          <Trash2 class="text-white"/>
        </Button>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <ConfirmModal 
      :visible="showConfirm" 
      :loading="isDeleting"
      @cancel="showConfirm = false" 
      @confirm="supprimer" 
    />
  </Teleport>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import ConfirmModal from './ConfirmModal.vue';
import { useNotesStore } from '../stores/note'
import { useToastStore } from '../stores/toast'
import { useRouter } from 'vue-router'
import { Eye, Trash2 } from '@lucide/vue'
import { ref } from 'vue'

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
const toast = useToastStore()
const showConfirm = ref(false)
const isDeleting = ref(false)

async function supprimer() {
  isDeleting.value = true;
  await store.supprimerNote(props.id);
  isDeleting.value = false;
  showConfirm.value = false;
  toast.add('La note a été supprimée avec succès.');
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


