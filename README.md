# 📝 Post-it

Une application web de prise de notes façon **post-it**, construite avec **Vue 3**, **TypeScript**, **Pinia** et **Tailwind CSS**.
Les notes sont affichées sous forme de petits papiers colorés et légèrement inclinés. On peut les créer, les consulter, les modifier, les supprimer et les rechercher.

---

## ✨ Fonctionnalités

- **Liste des notes** en cartes post-it, avec six couleurs et une légère rotation
- **Création** d'une note (titre + contenu) via une fenêtre modale
- **Détail** d'une note sur une page dédiée (`/detail/:id`)
- **Modification** d'une note existante
- **Suppression** avec une modale de confirmation
- **Recherche** en temps réel dans le titre et le contenu
- **Pagination** (9 notes par page)
- **Notifications** (toasts) après chaque action
- Gestion des états de **chargement** et d'**erreur**
- Interface **responsive** (mobile, tablette, desktop)

## 🛠️ Stack technique

| Outil | Rôle |
| --- | --- |
| [Vue 3](https://vuejs.org/) (`<script setup>`) | Framework front-end |
| [TypeScript](https://www.typescriptlang.org/) | Typage statique |
| [Vite](https://vite.dev/) | Serveur de dev et build |
| [Vue Router](https://router.vuejs.org/) | Navigation entre les pages |
| [Pinia](https://pinia.vuejs.org/) | Gestion d'état (notes, toasts) |
| [Tailwind CSS](https://tailwindcss.com/) | Styles |
| [Lucide](https://lucide.dev/) / [Heroicons](https://heroicons.com/) | Icônes |
| [Headless UI](https://headlessui.com/) | Composants accessibles |
| [Vitest](https://vitest.dev/) | Tests unitaires |
| ESLint, Oxlint, Prettier | Qualité et formatage du code |

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** `^20.19.0` ou `>=22.12.0`
- **npm**

### Installation

```sh
git clone https://github.com/paul-tano/post_it_paul.git
cd post_it_paul
npm install
```

### Lancer en développement

```sh
npm run dev
```

L'application est disponible sur [http://localhost:5173](http://localhost:5173).

## 📜 Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement avec rechargement à chaud |
| `npm run build` | Vérifie les types puis génère le build de production dans `dist/` |
| `npm run preview` | Sert localement le build de production |
| `npm run type-check` | Vérifie les types avec `vue-tsc` |
| `npm run test:unit` | Lance les tests unitaires avec Vitest |
| `npm run lint` | Lance Oxlint puis ESLint (avec correction automatique) |
| `npm run format` | Formate le code de `src/` avec Prettier |

## 🌐 API

L'application consomme une API REST hébergée sur `https://postit.zoul.dev` (constante `BASE_URL` dans `src/stores/note.ts`).

| Méthode | Endpoint | Action |
| --- | --- | --- |
| `GET` | `/notes` | Récupère toutes les notes |
| `POST` | `/notes` | Crée une note |
| `PUT` | `/notes/:id` | Modifie une note |
| `DELETE` | `/notes/:id` | Supprime une note |

Format d'une note :

```ts
interface Note {
  _id: string
  title: string
  content: string[]
  createdAt: string
  updatedAt: string
}
```

## 📁 Structure du projet

```
src/
├── assets/            # Styles globaux (Tailwind, base)
├── components/
│   ├── Button.vue           # Bouton réutilisable
│   ├── ConfirmModal.vue     # Modale de confirmation de suppression
│   ├── Footer.vue
│   ├── NavBar.vue           # Barre de navigation (recherche, ajout)
│   ├── NoteCard.vue         # Carte post-it
│   ├── NoteForm.vue         # Formulaire de création
│   ├── NoteFormUpdate.vue   # Formulaire de modification
│   ├── NoteList.vue         # Liste, filtre et pagination
│   ├── SearchBar.vue        # Champ de recherche
│   └── Toast.vue            # Notifications
├── router/
│   └── index.ts       # Routes : / et /detail/:id
├── stores/
│   ├── note.ts        # Store Pinia des notes + appels API
│   └── toast.ts       # Store Pinia des notifications
├── views/
│   ├── HomeView.vue        # Page d'accueil
│   └── DetailNoteView.vue  # Page de détail d'une note
├── App.vue
└── main.ts
```

## ☁️ Déploiement

Le projet est prêt pour [Vercel](https://vercel.com/). Le fichier `vercel.json` redirige toutes les routes vers `index.html`, ce qui permet au mode historique de Vue Router de fonctionner quand on recharge une page.

```sh
npm run build   # génère le dossier dist/
```

Le dossier `dist/` peut aussi être servi par n'importe quel hébergeur de fichiers statiques (Netlify, GitHub Pages, Nginx…), à condition d'y configurer la même réécriture.

## 💡 Environnement recommandé

- [VS Code](https://code.visualstudio.com/) + l'extension [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Vue.js devtools](https://devtools.vuejs.org/) dans le navigateur

## 👤 Auteur

**Paul Tano**: [@paul-tano](https://github.com/paul-tano)
