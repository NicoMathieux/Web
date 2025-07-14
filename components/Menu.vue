<script setup lang="ts">
import { components } from '~/slices'
import { gsap } from "gsap";
import { useMenuStore } from '../stores/menu';

const menu = getPrismicSingle("menu");
const params = getPrismicSingle("settings");

const opened = ref(false);
const linksList = ref(null);
const linksListHeight = ref(0);

const menuStore = useMenuStore();

const toggleMenu = () => {
	if (linksListHeight.value === 0) setTimeout(updateHeight, 0);
	opened.value = !opened.value;
};

const closeMenu = () => {
	opened.value = false;
};

onMounted(() => {
	window.addEventListener("resize", updateHeight);
});

onUnmounted(() => {
	window.removeEventListener("resize", updateHeight);
});

const updateHeight = () => {
	linksListHeight.value = linksList.value.offsetHeight;
};

const { isMobile } = useDevice();

watch(opened, async (isOpen) => {
	await nextTick();
	if (isOpen) {
		menuStore.setHoveredID(null);
		animateMenuOpen();
	} else {
		animateMenuClose();
	}
});

const animateMenuOpen = () => {
	const timeline = gsap.timeline();
	timeline
		.fromTo(
			".menu-hidden-part",
			{ y: -50, opacity: 0, display: "none" },
			{
				y: 0,
				opacity: 1,
				display: "block",
				duration: 0.4,
				ease: "power2.out",
			}
		)
		.fromTo(
			".menu-overlay",
			{ opacity: 0, display: "none" },
			{ opacity: 0.8, display: "block", duration: 0.3 },
			"<"
		)
		.fromTo(
			".menu-link",
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				stagger: 0.07,
				duration: 0.3,
				ease: "power2.out",
			},
			"-=0.2"
		);
};

const animateMenuClose = () => {
	const timeline = gsap.timeline();
	timeline
		.to(".menu-link", {
			opacity: 0,
			y: 10,
			stagger: { each: 0.05, from: "end" },
			duration: 0.2,
		})
		.to(
			".menu-hidden-part",
			{ y: -50, opacity: 0, display: "none", duration: 0.3 },
			"<"
		)
		.to(
			".menu-overlay",
			{ opacity: 0, display: "none", duration: 0.3 },
			"<"
		);
};

const route = useRoute();

watch(() => route.path, () => {
	closeMenu();
})

const { isShopOn } = useShop();
</script>

<template>
	<div
		class="w-full bg-snow text-coal fixed top-0 left-0 z-10 mask-container"
		:class="{ 'mobile': isMobile, 'desktop': !isMobile, 'h-full overflow-x-hidden overflow-y-scroll after:opacity-0': opened && isMobile }"
	>
		<div
			class="px-[24px] pt-[18px] pb-[8px] flex justify-between items-center"
		>
			<div
				class="w-[50px] lg:w-[150px] flex"
				:style="{ height: opened && !isMobile ? '28px' : '14px' }"
			>
				<button
					@click="toggleMenu"
					class="h-full w-[34px] flex items-center justify-center"
				>
					<img
						:src="`/assets/images/${opened ? 'cross' : 'burger'}.png`"
						class="h-full"
					/>
				</button>
			</div>
			<div class="font-vermin text-xs lg:text-s mt-[4px]">
				<PrismicLink :field="makePrismicLink('/')" @click="closeMenu">{{
					params.data.website_title
				}}</PrismicLink>
			</div>
			<div
				class="w-[50px] lg:w-[150px] flex gap-[12px] items-center justify-end"
			>
				<PrismicLink v-if="menu.data.show_cart && isShopOn">
					<img src="/assets/images/cart.png" class="h-[22px]" />
				</PrismicLink>
				<PrismicLink
					v-if="menu.data.show_contact && !isMobile"
					:field="makePrismicLink('/contact')"
					@click="closeMenu"
					class="font-slussen relative p-[12px]"
				>
					<img
						src="/assets/images/contact-brush.png"
						class="h-[35px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
					Contact
				</PrismicLink>
			</div>
		</div>

		<div
			class="menu-hidden-part px-[24px] pt-[30px] pb-[48px] translate-y-[-200px]"
			style="display: none"
		>
			<div class="flex justify-between">
				<SliceZone
					wrapper="main"
					ref="linksList"
					class="font-rader leading-[120%] text-xl flex flex-col items-start gap-[24px] h-full"
					:slices="menu.data.slices ?? []"
					:components="components"
				/>
				<Scratched>
					<PrismicImage
						v-show="!isMobile"
						:field="menu.data.image"
						:style="{ height: linksListHeight + 'px' }"
					/>
				</Scratched>
			</div>

			<div
				v-if="menu.data.show_social_medias"
				class="h-[24px] flex gap-[12px] mt-[48px]"
			>
				<div
					v-for="(social_media, i) in params.data.social_medias"
					:key="i"
					class="h-full"
				>
					<PrismicLink :field="social_media.link">
						<PrismicImage
							:field="social_media.logo"
							class="h-full"
						/>
					</PrismicLink>
				</div>
			</div>
		</div>
	</div>

	<div
		class="menu-overlay w-full h-full bg-coal fixed top-0 left-0 z-[9] hover:cursor-pointer"
		style="opacity: 0; display: none"
		@click="closeMenu"
	></div>
</template>

<style scoped>
.mask-container {
	&.desktop::after {
		mask-image: url("/assets/images/masks/menu-desktop.png");
	}

	&.mobile::after {
		mask-image: url("/assets/images/masks/menu-mobile.png");
	}

	&::after {
		content: "";
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

.menu-link {
	transition: opacity 0.3s ease;
}
</style>
