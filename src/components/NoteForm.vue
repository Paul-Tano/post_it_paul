<script setup>
import { useNotesStore } from '@/stores/note';
import { reactive, ref } from 'vue';

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['close'])
const store = useNotesStore()

const note = reactive({
  title: '',
  content: '',
})
const ajout = ref(false)

const submit = async () => {
    await store.ajouterNote({
        title: note.title,
        content: [note.content],
  })
emit('close')
note.title = ''
  note.content = ''
ajout.value = true;
  setTimeout(() => ajout.value = false, 3000);
}

</script>

<template>
  <!--alert ajout-->
  <div v-if="ajout" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-4 w-80">
      <div class="bg-green-100 rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
        <p class="text-gray-400 text-sm text-center">La note a été ajoutée avec succès.</p>
    </div>
</div>

  <div v-if="visible" class="modal-background">
      <div class="modal-container">

        <form @submit.prevent = "submit" class="bg-white text-gray-500 mx-0 md:mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-lg w-full">
          <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Créer une nouvelle note</h2>
          <hr class="mb-4 ">
          <label for="tittre" class="text-lg">Titre</label>

          <input v-model= "note.title" id="titre" class="w-full bg-[#F5F1E8] border mt-1 border-gray-500/30 outline-none rounded p-2" type="text"
            placeholder="Titre de la note..." required>
          <label for="email" class="text-lg">Contenu</label>
          <textarea v-model= "note.content"rows="3" id="msg" class="w-full bg-[#F5F1E8] border mt-3 resize-none border-gray-500/30 outline-none rounded p-2" placeholder="Ecris ta note ici..." required></textarea>

          <div class="flex items-center justify-center gap-4 sm:gap-20 mt-5 w-full">
            <button @click="() => { note.title = ''; note.content = ''; $emit('close')}" class="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition">
              Retour
            </button>
            <button type ="submit" class="w-full md:w-36 h-10 rounded-md text-white bg-black font-medium text-sm  active:scale-95 transition">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
</template>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(133, 133, 133, 0.5);
 display: flex !important;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
 width: 30rem;
  margin: 4rem auto;
}

@media (max-width: 640px) {
  .modal-background {
    display: flex !important;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .modal-container {
    width: 90%;
    margin: 0 auto;
  }
}

::placeholder {
  font-style: italic;
}


</style>
