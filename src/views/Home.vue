<script setup>

import { useHomeStore } from '@/stores'

const homeStore = useHomeStore()

homeStore.home()

</script>

<template>
  <div class="row">
    <span class="spinner-border spinner-border-sm mr-1">Redirecting ... </span>
  </div>
</template>
