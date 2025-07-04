<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { useMenuStore } from "../../stores/menu";
import { computed } from "vue";
import gsap from "gsap";

const props = defineProps(
  getSliceComponentProps<Content.MenuItemSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const menuStore = useMenuStore();

const { isMobile } = useDevice();

const onMouseEnter = () => {
	if (isMobile) return;
  menuStore.setHoveredID(props.index);
}

const isHovered = computed(() => menuStore.hoveredID === props.index);
const showSubmenu = ref(false);

watch(isHovered, (isHoveredNow, wasHoveredBefore) => {
	if (props.slice.variation !== "withSubmenu" || isMobile) return;

	if (isHoveredNow && !wasHoveredBefore) {
		animateSubmenuOpen();
	} else if (!isHoveredNow && wasHoveredBefore) {
		animateSubmenuClose();
	}
})

const animateSubmenuOpen = () => {
	showSubmenu.value = true;
	const timeline = gsap.timeline();
	timeline
		.fromTo(
			`.submenu-link-${props.index}`,
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				stagger: 0.07,
				duration: 0.3,
				ease: "power2.out",
			}
		);
};

const animateSubmenuClose = () => {
	const timeline = gsap.timeline();
	timeline
		.to(`.submenu-link-${props.index}`, {
			opacity: 0,
			y: 10,
			stagger: { each: 0.05, from: "end" },
			duration: 0.2,
			onComplete: () => {
				showSubmenu.value = false;
			}
		});
};
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
	class="menu-link relative"
  >
	<PrismicLink :field="slice.primary.link" @mouseenter="onMouseEnter" />
	<div v-show="slice.variation === 'withSubmenu' && (showSubmenu || isMobile)" class="lg:absolute top-0 left-[100%] ml-[15px] gap-[15px] flex items-start bg-snow">
		<img class="w-[18px] lg:w-[24px] mt-[17px] lg:mt-[20px]" :class="`submenu-link-${index}`" src="/assets/images/arrow-coal.png" />
		<div class="flex flex-col" :class="{ 'text-l leading-[150%]': isMobile }">
			<PrismicLink v-for="sublink in slice.primary.sublinks" :field="sublink" :class="`submenu-link-${index}`" />
		</div>
	</div>
  </section>
</template>
