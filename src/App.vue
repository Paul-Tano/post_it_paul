<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

</script>

<template>

  <header>
    <NavBar/>
  </header>

  <router-view/>

  <footer>
    <Footer />
  </footer>

</template>

