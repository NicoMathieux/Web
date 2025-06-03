<script setup lang="ts">
const footer = getPrismicSingle("footer");
const params = getPrismicSingle("settings");

const { isMobile } = useDevice();
</script>

<template>
    <div class="w-full p-[60px] bg-snow text-coal flex justify-between flex-col lg:flex-row relative mask-container" :class="isMobile ? 'mobile' : 'desktop'">
        <div class="flex flex-col justify-between">
            <span class="font-vermin text-s">{{ params.data.website_title }}</span>
            <span class="font-slussen mt-[12px] lg:mt-[0px]">{{ footer.data.copyright }}</span>
        </div>

        <div class="flex gap-[36px] lg:gap-[24px] mt-[36px] lg:mt-[0px] flex-col lg:flex-row">
            <div v-if="footer.data.show_social_medias" class="h-[24px] flex gap-[12px] w-full lg:w-[200px]">
                <div v-for="social_media in params.data.social_medias" class="h-full">
                    <PrismicLink :field="social_media.link">
                        <PrismicImage :field="social_media.logo" class="h-full" />
                    </PrismicLink>
                </div>
            </div>
            <div v-for="column in footer.data.columns" class="w-full lg:w-[200px]">
                <span class="font-rader leading-[90%] text-m ">{{ column.title }}</span>
                <div class="font-slussen flex flex-col gap-[10px] mt-[12px] lg:mt-[24px]">
                    <div v-for="link in column.links"><PrismicLink :field="link" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mask-container {
    &.desktop::before, &.desktop::after {
        mask-image: url('/assets/images/masks/menu-desktop.png');
    }

    &.mobile::before, &.mobile::after {
        mask-image: url('/assets/images/masks/menu-mobile.png');
    }

    &::before, &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 11px;
        pointer-events: none;
        background: white;
        z-index: 2;
        mask-size: 100% auto;
        mask-position: bottom;
        mask-repeat: no-repeat;
    }

    &::before {
        top: -10px;
        transform: rotateZ(180deg);
    }

    &::after {
        bottom: -10px;
    }
}
</style>