<script setup lang="ts">
const footer = getPrismicSingle("footer");
const params = getPrismicSingle("settings");
</script>

<template>
    <div class="w-full p-[60px] bg-snow text-coal flex justify-between">
        <div class="flex flex-col justify-between">
            <span class="font-vermin text-s">{{ params.data.website_title }}</span>
            <span class="font-slussen">{{ footer.data.copyright }}</span>
        </div>

        <div class="flex gap-[24px]">
            <div v-if="footer.data.show_social_medias" class="h-[24px] flex gap-[12px] w-[200px]">
                <div v-for="social_media in params.data.social_medias" class="h-full">
                    <PrismicLink :field="social_media.link">
                        <PrismicImage :field="social_media.logo" class="h-full" />
                    </PrismicLink>
                </div>
            </div>
            <div v-for="column in footer.data.columns" class="w-[200px]">
                <span class="font-rader leading-[90%] text-m ">{{ column.title }}</span>
                <div class="font-slussen flex flex-col gap-[10px] mt-[24px]">
                    <div v-for="link in column.links"><PrismicLink :field="link" /></div>
                </div>
            </div>
        </div>
    </div>
</template>
