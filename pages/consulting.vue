<script setup lang="ts">
import { components } from '~/slices'

const page = getPrismicSingle("consulting");

useMeta(page);
</script>

<template>
  <div v-if="page">
    <div>
      <SliceZone
        wrapper="main"
        class=" flex flex-col gap-[96px] lg:gap-[132px]"
        :slices="page.data.slices ?? []"
        :components="components"
      />
    </div>
  </div>
</template>
