<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-lg flex justify-center items-center flex-col p-4 rounded-md shadow-lg bg-white">
      <h1 class="text-black mb-4 text-xl font-bold text-center">Créez un marqueur d'un évènement</h1>
      <form @submit.prevent="geocodeAndSubmit" class="w-full">
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Ville</label>
          <input
            class="text-center w-full p-2 border rounded shadow-md"
            v-model="geocoding_town"
            type="text"
            placeholder="Entrez la ville"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Numéro de rue</label>
          <input
            class="text-center w-full p-2 border rounded shadow-md"
            v-model="geocoding_number"
            type="text"
            placeholder="Entrez le numéro"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Nom de rue</label>
          <input
            class="text-center w-full p-2 border rounded shadow-md"
            v-model="geocoding_address"
            type="text"
            placeholder="Entrez la rue"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Code postal</label>
          <input
            class="text-center w-full p-2 border rounded shadow-md"
            v-model="geocoding_postal_code"
            type="text"
            placeholder="Entrez le code postal"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
    <!-- Map container -->
    <div id="map" style="width: 100%; height: 50vh; margin-top: 2rem;"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from "vue";
import { geocodeAddress } from "../../services/GeocodingService";
import mapboxgl from "mapbox-gl";

// Références des données
const geocoding_number = ref("");
const geocoding_address = ref("");
const geocoding_postal_code = ref("");
const geocoding_town = ref("");
const result = ref(null);

const fullAddress = computed(() => {
  return `${geocoding_number.value} ${geocoding_address.value}, ${geocoding_postal_code.value} ${geocoding_town.value}`.trim();
});

let map;

// Événements émis
const emit = defineEmits(["geocodeResult"]);

// Initialisation du token Mapbox
const mapboxAccessToken =
  "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";
mapboxgl.accessToken = mapboxAccessToken;

const geocodeAndSubmit = async () => {
  try {
    const {
      latitude,
      longitude,
      streetAddress,
      postalCode,
      city,
      country,
      place,
    } = await geocodeAddress(fullAddress.value);
    result.value = { latitude, longitude, streetAddress, postalCode, city, country, place };
    console.log(result.value);
    emit("geocodeResult", result.value);

    // Met à jour la carte avec les nouvelles coordonnées
    updateMap([longitude, latitude]);
  } catch (error) {
    console.error("Erreur de géocodage d'adresse :", error.message);
  }
};

// Met à jour la carte Mapbox
const updateMap = (coordinates) => {
  if (map) {
    map.remove();
  }

  map = new mapboxgl.Map({
    container: "map", // ID de l'élément conteneur
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 15,
  });

  new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
};

// Initialisation de la carte
onMounted(() => {
  if (!mapboxAccessToken) {
    console.error("Le token Mapbox est manquant ou invalide !");
    return;
  }

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [2.3522, 48.8566], // Coordonnées par défaut (Paris)
    zoom: 12,
  });
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
