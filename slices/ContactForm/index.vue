<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
	getSliceComponentProps<Content.ContactFormSlice>([
		"slice",
		"index",
		"slices",
		"context",
	])
);

const params = getPrismicSingle("settings");

const response = ref({
	status: 0,
	message: "",
	success: false,
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const timeout = ref();

const form = ref({
  access_key: params.value.data.web3forms_api_key,
  name: "",
  email: "",
  category: "",
  subject: "",
  message: "",
});

const submitForm = async () => {
	form.value.subject = `[${form.value.category}] ${form.value.subject}`;
	delete form.value.category;
	form.value.from_name = form.value.name;

	isSubmitting.value = true;
	isSubmitted.value = false;

  try {
    const result = await $fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form.value,
    });

	response.value = {
		status: result.status,
		message: result.message,
		success: result.success,
	};

	isSubmitted.value = result.status === 200;

	clearTimeout(timeout.value);

	if (!isSubmitted.value) {
		timeout.value = setTimeout(() => {
			response.value = {
				status: 0,
				message: "",
				success: false,
			};
		}, 5000);
	} else {
		response.message = "Votre email a bien été envoyé !"
	}

  } catch (error) {
	response.value = {
		status: 500,
		message:
			error instanceof Error
				? `Erreur : ${error.message}`
				: "Une erreur inconnue est survenue.",
		success: false,
	};
  } finally {
    form.value.name = "";
    form.value.email = "";
    form.value.category = "";
    form.value.subject = "";
    form.value.message = "";

	isSubmitting.value = false;
  }
};

const { isMobile } = useDevice();

const { isShopOn } = useShop();
</script>

<template>
	<section
		:data-slice-type="slice.slice_type"
		:data-slice-variation="slice.variation"
		v-if="!(slice.primary.shop_related && !isShopOn)"
	>
		<div class="grid grid-cols-3 gap-[50px]">
			<CustomImage v-if="!isMobile" :image="slice.primary.image" />

			<form
				id="form"
				@submit.prevent="submitForm"
				class="col-span-3 lg:col-span-2 grid grid-cols-3 gap-[30px] lg:gap-[45px]"
			>
				<div class="flex flex-col col-span-3 lg:col-span-1">
					<label
						for="name"
						class="font-rader text-m mb-[4px] lg:mb-[8px]"
						>Nom</label
					>
					<input
						type="text"
						name="name"
						id="name"
						v-model="form.name"
						placeholder="Nicolas Mathieux"
						required
					/>
				</div>

				<div class="flex flex-col col-span-3 lg:col-span-2">
					<label
						for="email"
						class="font-rader text-m mb-[4px] lg:mb-[8px]"
						>Adresse mail</label
					>
					<input
						type="email"
						name="email"
						id="email"
						v-model="form.email"
						placeholder="marketing@nicomathieux.com"
						required
					/>
				</div>

				<div class="flex flex-col col-span-3 lg:col-span-1">
					<label
						for="category"
						class="font-rader text-m mb-[4px] lg:mb-[8px]"
						>Type de demande</label
					>
					<select required name="category" id="category" v-model="form.category">
						<option disabled selected value>Sélectionne...</option>
						<option
							v-for="item in slice.primary.categories"
							:value="item.category"
						>
							{{ item.category }}
						</option>
					</select>
				</div>

				<div class="flex flex-col col-span-3 lg:col-span-2">
					<label
						for="subject"
						class="font-rader text-m mb-[4px] lg:mb-[8px]"
						>Objet</label
					>
					<input
						type="text"
						name="subject"
						id="subject"
						v-model="form.subject"
						placeholder="Projet d'expédition sur la Lune"
						required
					/>
				</div>

				<div class="flex flex-col col-span-3">
					<label
						for="message"
						class="font-rader text-m mb-[4px] lg:mb-[8px]"
						>Message</label
					>
					<textarea
						id="message"
						name="message"
						v-model="form.message"
						placeholder="Salut ! Je vous contacte pour..."
						required
						class="min-h-32"
					></textarea>
				</div>

				<div
					class="flex gap-[12px] col-span-3 lg:col-span-1 lg:col-start-2 justify-center items-center"
				>
					<button
						type="submit"
						:disabled="isSubmitting"
						v-if="!isSubmitted"
						class="inline-block font-rader text-m px-[24px] py-[12px] relative disabled:grayscale disabled:cursor-not-allowed"
					>
						<img
							class="absolute top-1/2 -translate-y-1/2 left-0 -z-1 w-full h-full object-fill"
							src="/assets/images/btn-brush.png"
						/>
						<div class="z-0 relative flex gap-[15px] items-center">
							Envoyer<img
								class="h-[20px] inline-block"
								src="/assets/images/arrow-snow.png"
							/>
						</div>
					</button>
				</div>

				<div :class="response.status !== 0 ? 'opacity-100' : 'opacity-0'" class="text-center font-slussen col-span-3">
					<p
						:class="
								response.success ? 'text-forest' : 'text-[#9A1C1C]'
						"
						class="text-m leading-[120%]"
					>
							<span class="font-bold">{{ response.success ? "Succès : " : "Erreur : " }}</span>
							{{ response.success ? 'Votre email a bien été envoyé !' : response.message }}
					</p>
				</div>
			</form>
		</div>
	</section>
</template>

<style scoped>
input,
textarea,
select {
	@apply font-slussen p-[4px] placeholder:italic placeholder:text-snow/50 focus:outline-[0px];
}

input,
select,
textarea {
	@apply bg-[#00000000] border-b border-snow/50;
}

.custom-image {
	height: 500px;
}
</style>
