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
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div
      class="flex items-center justify-between border-b border-snow/50 pb-[12px] mb-[24px]"
    >
      <div class="font-vermin text-s">{{ slice.primary.title }}</div>
      <div class="flex gap-[4px] items-center">
        <span class="font-slussen">{{ slice.primary.subtitle }}</span>
        <div class="w-[11px] h-[11px] bg-snow rounded-full"></div>
      </div>
    </div>

    <div id="container" class="flex justify-between">
      <!-- Variation default -->
      <div v-if="slice.primary.image" class="flex gap-[24px]">
        <CustomImage :image="slice.primary.image" class="w-2/3" />
        <div>
          <div class="font-rader leading-[90%] text-m">{{ slice.primary.image_title }}</div>
          <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.text" /></div>
          <div class="mt-[18px]"><CustomButton :link="slice.primary.link" /></div>
        </div>
      </div>

      <div v-if="slice.primary.left">
        <CustomImage
          :image="slice.primary.left[0].image"
          :place="slice.primary.left[0].image_place"
          :date="slice.primary.left[0].image_date"
        />
        <div class="font-rader leading-[90%] text-m mt-[24px]">{{ slice.primary.left[0].title }}</div>
        <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.left[0].text" /></div>
        <div class="mt-[18px]"><CustomButton :link="slice.primary.left[0].link" /></div>
      </div>

      <!-- Variation triple -->
      <div v-if="slice.primary.center">
        <CustomImage :image="slice.primary.center[0].image" />
        <div class="font-rader leading-[90%] text-m mt-[24px]">{{ slice.primary.center[0].title }}</div>
        <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.center[0].text" /></div>
        <div class="mt-[18px]"><CustomButton :link="slice.primary.center[0].link" /></div>
      </div>

      <div v-if="slice.primary.right">
        <CustomImage
          :image="slice.primary.right[0].image"
          :place="slice.primary.right[0].image_place"
          :date="slice.primary.right[0].image_date"
        />
        <div class="font-rader leading-[90%] text-m mt-[24px]">{{ slice.primary.right[0].title }}</div>
        <div class="font-slussen mt-[12px]"><RichText :field="slice.primary.right[0].text" /></div>
        <div class="mt-[18px]"><CustomButton :link="slice.primary.right[0].link" /></div>
      </div>
    </div>
  </section>
</template>


<style scoped>
section {
  &[data-slice-variation="default"] .custom-image {
    width: 850px;
    height: 600px;
  }

  &[data-slice-variation="double"] #container > div {
    &:nth-child(1) {
      @apply w-1/2;
    }

    &:nth-child(2) {
      @apply w-1/3;
    }
  }
  
  &[data-slice-variation="triple"] #container {
    @apply gap-[24px];

    & > div {
      @apply w-1/3;

      & > .custom-image {
        height: 500px;
      }
    }
  }
}
</style>