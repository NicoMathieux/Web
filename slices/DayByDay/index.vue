<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.DayByDaySlice>());

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
    <Header :title="slice.primary.title" :subtitle="slice.primary.subtitle" />

    <div class="lg:w-[80%]">
      <div v-for="day in slice.primary.days" class="mb-[2px]">
        <div class="flex gap-[6px] items-center">
          <div class="w-[11px] h-[11px] bg-snow rounded-full mb-[4px]"></div>
          <h3 class="font-rader text-s pl-[27px]">{{ day.title }}</h3>
        </div>

        <div class="flex gap-[48px] lg:gap-[96px] border-l-[1px] ml-[5px] pl-[36px] pt-[24px] pb-[48px]" :class="day.reverse ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row'">
          <div class="font-slussen" :class="{ 'lg:w-[60%]': !day.image.url }"><RichText :field="day.text" /></div>
          <div v-if="day.image.url"><CustomImage :image="day.image" class="w-[100%] lg:w-[350px] h-[300px]" /></div>
        </div>
      </div>
    </div>
  </section>
</template>
