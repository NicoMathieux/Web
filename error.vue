<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <h4>{{ error.statusMessage }}</h4>
    <h2>{{ error.statusCode }}</h2>
    <button @click="handleError">Retour à l'accueil</button>
    <MotionBackground />
  </NuxtLayout>
</template>
