<template>
    <div>
      <!--alert suppression-->
  <div v-if="supprimerAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-80">
      <div class="bg-green-100 rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
        <p class="text-gray-400 text-sm text-center">La note a été supprimée avec succès.</p>
    </div>
</div>
      <!--alert modification-->
<div v-if="modifAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-80">
      <div class="bg-green-100 rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
        <p class="text-gray-400 text-sm text-center">La note a été modifiée avec succès.</p>
    </div>
</div>

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
      <Button nomButton="Modifier" @BtnModif ="ouvrirModal" />
      <Button nomButton="Supprimer" @BtnSupp="supprimer" />
    </div>
    </div>

    <div v-else class="text-gray-400 text-center mt-20">
      Note introuvable.
    </div>

    <Teleport to="body">
        <NoteFormUpdate :visible="ModalFormVisible"
                @close="fermer"
                @succesModif ="arretModal"
        />
    </Teleport>
  </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/note'
import type { Note } from '../stores/note'
import { computed } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import { onMounted, ref } from 'vue'
import Button from '../components/Button.vue'
import NoteFormUpdate from '../components/NoteFormUpdate.vue'

const ModalFormVisible = ref(false);

function ouvrirModal() {
    ModalFormVisible.value = true
}

const modifAlert = ref(false)

function fermer() {
  ModalFormVisible.value = false
}
function arretModal() {
  modifAlert.value = true
    setTimeout(() => modifAlert.value = false, 2000)
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
const index = store.notes.findIndex((n: Note) => n._id === id)
const couleur = couleurs[index % couleurs.length] ?? "#F2D785"

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
} as const

const supprimerAlert = ref(false)
async function supprimer() {
  await store.supprimerNote(id)
  supprimerAlert.value = true;
  setTimeout(() => { supprimerAlert.value = false;   router.back()
 }, 3000);

}



</script>
