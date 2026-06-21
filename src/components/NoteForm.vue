<script setup>
import { useNotesStore } from '../stores/note';
import { useToastStore } from '../stores/toast';
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
const isSubmitting = ref(false)

const submit = async () => {
    isSubmitting.value = true
    await store.ajouterNote({
        title: note.title,
        content: [note.content],
  })
emit('close')
  note.title = ''
  note.content = ''
  isSubmitting.value = false
  const toast = useToastStore()
  toast.add('La note a été ajoutée avec succès.')
}

</script>

<template>

  <div v-if="visible" class="modal-background">
      <div class="modal-container">

        <form @submit.prevent = "submit" class="bg-white text-gray-500 mx-0 md:mx-4 md:p-6 p-4 text-left text-sm rounded-lg shadow-lg w-full">
          <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">Créer une nouvelle note</h2>
          <hr class="mb-4 ">
          <label for="tittre" class="text-lg">Titre</label>

          <input v-model= "note.title" id="titre" class="w-full bg-[#F5F1E8] border mt-1 border-gray-500/30 outline-none rounded p-2" type="text"
            placeholder="Titre de la note..." required>
          <label for="msg" class="text-lg">Contenu</label>
          <textarea v-model= "note.content"rows="3" id="msg" class="w-full bg-[#F5F1E8] border mt-3 resize-none border-gray-500/30 outline-none rounded p-2" placeholder="Ecris ta note ici..." required></textarea>

          <div class="flex items-center justify-center gap-4 sm:gap-20 mt-5 w-full">
            <button @click="() => { note.title = ''; note.content = ''; $emit('close')}" class="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition">
              Retour
            </button>
            <button type ="submit" :disabled="isSubmitting" class="w-full md:w-36 h-10 rounded-md text-white bg-black font-medium text-sm active:scale-95 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
              <span v-if="!isSubmitting">Enregistrer</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
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
