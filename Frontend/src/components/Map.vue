<template>
  <main>
    <div class="text-container">
      <p>Center: {{ center }}</p>
      <p>Zoom: {{ zoom }}</p>
    </div>
    <div id="map" class="map-container"></div>

    <div class="search-controls">
      <input v-model="citySearch" type="text" placeholder="Entrez la ville">
      <input v-model="streetSearch" type="text" placeholder="Entrez la rue">
      <button @click="searchPoints">Rechercher</button>
    </div>

    <button @click="addPoint">Ajouter un point</button>
    <ul>
      <li v-for="(point, index) in filteredPoints" :key="index">
        {{ point.text }} - {{ point.address }} - Latitude: {{ point.coordinates.latitude }}, Longitude: {{ point.coordinates.longitude }}
        <button @click="removePoint(index)">Supprimer</button>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import mapboxgl, { Map, Marker, accessToken } from 'mapbox-gl';

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface Point {
  coordinates: Coordinates;
  text: string;
  address: string;
  color: string;
}

const center = ref<Coordinates>({ longitude: 2.3522, latitude: 48.8566 });
const zoom = ref<number>(10.5);

const points = ref<Point[]>([
  { coordinates: { longitude: 2.3522, latitude: 48.8566 }, text: 'Point 1', address: 'Paris, France 11 rue saint just', color: '#FF0000' },
  { coordinates: { longitude: -0.1276, latitude: 51.5074 }, text: 'Point 2', address: 'London, UK', color: '#00FF00' },
]);

let map: Map | null = null;

onMounted(() => {
  createMap();
  addMarkers();
});

const createMap = () => {

  const token: string = import.meta.env.VITE_MAPBOX_TOKEN;
  console.log('Clé Mapbox :', token);
  map = new mapboxgl.Map({
    accessToken: token,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [center.value.longitude, center.value.latitude],
    zoom: zoom.value,
  });
  // ... (Gestion des mouvements de carte) ...
};

const addMarkers = () => {
  if (map) {
    points.value.forEach((point) => {
      const marker = new Marker({ color: point.color })
        .setLngLat([point.coordinates.longitude, point.coordinates.latitude])
        .addTo(map!);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<p>${point.text} - ${point.address}</p>`);
      marker.setPopup(popup);
    });
  }
};

const addPoint = () => {
  points.value.push({
    coordinates: { longitude: Math.random() * 10, latitude: Math.random() * 10 },
    text: `Point ${points.value.length + 1}`,
    address: 'Nouvelle adresse',
    color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
  });
};

const removePoint = (index: number) => {
  points.value.splice(index, 1);
};
// Filtre des points en fonction de la ville et de la rue saisies
const citySearch = ref('');
const streetSearch = ref('');

const filteredPoints = computed(() => {
  const cityFilter = citySearch.value.trim().toLowerCase();
  const streetFilter = streetSearch.value.trim().toLowerCase();

  return points.value.filter((point) => {
    const address = point.address.toLowerCase();
    return address.includes(cityFilter) && address.includes(streetFilter);
  });
});

const searchPoints = () => {
  // Cette fonction met à jour la liste de points filtrés selon la recherche
};
</script>


<style scoped>
.map-container {
  height: 400px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid darkgrey;
}

.text-container {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  margin: 0 auto;
}
</style>
