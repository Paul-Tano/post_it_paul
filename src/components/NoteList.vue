<script setup lang="ts">
import NoteCard from './NoteCard.vue';
import SearchBar from './SearchBar.vue';
import { reactive, computed, ref } from 'vue';
import {useNotesStore} from '../stores/note'
import { onMounted, onUnmounted } from 'vue';
import type { Note } from '../stores/note';

const cards = reactive([
    { rotate: -1.5, color: "#F2D785" },  //jaune
    { rotate: -1.5, color: "#F2A7D0" },  //rose
    { rotate: -1.5, color: "#88F2AD" },  //vert
    { rotate: 1.5, color: "#BCB3F2" },  //violet
    { rotate: 1.5, color: "#93C6FD" },  //bleu
    { rotate: 1.5, color: "#F2AE72" }   //orange

])
const store = useNotesStore()

const parPage = 9
const currentPage = ref(1)

const filterNotes = computed(() => {
    return store.notes.filter((note : Note) =>
      note.title.toLowerCase().includes(store.search.toLowerCase()) ||
      note.content.join(' ').toLowerCase().includes(store.search.toLowerCase())

      );
})

const paginatedNotes = computed(() => {
    const start = (currentPage.value - 1) * parPage
    return filterNotes.value.slice(start, start + parPage)
})

const totalPages = computed(() => Math.ceil(filterNotes.value.length / parPage))

const visiblePages= computed(() => {
    const start = Math.max(1, currentPage.value - 1)
    const end= Math.min(totalPages.value, start + 2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

onMounted(() => {
  store.fetchNotes()
})

const getCard = (index: number) => {
    return cards[index % cards.length] ?? { color: "#F2D785", rotate: 0 }

}</script>

<template>
    <div class="mx-[2rem]">

              <!--en-tete-->
            <div class="flex flex-row gap-[5rem] items-center mt-[50px] mb-[40px]">
                  <h1 class="text-3xl">Mes notes</h1>
                  <i class="text-xl mt-3" v-if = "store.notes.length !== 0"> {{ store.notes.length }} notes</i>
                  <i class="text-xl mt-3" v-else></i>
              </div>

            <div v-if = "store.notes.length !== 0">
              <SearchBar class="block sm:hidden mb-8" v-model = "store.search"
                  inputClass="text-black bg-transparent placeholder-black-500 border-b border-black" />

              <div class="flex items-center justify-start flex-wrap  gap-6 w-full ">
                  <NoteCard
                  v-for="(note, index) in paginatedNotes"
                  :key="note._id"
                  :id = "note._id"
                  :bgCard="getCard(index).color"
                  :rotation="getCard(index).rotate"
                  :title="note.title.slice(0, 30) + '...'"
                  :content="[note.content[0]?.slice(0, 30) + '...']"
                  :createdAt="note.createdAt"/>
              </div>


              <div class="flex items-center justify-center sm:gap-3 sm:mt-12 mt-8  " v-if="totalPages > 1">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-3 py-1 text-white rounded border bg-black disabled:opacity-30">
                    Précédent
                </button>

                <button
                    v-for="page in visiblePages" :key="page"
                    @click="currentPage = page"
                    :class="['px-3 py-1 rounded border', currentPage === page ? 'bg-black text-white' : '']">
                    {{ page }}
                </button>
                <button
                   :class="['px-3 py-1 rounded border']"
                >
                   ..
                </button>

                <button :class="['px-3 py-1 rounded border']">
                    {{ totalPages }}
                </button>

                <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-3 py-1 text-white rounded bg-black border disabled:opacity-30">
                    Suivant
                </button>
              </div>
            </div>

            <div v-else class="text-gray text-lg text-center mt-20">
                <p>Aucune note n'a été ajouté</p>
              </div>

    </div>

</template>
