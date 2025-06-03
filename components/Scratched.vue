<script setup lang="ts">
const props = defineProps<{
    variation?: String,
}>();

const maskID = props.variation || Math.ceil(Math.random() * 3);

const scratched = ref();

onMounted(() => {
    const child = Array.from(scratched.value.childNodes).filter((e) => e.nodeType === 1)[0];
    child.style.maskImage = `url(/assets/images/masks/${maskID}.png)`;
    child.style.maskSize = "100% 100%";
    child.style.maskPosition = "center";
    child.style.maskRepeat = "no-repeat";
})
</script>

<template>
    <span ref="scratched">
        <slot />
    </span>
</template>