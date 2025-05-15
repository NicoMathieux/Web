<script setup lang="ts">
import { parseGPX } from "@we-gold/gpxjs";

const props = defineProps<{
	place: String;
	date: String;
	gpx: String;
}>();

let mounted = false, animationStarted = false;

const shownGeoJson = ref({
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: [],
			},
		},
	],
});

let geoJsonCoords;
const bounds = ref();
const endpoints = ref();
const mapRef = useMapboxRef("mapRef");

const onLoad = () => {
	mapRef.value.loadImage("/assets/images/gpx-start.png", (error, image) => {
		if (error) throw error;
		mapRef.value.addImage("gpx-start", image);
	});
	mapRef.value.loadImage("/assets/images/gpx-end.png", (error, image) => {
		if (error) throw error;
		mapRef.value.addImage("gpx-end", image);
	});
};

onMounted(async () => {
	const response = await fetch(props.gpx);
	const text = await response.text();

	const [parsedFile, error] = parseGPX(text);

	if (error) throw error;

	const geo = parsedFile.toGeoJSON();
	geoJsonCoords = geo.features.find((el) => el.geometry.type === 'LineString')!.geometry.coordinates;
	bounds.value = getBounds(geo);

	mapRef.value.fitBounds(bounds.value, {
		padding: { top: 50, bottom: 80, left: 50, right: 50 }
	});

	const ends = getEndpoints(geo);
	endpoints.value = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: {
					position: "first",
				},
				geometry: {
					type: "Point",
					coordinates: ends.first,
				},
			},
			{
				type: "Feature",
				properties: {
					position: "last",
				},
				geometry: {
					type: "Point",
					coordinates: ends.last,
				},
			},
		],
	};

	mounted = true;
});

const onZoomEnd = () => {
	if (mounted && !animationStarted) {
		animationStarted = true;
		mapRef.value.setPaintProperty("start-layer", "icon-opacity", 1);
		setTimeout(() => {
			startTime = performance.now();
			animateLine();
		}, 500);
	}
};

let animation;
let startTime = 0;
let progress = 0;
let duration = 5000;
let currentIndex = 0;
let index = 0;

const animateLine = () => {
	progress = performance.now() - startTime;

	if (progress > duration) { // On animation ended
		addCoords(currentIndex, geoJsonCoords.length);
		mapRef.value.setPaintProperty("end-layer", "icon-opacity", 1);
		enableInteraction();
		cancelAnimationFrame(animation);
	} else {
		index = Math.floor((progress / duration) * geoJsonCoords.length);
		if (currentIndex !== index) {
			addCoords(currentIndex, index);
			currentIndex = index;
		}
		animation = requestAnimationFrame(animateLine);
	}
};

const addCoords = (start, end) => {
	for (var i = start; i < end; i++) {
		shownGeoJson.value.features[0].geometry.coordinates.push(geoJsonCoords[i]);
		mapRef.value.getSource("gpxFile").setData(shownGeoJson.value);
	}
}

const enableInteraction = () => {
	mapRef.value.boxZoom.enable()
    mapRef.value.doubleClickZoom.enable()
    mapRef.value.dragPan.enable()
    mapRef.value.dragRotate.enable()
    mapRef.value.keyboard.enable()
    mapRef.value.scrollZoom.enable()
    mapRef.value.touchPitch.enable()
    mapRef.value.touchZoomRotate.enable()
}
</script>

<template>
	<div class="h-[670px] overflow-hidden relative">
		<ImageDetails :place :date />
		<MapboxMap
			map-id="mapRef"
			style="height: 700px; z-index: 0"
			:options="{
				style: 'mapbox://styles/evanmartiin/cmap789d000n501s97gqh93vv',
				boxZoom: false,
				doubleClickZoom: false,
				dragPan: false,
				dragRotate: false,
				keyboard: false,
				pitchWithRotate: false,
				scrollZoom: false,
				touchPitch: false,
				touchZoomRotate: false,
			}"
			@load="onLoad"
			@zoomend="onZoomEnd"
		>
			<MapboxSource
				source-id="gpxFile"
				:source="{
					type: 'geojson',
					data: shownGeoJson,
				}"
			/>
			<MapboxLayer
				:layer="{
					source: 'gpxFile',
					id: 'geojson-layer',
					type: 'line',
					paint: {
						'line-color': '#FFF',
						'line-width': 5,
					},
					layout: {
						'line-join': 'round',
						'line-round-limit': 0,
					},
				}"
			/>

			<MapboxSource
				source-id="endpointsData"
				:source="{
					type: 'geojson',
					data: endpoints,
				}"
			/>
			<MapboxLayer
				:layer="{
					source: 'endpointsData',
					id: 'start-layer',
					type: 'symbol',
					layout: {
						'icon-image': 'gpx-start',
						'icon-size': 0.2,
					},
					paint: {
						'icon-opacity': 0,
						'icon-opacity-transition': { duration: 500 },
					},
					filter: ['==', 'position', 'first'],
				}"
			/>
			<MapboxLayer
				:layer="{
					source: 'endpointsData',
					id: 'end-layer',
					type: 'symbol',
					layout: {
						'icon-image': 'gpx-end',
						'icon-size': 0.2,
					},
					paint: {
						'icon-opacity': 0,
						'icon-opacity-transition': { duration: 500 },
					},
					filter: ['==', 'position', 'last'],
				}"
			/>
		</MapboxMap>
	</div>
</template>
