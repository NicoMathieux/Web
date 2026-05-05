<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.TitleTextImageSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const withCarousel = ref(props.slice.variation === 'withCarousel');

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
  >
    <Header :title="slice.primary.title" :subtitle="slice.primary.subtitle" />

    <div class="flex flex-col-reverse gap-[24px] lg:grid lg:grid-cols-5">
      <div class="col-span-2" :class="{ 'col-end-6': slice.primary.inverted }">
        <div class="font-slussen"><RichText :field="slice.primary.text" /></div>
        <div v-if="slice.primary.link.url" class="mt-[18px]"><CustomButton :link="slice.primary.link" /></div>
      </div>

      <CustomImage v-if="!withCarousel && slice.primary.image.url" :image="slice.primary.image" :date="slice.primary.image_date" :place="slice.primary.image_place" class="col-span-2 relative" :class="slice.primary.inverted ? 'order-first' : 'col-end-6'" />

      <CustomImage v-if="withCarousel && slice.primary.element.length == 1 && slice.primary.element[0].image.url" :image="slice.primary.element[0].image" :date="slice.primary.element[0].date" :place="slice.primary.element[0].place" class="col-span-2 relative" :class="slice.primary.inverted ? 'order-first' : 'col-end-6'" />

      <div v-else-if="withCarousel && slice.primary.element.length > 1" class="col-span-2 relative" :class="slice.primary.inverted ? 'order-first' : 'col-end-6'">
        <Carousel
          ref="carousel"
          :wrap-around="true"
          @slide-end="slideEnded"
        >
          <Slide
            v-for="image in slice.primary.element"
            :key="image.title"
          >
            <CustomImage
              v-if="image.image.url"
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
      </div>
    </div>
  </section>
</template>


<style scoped>
.custom-image {
  height: 600px;
  width: 100%;

  @apply h-[300px] lg:h-[600px];
}
</style>