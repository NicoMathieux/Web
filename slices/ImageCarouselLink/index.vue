<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.ImageCarouselLinkSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const carousel = ref(null);
const title = ref(null);
const text = ref(null);
const link = ref(null);

let currentIndex = 0;

const slideEnded = ({ currentSlideIndex }) => {
  if (currentSlideIndex === currentIndex) return;
  currentIndex = currentSlideIndex;
  updateValues(currentSlideIndex);
}

const updateValues = (index = 0) => {
  const currentImage = props.slice.primary.images[index];
  title.value = currentImage.title;
  text.value = currentImage.text;
  link.value = currentImage.link;
}

updateValues();

const prevSlide = () => {
  carousel.value?.prev();
}

const nextSlide = () => {
  carousel.value?.next();
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <Header :title="slice.primary.title" :subtitle="slice.primary.subtitle" />

    <Carousel
      ref="carousel"
      :wrap-around="true"
      @slide-end="slideEnded"
    >
      <Slide
        v-for="image in slice.primary.images"
        :key="image.title"
      >
        <CustomImage
          :image="image.image"
          :date="image.image_date"
          :place="image.image_place"
        />
      </Slide>
    </Carousel>

    <div class="flex justify-between items-start mt-[24px]">
      <div class="w-[400px]">
        <div class="font-rader leading-[90%] text-m">{{ title }}</div>
        <div class="font-slussen mt-[12px]"><RichText :field="text" /></div>
        <div class="mt-[18px]"><CustomButton :link="link" /></div>
      </div>
      <div class="flex gap-[16px]">
        <button @click="prevSlide"><img class="h-[48px] rotate-180" src="/assets/images/arrow.png" /></button>
        <button @click="nextSlide"><img class="h-[48px]" src="/assets/images/arrow.png" /></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-image {
  width: 100%;
  height: 650px;
}
</style>