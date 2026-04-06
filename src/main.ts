import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/**
  Instance principale de l'application Vue.
 Créée à partir du composant racine App et servira de point d'entrée pour tous les composants enfants.
 */
const app = createApp(App)

app.use(createPinia())
app.use(router) //Enregister l'instance de router en tant que plugin
                //Doit se produire avant le moun()

app.mount('#app')
