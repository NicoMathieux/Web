<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.DoubleImageLinkSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
    <Header :title="slice.primary.title" :subtitle="slice.primary.subtitle" />

    <div id="container" class="flex justify-between" :class="(slice.primary.inverted && slice.variation === 'double') ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row'">
      <!-- Variation default -->
      <div v-if="slice.primary.image" class="flex gap-[24px] flex-col" :class="slice.primary.inverted ? 'flex-col-reverse lg:flex-row-reverse' : 'lg:flex-row'">
        <CustomImage :image="slice.primary.image" class="w-2/3" />
        <div>
          <div class="font-rader leading-[90%] text-m"><h3>{{ slice.primary.image_title }}</h3></div>
          <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.text" /></div>
          <div v-if="slice.primary.link.url" class="mt-[18px]"><CustomButton :link="slice.primary.link" /></div>
        </div>
      </div>

      <div v-if="slice.primary.left">
        <CustomImage
          :image="slice.primary.left[0].image"
          :place="slice.primary.left[0].image_place"
          :date="slice.primary.left[0].image_date"
        />
        <div class="font-rader leading-[90%] text-m mt-[24px]"><h3>{{ slice.primary.left[0].title }}</h3></div>
        <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.left[0].text" /></div>
        <div v-if="slice.primary.left[0].link.url" class="mt-[18px]"><CustomButton :link="slice.primary.left[0].link" /></div>
      </div>

      <!-- Variation triple -->
      <div v-if="slice.primary.center">
        <CustomImage :image="slice.primary.center[0].image" />
        <div class="font-rader leading-[90%] text-m mt-[24px]"><h3>{{ slice.primary.center[0].title }}</h3></div>
        <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.center[0].text" /></div>
        <div v-if="slice.primary.center[0].link.url" class="mt-[18px]"><CustomButton :link="slice.primary.center[0].link" /></div>
      </div>

      <div v-if="slice.primary.right">
        <CustomImage
          :image="slice.primary.right[0].image"
          :place="slice.primary.right[0].image_place"
          :date="slice.primary.right[0].image_date"
        />
        <div class="font-rader leading-[90%] text-m mt-[24px]"><h3>{{ slice.primary.right[0].title }}</h3></div>
        <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.right[0].text" /></div>
        <div v-if="slice.primary.right[0].link.url" class="mt-[18px]"><CustomButton :link="slice.primary.right[0].link" /></div>
      </div>
    </div>
  </section>
</template>


<style scoped>
section {
  &[data-slice-variation="default"] #container {
    @apply flex-col lg:flex-row;

    .custom-image {
      @apply w-full lg:w-[850px] h-[400px] lg:h-[600px];
    }
  }

  &[data-slice-variation="double"] #container {
    @apply gap-[48px] lg:gap-[0px];

    & > div {
      &:nth-child(1) {
        @apply w-full lg:w-1/2;
      }

      &:nth-child(2) {
        @apply w-full lg:w-1/3;
      }
    }
  }
  
  &[data-slice-variation="triple"] #container {
    @apply gap-[24px] flex-row overflow-x-auto lg:overflow-auto -mx-[18px] lg:mx-[0px] px-[18px] lg:px-[0px];

    & > div {
      @apply w-full lg:w-1/3;

      & > .custom-image {
        @apply w-[70vw] lg:w-auto h-[350px] lg:h-[500px];
      }
    }
  }
}
</style>