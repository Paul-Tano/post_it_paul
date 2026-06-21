<template>
  <div class="mx-[2rem] mt-[50px]">

    <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-black transition mb-8">
      <ArrowLeft :size="20" /> Retour
    </button>

    <div v-if="note" :style="{ backgroundColor: couleur }"
      class="card border p-6 max-w-2xl mx-auto flex flex-col gap-6">

      <h1 class="text-2xl text-center font-semibold">{{ note.title }}</h1>
      <p v-for="(ligne, i) in note.content" :key="i" class="break-all overflow-hidden w-full">{{ ligne }}
      </p>

      <p class="text-black font-bold">
        {{ new Date(note.createdAt).toLocaleDateString('fr-FR', options) }}
      </p>
    <div class="flex flex-row items-center justify-end gap-10 w-full p-4 pb-2  border-gray-500/20">
      <Button @click="ouvrirModal">
        <Pencil class="text-white"/>
      </Button>
      <Button @click="showConfirm = true">
        <Trash2 class="text-white"/>
      </Button>
    </div>
    </div>

    <div v-else class="text-gray-400 text-center mt-20">
      Note introuvable.
    </div>

    <Teleport to="body">
        <NoteFormUpdate :visible="ModalFormVisible"
                @close="fermer"
        />
        <ConfirmModal 
          :visible="showConfirm" 
          :loading="isDeleting"
          @cancel="showConfirm = false" 
          @confirm="supprimer" 
        />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/note'
import type { Note } from '../stores/note'
import { computed } from 'vue'
import { ArrowLeft, Pencil, Trash2 } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import Button from '../components/Button.vue'
import NoteFormUpdate from '../components/NoteFormUpdate.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import { useToastStore } from '../stores/toast'

const ModalFormVisible = ref(false);
const showConfirm = ref(false);
const isDeleting = ref(false);

function ouvrirModal() {
    ModalFormVisible.value = true
}

const toast = useToastStore()

function fermer() {
  ModalFormVisible.value = false
}

onMounted(() => {
  if (store.notes.length === 0) {
    store.fetchNotes()
  }
})
const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const id = route.params.id as string

const note = computed(() => store.notes.find((n: Note) => n._id === id))

const couleurs = ["#F2D785", "#F2A7D0", "#88F2AD", "#BCB3F2", "#93C6FD", "#F2AE72"]
const couleur = computed(() => {
  const index = store.notes.findIndex((n: Note) => n._id === id)
  return index !== -1 ? couleurs[index % couleurs.length] : "#F2D785"
})

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
} as const

async function supprimer() {
  isDeleting.value = true;
  await store.supprimerNote(id)
  isDeleting.value = false;
  showConfirm.value = false;
  toast.add('La note a été supprimée avec succès.')
  router.back()
}



</script>
