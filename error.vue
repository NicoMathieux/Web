<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-[40vh] flex flex-col items-center justify-center mt-[10vh]">
      <div class="font-slussen">{{ error.statusMessage }}</div>
      <div class="font-rader text-2xl leading-[90%] mb-[24px]">{{ error.statusCode }}</div>
      <button @click="handleError" class="inline-block font-slussen p-[12px] relative">
          <img class="absolute top-1/2 -translate-y-1/2 left-0 -z-1 w-full h-[35px] object-fill" src="/assets/images/btn-brush-white.png" />
          <div class="z-0 relative text-coal">Accueil</div>
      </button>
    </div>
    <MotionBackground />
  </NuxtLayout>
</template>
