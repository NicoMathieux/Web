<script setup lang="ts">
import { components } from '~/slices'

const route = useRoute();
const page = getPrismicReusable("expedition", route.params.uid as string);
</script>

<template>
  <div v-if="page">
    <div>
      <SliceZone
        wrapper="main"
        class=" flex flex-col gap-[132px]"
        :slices="page.data.slices ?? []"
        :components="components"
      />
    </div>
  </div>
</template>
