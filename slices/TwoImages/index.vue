<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.TwoImagesSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const withText = ref(props.slice.variation === "withText");

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
    <div v-if="!withText" class="flex flex-col lg:grid lg:grid-cols-2 gap-[24px]">
      <CustomImage :image="slice.primary.left_image" />
      <CustomImage :image="slice.primary.right_image" />
    </div>
    <div v-else class="flex flex-col lg:grid lg:grid-cols-2 gap-[24px]">
      <div class="flex flex-col gap-[24px]">
        <CustomImage :image="slice.primary.left[0].image" />
        <RichText class="font-slussen" :field="slice.primary.left[0].text" />
      </div>
      <div class="flex flex-col gap-[24px]">
        <CustomImage :image="slice.primary.right[0].image" />
        <RichText class="font-slussen" :field="slice.primary.right[0].text" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-image {
  width: 100%;

  @apply h-[300px] lg:h-[650px];
}
</style>