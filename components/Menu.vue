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
</script>

<template>
    <div class="w-full bg-snow text-coal fixed top-0 left-0 z-10">
        <div class="px-[24px] py-[18px] flex justify-between items-center">
            <div class="w-[200px] flex" :style="{ height: opened ? '28px' : '14px' }"><button @click="toggleMenu" class="h-full"><img :src="`/assets/images/${opened ? 'cross' : 'burger'}.png`" class="h-full" /></button></div>
            <div class="font-vermin text-s"><PrismicLink :field="makePrismicLink('/')" @click="closeMenu">{{ params.data.website_title }}</PrismicLink></div>
            <div class="w-[200px] flex gap-[12px] items-center justify-end">
                <PrismicLink v-if="menu.data.show_cart"><img src="/assets/images/cart.png" class="h-[22px]" /></PrismicLink>
                <PrismicLink v-if="menu.data.show_contact" :field="makePrismicLink('/contact')" @click="closeMenu" class="font-slussen relative p-[12px]">
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
                <PrismicImage :field="menu.data.image" :style="{ height: linksListHeight + 'px' }" />
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
    <div v-show="opened" class="w-full h-full bg-coal opacity-80 fixed top-0 left-0 z-[9]"></div>
</template>
