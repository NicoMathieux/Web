<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.MapGpxSlice>());

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
    <Map :place="slice.primary.place" :date="slice.primary.date" :gpx="slice.primary.gpx_file.url" :gpxColor="slice.primary.gpx_color" />
  </section>
</template>
