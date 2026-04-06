import { defineStore } from 'pinia'
import { ref } from 'vue'

const BASE_URL = 'https://postit.zoul.dev'

export interface Note {
    _id: string
    title: string
    content: string[]
    createdAt: string
    updatedAt: string
}

export const useNotesStore = defineStore('notes', () => {
    const search = ref("")
    const notes = ref<Note[]>([])
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)

    async function fetchNotes() {
        loading.value = true
        try {
            const res = await fetch(`${BASE_URL}/notes`)
            const data = await res.json()
            notes.value = data.notes
            console.log(notes.value)
        } catch (e) {
            error.value = (e as Error).message
        } finally {
            loading.value = false
        }
    }

  async function detailNote(id: string) {
    loading.value = true
    try {
      const res = await fetch(`${BASE_URL}/notes/${id}`)
      const data = await res.json()
      notes.value = data.notes
      console.log(notes.value)
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

    async function ajouterNote(note: Omit<Note, '_id' | 'createdAt' | 'updatedAt'>) {
        try {
            const res = await fetch(`${BASE_URL}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note)
            })
            const data = await res.json()
            notes.value.push(data)
        } catch (e) {
            error.value = (e as Error).message
        }
    }

    async function modifierNote(id: string, noteModifiee: Partial<Note>) {
        try {
            const res = await fetch(`${BASE_URL}/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteModifiee)
            })
            const data = await res.json()
            console.log('réponse API:', data)
            const index = notes.value.findIndex(n => n._id === id)
          if (index !== -1) notes.value[index] = { ...notes.value[index], ...noteModifiee }
        } catch (e) {
            error.value = (e as Error).message
        }
    }

    async function supprimerNote(id: string) {
        try {
            await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' })
            notes.value = notes.value.filter(n => n._id !== id)
        } catch (e) {
            error.value = (e as Error).message
        }
    }

    return { notes, loading, error, search, fetchNotes,detailNote, ajouterNote, supprimerNote, modifierNote }
})
