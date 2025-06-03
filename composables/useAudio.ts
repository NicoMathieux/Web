const isAudioOn = ref<boolean | null>(null);
const hasInitialized = ref(false);

export const useAudio = async () => {
	const params = getPrismicSingle("settings");

	const audioUrl = computed(() => params.value.data.ambient_sound.url);

	onMounted(() => {
		if (import.meta.client && !hasInitialized.value) {
			const saved = localStorage.getItem("audioEnabled");
			isAudioOn.value = saved === null ? true : saved === "true";
			hasInitialized.value = true;

			if (audioUrl.value) {
				window.$createBackgroundAudio(audioUrl.value);
				if (isAudioOn.value) {
					window.$startBackgroundLoop?.();
				}
			}
		}
	});

	watchEffect(() => {
		if (import.meta.client && isAudioOn.value !== null) {
			if (isAudioOn.value) {
				window.$startBackgroundLoop?.();
			} else {
				window.$stopBackgroundLoop?.();
			}
		}
	});

	watch(isAudioOn, (val) => {
		if (import.meta.client && val !== null) {
			localStorage.setItem("audioEnabled", val.toString());
		}
	});

	const toggle = () => {
		if (isAudioOn.value !== null) {
			isAudioOn.value = !isAudioOn.value;
		}
	};

	const enable = () => {
		isAudioOn.value = true;
	};

	const disable = () => {
		isAudioOn.value = false;
	};

	return {
		isAudioOn,
		toggle,
		enable,
		disable,
	};
};
