<script setup lang="ts">
//import { Alert } from '@/components';

import {Header, Footer} from '@/components'

</script>

<template>
  <header>
    <Header />
  </header>
  <main>
    <div id="app" class="app-container">
      <router-view />
    </div>
  </main>
  <footer>
    <Footer />
  </footer>
  
</template>

<style scoped>

</style>
