<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.ImageCarouselLinkSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const carousel = ref(null);

let currentIndex = 0;

const slideEnded = ({ currentSlideIndex }) => {
  if (currentSlideIndex === currentIndex) return;
  currentIndex = currentSlideIndex;
}

const prevSlide = () => {
  carousel.value?.prev();
}

const nextSlide = () => {
  carousel.value?.next();
}

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
    class="relative"
  >
    <Carousel
      ref="carousel"
      :wrap-around="true"
      :items-to-show="1.4"
      @slide-end="slideEnded"
    >
      <Slide
        v-for="image in slice.primary.images"
        :key="image.title"
      >
        <CustomImage
          :image="image.image"
          :date="image.date"
          :place="image.place"
        />
      </Slide>
    </Carousel>

    <div class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-[24px] z-[1] pointer-events-none">
      <button @click="prevSlide" class="pointer-events-auto"><img class="h-[48px] rotate-180" src="/assets/images/arrow.png" /></button>
      <button @click="nextSlide" class="pointer-events-auto"><img class="h-[48px]" src="/assets/images/arrow.png" /></button>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  width: 100vw;

  @apply -translate-x-[18px] lg:-translate-x-[60px];

  .carousel__slide {
    @apply transition-all;
  }

  .carousel__slide--visible:not(.carousel__slide--active) {
    @apply grayscale-[100%] opacity-50;

    .custom-image {
      width: 60vw;
      height: calc(60vw * 9 / 16);
    }
  }
}

.custom-image {
  @apply transition-all;

  width: 80vw;
  height: calc(80vw * 9 / 16);
}
</style>
