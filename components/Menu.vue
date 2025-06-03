<script setup lang="ts">
const menu = getPrismicSingle("menu");
const params = getPrismicSingle("settings");

const opened = ref(false);
const linksList = ref(null);
const linksListHeight = ref(0);

const toggleMenu = () => {
    if (linksListHeight.value === 0) setTimeout(updateHeight, 0);
    opened.value = !opened.value;
};

const closeMenu = () => {
    opened.value = false;
}

onMounted(() => {
    window.addEventListener('resize', updateHeight);
})

onUnmounted(() => {
    window.removeEventListener('resize', updateHeight);
})

const updateHeight = () => {
    linksListHeight.value = linksList.value.offsetHeight;
}

const { isMobile } = useDevice();
</script>

<template>
    <div class="w-full bg-snow text-coal fixed top-0 left-0 z-10 mask-container" :class="isMobile ? 'mobile' : 'desktop'">
        <div class="px-[24px] pt-[18px] pb-[8px] flex justify-between items-center">
            <div class="w-[50px] lg:w-[150px] flex" :style="{ height: (opened && !isMobile) ? '28px' : '14px' }">
                <button @click="toggleMenu" class="h-full w-[34px] flex items-center justify-center">
                    <img :src="`/assets/images/${opened ? 'cross' : 'burger'}.png`" class="h-full" />
                </button>
            </div>
            <div class="font-vermin text-xs lg:text-s mt-[4px]"><PrismicLink :field="makePrismicLink('/')" @click="closeMenu">{{ params.data.website_title }}</PrismicLink></div>
            <div class="w-[50px] lg:w-[150px] flex gap-[12px] items-center justify-end">
                <PrismicLink v-if="menu.data.show_cart"><img src="/assets/images/cart.png" class="h-[22px]" /></PrismicLink>
                <PrismicLink v-if="menu.data.show_contact && !isMobile" :field="makePrismicLink('/contact')" @click="closeMenu" class="font-slussen relative p-[12px]">
                    <img src="/assets/images/contact-brush.png" class="h-[35px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    Contact
                </PrismicLink>
            </div>
        </div>
        <div v-show="opened" class="px-[24px] pt-[30px] pb-[48px]">
            <div class="flex justify-between">
                <div ref="linksList" class="font-rader leading-[120%] text-xl flex flex-col gap-[24px] h-full overflow-auto">
                    <div v-for="link in menu.data.links"><PrismicLink :field="link" @click="toggleMenu" /></div>
                </div>
                <Scratched><PrismicImage v-show="!isMobile" :field="menu.data.image" :style="{ height: linksListHeight + 'px' }" /></Scratched>
            </div>
            <div v-if="menu.data.show_social_medias" class="h-[24px] flex gap-[12px] mt-[48px]">
                <div v-for="social_media in params.data.social_medias" class="h-full">
                    <PrismicLink :field="social_media.link">
                        <PrismicImage :field="social_media.logo" class="h-full" />
                    </PrismicLink>
                </div>
            </div>
        </div>
    </div>
    <div v-show="opened" class="w-full h-full bg-coal opacity-80 fixed top-0 left-0 z-[9] hover:cursor-pointer" @click="closeMenu"></div>
</template>

<style scoped>
.mask-container {
    &.desktop::after {
        mask-image: url('/assets/images/masks/menu-desktop.png');
    }

    &.mobile::after {
        mask-image: url('/assets/images/masks/menu-mobile.png');
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 11px;
        pointer-events: none;
        background: white;
        z-index: 5;
        mask-size: 100% auto;
        mask-position: bottom;
        mask-repeat: no-repeat;
    }
}
</style>