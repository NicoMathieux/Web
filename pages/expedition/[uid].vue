<script setup lang="ts">
import { components } from '~/slices'

const route = useRoute();
const page = await getPrismicReusable("expedition", route.params.uid as string);

const allExpeditionsPage = getPrismicSingle("expeditions");

useMeta(page);
</script>

<template>
  <div v-if="page">
    <Breadcrumb :links="[[allExpeditionsPage.data.meta_title, allExpeditionsPage.url], [page.data.meta_title, page.url]]" />
    <div
      class="flex items-end justify-between border-b border-snow/50 pb-[12px] mb-[24px]"
    >
      <div class="font-rader leading-[90%] text-xl">{{ page.data.title }}</div>
      <div class="flex gap-[4px] items-center">
        <span class="font-slussen">{{ letterDate(page.data.date) }}</span>
        <div class="w-[11px] h-[11px] bg-snow rounded-full"></div>
      </div>
    </div>
    <Map :place="page.data.place" :date="page.data.date" :gpx="page.data.gpx_file.url" />
    <SliceZone
      wrapper="main"
      class=" flex flex-col gap-[96px] lg:gap-[132px] mt-[66px]"
      :slices="page.data.slices ?? []"
      :components="components"
    />
    <FixedButton :link="page.data.youtube_link">Youtube</FixedButton>
  </div>
</template>
