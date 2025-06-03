<script setup lang="ts">
const params = getPrismicSingle("settings");

const title = computed(() => params.value.data.website_title);

useHead({
  titleTemplate: (chunk) => {
    return chunk ? `${chunk} — ${title.value}` : title.value;
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
