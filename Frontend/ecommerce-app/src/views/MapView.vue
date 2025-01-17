<template>
    <HeaderPage></HeaderPage>
    <section></section>
    <div id="map" class="map-container"></div>
  </template>
  

<script setup lang="ts">
import HeaderPage from '../pages/Header/HeaderPage.vue';
import { ref, onMounted } from 'vue';
import mapboxgl, { Map, Marker } from 'mapbox-gl';


const center = ref({ latitude: 45.4215, longitude: -75.6972 });
const zoom = ref(12); 
let map; 
onMounted(() => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNscGFleXpqYzA1eHgycW5rdGdma2JoOGwifQ.3I3YPCqSxPKBgvwyksQRwg"
  createMap();
});

const createMap = () => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [center.value.longitude, center.value.latitude],
    zoom: zoom.value,
  });
};



</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  