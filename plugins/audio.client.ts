export default defineNuxtPlugin(() => {
	let audio: HTMLAudioElement | null = null;

	let fadeInterval: NodeJS.Timeout | null = null;
	let loopTimeout: ReturnType<typeof setTimeout> | null = null;
	let looping = false;
	let fadeDuration = 2;
	let fadeStep = 0.05;
	let audioDuration = 0;
	let maxVolume = 0.1;

	const clearFadeInterval = () => {
		if (fadeInterval) {
			clearInterval(fadeInterval);
			fadeInterval = null;
		}
	};

	const fadeIn = () => {
		clearFadeInterval();
		if (!audio) return;
		fadeInterval = setInterval(
			() => {
				if (audio!.volume < maxVolume) {
					audio!.volume = Math.min(audio!.volume + fadeStep, maxVolume);
				} else {
					clearFadeInterval();
				}
			},
			fadeDuration * 1000 * fadeStep
		);
	};

	const fadeOut = (onComplete?: () => void) => {
		clearFadeInterval();
		if (!audio) return;
		fadeInterval = setInterval(
			() => {
				if (audio!.volume > 0) {
					audio!.volume = Math.max(audio!.volume - fadeStep, 0);
				} else {
					clearFadeInterval();
					onComplete?.();
				}
			},
			fadeDuration * 1000 * fadeStep
		);
	};

	const loop = () => {
		if (!audio || !audioDuration) {
			loopTimeout = setTimeout(loop, 1000);
			return;
		}
		const loopTime = audioDuration - fadeDuration;
		loopTimeout = setTimeout(() => {
			if (!looping) return;
			fadeOut(() => {
				if (!looping) return;
				audio!.currentTime = 0;
				audio!.play();
				fadeIn();
				loop();
			});
		}, loopTime * 1000);
	};

	const startLoop = () => {
		if (!audio || looping) return;
		looping = true;
		audio.currentTime = 0;
		audio
			.play()
			.then(() => {
				fadeIn();
				loop();
			})
			.catch(() => {
				const resume = () => {
					audio!.play().then(() => {
						fadeIn();
						loop();
					});
					window.removeEventListener("click", resume);
					window.removeEventListener("keydown", resume);
				};
				window.addEventListener("click", resume);
				window.addEventListener("keydown", resume);
			});
	};

	const stopLoop = () => {
		if (!audio) return;
		looping = false;
		if (loopTimeout) {
			clearTimeout(loopTimeout);
			loopTimeout = null;
		}
		fadeOut(() => {
			audio!.pause();
			audio!.currentTime = 0;
		});
	};

	const createAudio = (src: string) => {
		if (audio) {
			stopLoop();
			audio.pause();
			audio = null;
		}
		audio = new Audio(src);
		audio.volume = 0;
		audio.loop = false;
		audio.preload = "auto";
		audioDuration = 0;

		audio.addEventListener("loadedmetadata", () => {
			audioDuration = audio!.duration;
		});

		window.$startBackgroundLoop = startLoop;
		window.$stopBackgroundLoop = stopLoop;
	};

	window.$createBackgroundAudio = createAudio;
	window.$startBackgroundLoop = () => {};
	window.$stopBackgroundLoop = () => {};
});
