<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { gsap } from "gsap";

const params = getPrismicSingle("settings");

const route = useRoute();

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
  window.addEventListener('scroll', scaleTitleOnScroll);
})

onUnmounted(() => {
  clearInterval(interval);
  window.removeEventListener('scroll', scaleTitleOnScroll);
})

const { isMobile } = useDevice();
const { enable, disable, isAudioOn } = await useAudio();
const { hasInteracted } = useInteraction();

const scaleTitleOnScroll = () => {
      const scroll = window.scrollY
      const maxScroll = 500

      // Clamp entre 1 et 0.5
      const scale = Math.max(1 - scroll / maxScroll, 0.5)

      gsap.to('.hero-title', {
        scale: scale,
        duration: 0.2,
        ease: 'power1.out',
      })
    }
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
  <Scratched :variation="isMobile ? 'hero-mobile' : 'hero-desktop'">
    <div class="-mx-[18px] lg:-mx-[60px] -mt-[132px] h-[100vh] relative overflow-hidden">
      <PrismicImage :field="slice.primary.background_image" class="absolute z-0 w-full h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
  
      <div class="absolute w-full h-full z-[1] flex items-center justify-center">
        <div class="font-vermin text-l lg:text-2xl text-center hero-title"><h1 v-if="route.fullPath === '/'">{{ params.data.website_title }}</h1><span v-else>{{ params.data.website_title }}</span></div>
      </div>
  
      <div class="absolute w-full h-full z-[2]">
        <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[300px] lg:w-[800px] -left-[100px] lg:-left-[350px] -bottom-[100px] lg:-bottom-[350px] rotate-[4deg] blur-[3px]" />
        <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[200px] lg:w-[600px] left-[50px] lg:left-[150px] -bottom-[100px] lg:-bottom-[350px] rotate-[4deg] blur-[5px]" />
        <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[150px] lg:w-[700px] right-[80px] lg:right-[200px] -bottom-[80px] lg:-bottom-[450px] rotate-[-6deg] blur-[7px]" />
        <PrismicImage :field="slice.primary.blurred_image" class="absolute w-[300px] lg:w-[800px] -right-[150px] lg:-right-[300px] -bottom-[80px] lg:-bottom-[250px] rotate-[-9deg] blur-[3px]" />
      </div>
  
      <div class="relative w-full h-full z-[3] flex items-center justify-center">
        <div class="font-slussen flex w-full justify-between absolute px-[24px] lg:px-[36px] bottom-[36px] lg:bottom-[48px]">
          <span>(PAR) {{ time }}<span v-show="!isMobile"> + GMT</span></span>

          <Transition name="fade" appear>
            <span v-if="hasInteracted && isAudioOn !== null">SOUND: <span class="cursor-pointer" :class="{ 'opacity-50': isAudioOn }" @click="enable">ON</span>/<span class="cursor-pointer" :class="{ 'opacity-50': !isAudioOn }" @click="disable">OFF</span></span>
          </Transition>
        </div>
      </div>
    </div>
  </Scratched>
  </section>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>