<script setup>
import { ref } from 'vue';
import { Disclosure } from '@headlessui/vue'
import {StickyNote} from '@lucide/vue'
import SearchBar from './SearchBar.vue';
import NoteForm from './NoteForm.vue';
import { useNotesStore } from '../stores/note';

const store = useNotesStore()

const ModalFormVisible = ref(false);
function ouvrirModal() {
  ModalFormVisible.value = true
}
function fermerModal() {
  ModalFormVisible.value = false
}
</script>


<template>
  <Disclosure as="nav"
    class="relative bg-black after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    v-slot="{ open }">
    <div class="mx-auto max-w-7xl ">
      <div class="relative flex h-16 items-center justify-between">

        <div class="flex flex-1 items-start justify-start sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
           <StickyNote class="text-[#F2D785] " :size="30"/>
           <p class="text-[#F2D785] text-3xl">Post-it</p>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="hidden sm:block">
            <SearchBar v-model = "store.search"/>
          </div>
          <div class="sm:ml-6">
            <div class="flex space-x-4">
              <button class="text-black rounded-xl bg-[#F2D785] px-3 py-1" @click="ouvrirModal">+ Nouvelle Note</button>
            </div>
          </div>
          <Teleport to="body">
            <NoteForm :visible="ModalFormVisible" @close="fermerModal" />
          </Teleport>
        </div>
      </div>
    </div>
  </Disclosure>
</template>
