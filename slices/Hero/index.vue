<script setup lang="ts">
import type { Content } from "@prismicio/client";

const params = getPrismicSingle("settings");

defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const time = ref();
let interval;

const startTimer = () => {
  interval = setInterval(() => {
    time.value = new Date().toLocaleTimeString("fr-FR");
  }, 1000);
}

onMounted(() => {
  startTimer();
})

onUnmounted(() => {
  clearInterval(interval);
})
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="-mx-[60px] -mt-[132px] h-[100vh] relative overflow-hidden"
  >
    <PrismicImage :field="slice.primary.background_image" class="absolute z-0 w-full h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

    <div class="absolute w-full h-full z-[1] flex items-center justify-center">
      <div class="font-vermin text-2xl">{{ params.data.website_title }}</div>
    </div>

    <div class="absolute w-full h-full z-[2]">
      <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[800px] -left-[350px] -bottom-[350px] rotate-[4deg] blur-[3px]" />
      <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[600px] left-[150px] -bottom-[350px] rotate-[4deg] blur-[5px]" />
      <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[700px] right-[200px] -bottom-[450px] rotate-[-6deg] blur-[7px]" />
      <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[800px] -right-[300px] -bottom-[250px] rotate-[-9deg] blur-[3px]" />
    </div>

    <div class="relative w-full h-full z-[3] flex items-center justify-center">
      <div class="font-slussen flex w-full justify-between absolute px-[36px] bottom-[48px]">
        <span>(PAR) {{ time }} + GMT</span>
        <span>SOUND: ON/OFF</span>
      </div>
    </div>
  </section>
</template>
