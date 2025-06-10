<script setup lang="ts">
import { components } from "~/slices";
import { isProduction } from "../utils/env";

const page = getPrismicSingle("contact");

useMeta(page);

if (isProduction()) {
	throw createError({
		statusCode: 404,
		statusMessage: `Page not found: /contact`,
	});
}
</script>

<template>
	<div v-if="page">
		<div>
			<SliceZone
				wrapper="main"
				class="flex flex-col gap-[96px] lg:gap-[132px]"
				:slices="page.data.slices ?? []"
				:components="components"
			/>
		</div>
	</div>
</template>
