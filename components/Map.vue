<script setup lang="ts">
import { parseGPX } from "@we-gold/gpxjs";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoiZXZhbm1hcnRpaW4iLCJhIjoiY21hcGZqbWl0MGZ5eTJqcXRxd244NXBmbiJ9.kMMXB_B33VtEUTD3aGUvzA";

const props = defineProps<{
	place: String;
	date: String;
	gpx: String;
}>();

let mapLoaded = false, imagesLoaded = false;

let shownGeoJson = {
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
};

let geoJsonCoords = [];
let bounds = [];
let endpoints = {};
let map;
const mapContainer = ref(null);

const { isMobile } = useDevice();

onMounted(async () => {
	initMap();

	loadImages();

	await processGPX();
})

const initMap = () => {
	map = new mapboxgl.Map({
		container: mapContainer.value,
		style: "mapbox://styles/evanmartiin/cmap789d000n501s97gqh93vv",
		boxZoom: false,
		doubleClickZoom: false,
		dragPan: false,
		dragRotate: false,
		keyboard: false,
		pitchWithRotate: false,
		scrollZoom: false,
		touchPitch: false,
		touchZoomRotate: false,
	});
	map.on('load', () => {
		mapLoaded = true;
		onLoaded();
	});
}

const fitBounds = () => {
	map.fitBounds(bounds, {
		padding: { top: 50, bottom: isMobile ? 100 : 80, left: 50, right: 50 }
	});
}

const loadImages = async () => {
	if (!map.hasImage("gpx-start")) {
		map.loadImage("/assets/images/gpx-start.png", (error, image) => {
			if (error) throw error;
			map.addImage("gpx-start", image);
			if (map.hasImage("gpx-end")) {
				imagesLoaded = true;
				onLoaded();
			}
		});
	}

	if (!map.hasImage("gpx-end")) {
		map.loadImage("/assets/images/gpx-end.png", (error, image) => {
			if (error) throw error;
			map.addImage("gpx-end", image);
			if (map.hasImage("gpx-start")) {
				imagesLoaded = true;
				onLoaded();
			}
		});
	}
}

// Loading GPX, parsing it, and sorting to get track bounds, and track endpoints
const processGPX = async () => {
	const response = await fetch(props.gpx);
	const text = await response.text();

	const [parsedFile, error] = parseGPX(text);

	if (error) throw error;

	const geo = parsedFile.toGeoJSON();
	geoJsonCoords = geo.features.find((el) => el.geometry.type === 'LineString')!.geometry.coordinates;
	bounds = getBounds(geo);

	const ends = getEndpoints(geo);
	endpoints = {
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
}

// Starting point for every functions on mapRef like addSource, addLayer, getSource, ...
const onLoaded = () => {
	if (!mapLoaded || !imagesLoaded) return;

	fitBounds();
	
	addGeojson();
	addEndpoints();

	map.on('zoomend', onZoomEnd);
}

// Adding source and 2 layers for gpx track start and end
const addEndpoints = () => {
	map.addSource("endpointsData", { type: 'geojson', data: endpoints });

	map.addLayer({
		id: "startLayer",
		source: "endpointsData",
		type: "symbol",
		layout: {
			"icon-image": "gpx-start",
			"icon-size": 0.2
		},
		paint: {
			"icon-opacity": 0,
			"icon-opacity-transition": { duration: 500 }
		},
		filter: ["==", "position", "first"]
	})

	map.addLayer({
		id: "endLayer",
		source: "endpointsData",
		type: "symbol",
		layout: {
			"icon-image": "gpx-end",
			"icon-size": 0.2
		},
		paint: {
			"icon-opacity": 0,
			"icon-opacity-transition": { duration: 500 }
		},
		filter: ["==", "position", "last"]
	})
}

// Adding source and layer for gpx track
const addGeojson = () => {
	map.addSource("gpxData", { type: 'geojson', data: shownGeoJson });

	map.addLayer({
		id: "gpxLayer",
		source: "gpxData",
		type: "line",
		layout: {
			"line-join": "round",
			"line-round-limit": 0
		},
		paint: {
			"line-color": "#FFF",
			"line-width": 5
		},
	});
}

let animation;
let startTime = 0;
let progress = 0;
let duration = 5000;
let currentIndex = 0;
let index = 0;
let animationStarted = false;

const onZoomEnd = () => {
	if (!animationStarted) {
		animationStarted = true;
		map.setPaintProperty("startLayer", "icon-opacity", 1);
		setTimeout(() => {
			startTime = performance.now();
			animateLine();
		}, 500);
	}
};

const animateLine = () => {
	progress = performance.now() - startTime;

	if (progress > duration) { // On animation ended
		addCoords(currentIndex, geoJsonCoords.length);
		map.setPaintProperty("endLayer", "icon-opacity", 1);
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
		shownGeoJson.features[0].geometry.coordinates.push(geoJsonCoords[i]);
		map.getSource("gpxData").setData(shownGeoJson);
	}
}

const enableInteraction = () => {
	map.boxZoom.enable()
    map.doubleClickZoom.enable()
    map.dragPan.enable()
    map.dragRotate.enable()
    map.keyboard.enable()
    map.scrollZoom.enable()
    map.touchPitch.enable()
    map.touchZoomRotate.enable()
}

onBeforeRouteLeave(() => {
	if (map.getLayer('startLayer')) map.removeLayer('startLayer');
	if (map.getLayer('endLayer')) map.removeLayer('endLayer');
	if (map.getLayer('gpxLayer')) map.removeLayer('gpxLayer');

	if (map.getSource('endpointsData')) map.removeSource('endpointsData');
	if (map.getSource('gpxData')) map.removeSource('gpxData');

	if (map.hasImage('gpx-start')) map.removeImage('gpx-start');
	if (map.hasImage('gpx-end')) map.removeImage('gpx-end');
		
	map.remove();
	map = null;
})
</script>

<template>
	<div class="h-[450px] lg:h-[670px] overflow-hidden relative">
		<ImageDetails :place :date />
		<div class="z-[0]" :class="isMobile ? 'h-[500px]' : 'h-[700px]'" ref="mapContainer"></div>
	</div>
</template>
