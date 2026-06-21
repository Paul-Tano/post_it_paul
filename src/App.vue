<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import Toast from './components/Toast.vue';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavBar/>
    </header>

    <main class="flex-grow">
      <router-view/>
    </main>

    <Toast />

    <footer>
      <Footer />
    </footer>
  </div>
</template>

