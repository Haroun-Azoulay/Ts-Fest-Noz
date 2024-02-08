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
    <form  @submit.prevent="postPoints">
      <input v-model="addPoint.longitude" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="longitude">
      <input v-model="addPoint.latitude" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="latitude">
      <input v-model="addPoint.text" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="text">
      <input v-model="addPoint.address" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="address">
      <input v-model="addPoint.color" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="color">

      <button type="submit">Ajouter un point</button>
    </form>
    <ul v-for="(point) in points" :key="point.id">
    <li>{{ points }}</li>
  </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import ApiService from "@/services/ApiService";


interface Maps {
  id: number;
  longitude: number;
  latitude: number;
  text: string;
  address: string;
  color: string;
}

// Initialisation de points avec un tableau vide
const points = ref<Maps[]>([]);

const addPoint = ref<Maps>({
  id: 0,
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  text: '',
  address: '',
  color: '',
});

const center = ref<Coordinates>({ longitude: 2.3522, latitude: 48.8566 });
const zoom = ref<number>(10.5);

let map: Map | null = null;

const createMap = () => {
  const token: string = import.meta.env.VITE_MAPBOX_TOKEN;
  console.log('Clé Mapbox :', token);
  mapboxgl.accessToken = token;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [center.value.longitude, center.value.latitude],
    zoom: zoom.value,
  });
};

const addMarkers = () => {
  if (map) {
    points.value.forEach((point) => {
      const marker = new Marker({ color: point.color })
        .setLngLat([point.coordinates.longitude, point.coordinates.latitude])
        .addTo(map);

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<p>${point.text} - ${point.address}</p>`);
      marker.setPopup(popup);
    });
  }
};

onMounted(async () => {
  createMap();
  
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.error("L'utilisateur n'est pas authentifié.");
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      Origin: "http://localhost:5173",
    },
  };

  try {
    const response = await ApiService.get("/maps/get-all-points", config);
    points.value = response.data;
    addMarkers(); // Appeler addMarkers ici pour s'assurer que les points sont chargés
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});




const postPoints = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    console.log("Token d'authentification :", authToken);
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        Origin: "http://localhost:5173",
      },
    };

    console.log("Configuration de la requête :", config, addPoint);

    await ApiService.post("/maps/create-point", addPoint.value, config);
    window.location.reload();
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
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
