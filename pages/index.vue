<script setup lang="ts">
import { components } from '~/slices'

const page = getPrismicSingle("home");

// const parametres = useParametres();

// useHead({
//   title: computed(() => {
//     if (page.value?.data.titre_premiere_ligne && page.value?.data.titre_deuxieme_ligne) {
//       return `${page.value?.data.titre_premiere_ligne} ${page.value?.data.titre_deuxieme_ligne} | ${parametres.value?.data.titre_du_site}`
//     } else if (page.value?.data.titre_premiere_ligne) {
//       return `${page.value?.data.titre_premiere_ligne} | ${parametres.value?.data.titre_du_site}`
//     } else if (page.value?.data.titre_deuxieme_ligne) {
//       return `${page.value?.data.titre_deuxieme_ligne} | ${parametres.value?.data.titre_du_site}`
//     } else {
//       return `${parametres.value?.data.titre_du_site}`
//     }
//   })
// })
</script>

<template>
  <div v-if="page">
    <div class="px-60">
      <SliceZone
        wrapper="main"
        class=" flex flex-col gap-[132px] py-[132px]"
        :slices="page.data.slices ?? []"
        :components="components"
      />
    </div>
    <MotionBackground />
  </div>
</template>
