<template>
  <section class="flex justify-center items-center mt-4 bg-gray-100">
    <div class="border-2 w-full max-w-lg flex justify-center items-center flex-col p-4 bg-violet-600 rounded-md">
      <h1 class="text-white mb-4 text-xl font-bold text-center">Geolocalisation de l'événement</h1>
      <form @submit.prevent="geocodeAndSubmit" class="w-full">
        <div class="mb-4">
          <label class="block text-white text-m font-medium leading-tight">Numéro de rue</label>
          <input class="text-center w-full p-2 border rounded" v-model="geocoding_number" type="text" placeholder="Entrez le numéro" required>
        </div>
        <div class="mb-4">
          <label class="block text-white text-m font-medium leading-tight">Le nom de la rue</label>
          <input class="text-center w-full p-2 border rounded" v-model="geocoding_address" type="text" placeholder="Entrez la rue" required>
        </div>
        <div class="mb-4">
          <label class="block text-white text-m font-medium leading-tight">Code postal</label>
          <input class="text-center w-full p-2 border rounded" v-model="geocoding_postal_code" type="text" placeholder="Entrez le code postal" required>
        </div>
        <div class="mb-4">
          <label class="block text-white text-m font-medium leading-tight">Entrer la ville</label>
          <input class="text-center w-full p-2 border rounded" v-model="geocoding_town" type="text" placeholder="Entrez la ville" required>
        </div>
        <div>
          <button type="submit" class="w-full bg-white text-violet-600 p-2 rounded hover:text-white hover:bg-violet-300 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
            Rechercher
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import { geocodeAddress } from '../../services/GeocodingService';
import mapboxgl from 'mapbox-gl';


const geocoding_number = ref('');
const geocoding_address = ref('');
const geocoding_postal_code = ref('');
const geocoding_town = ref('');
const event_name = ref('');
const event_txt = ref('');
const result = ref(null);
const selectedStyle = ref('');


const fullAddress = computed(() => {
  return `${geocoding_number.value} ${geocoding_address.value}, ${geocoding_postal_code.value} ${geocoding_town.value}`.trim();
});
let map;

const emit = defineEmits(['geocodeResult']);

const geocodeAndSubmit = async () => {
  try {
    const { latitude, longitude, streetAddress, postalCode, city, country, place } = await geocodeAddress(fullAddress.value);
    // Mettez à jour le résultat avec les données de géocodage
    result.value = { latitude, longitude, streetAddress, postalCode, city, country, place };
    console.log(result.value);
    emit('geocodeResult', result.value);

    // Mettez à jour la carte avec le nouveau marqueur
    updateMap([longitude, latitude]);
  } catch (error) {
    console.error('Erreur de géocodage d\'adresse :', error.message);
    // Gérez l'erreur, par exemple, affichez un message à l'utilisateur
  }
};


const updateMap = (coordinates) => {
  // Supprimez la carte existante s'il y en a une
  if (map) {
    map.remove();
  }

  // Créez une nouvelle carte avec le marqueur mis à jour
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 15,
  });

  // Ajoutez le marqueur à la carte
  new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
};


onMounted(() => {
  // Initialisez la carte lors du montage du composant
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNscGFleXpqYzA1eHgycW5rdGdma2JoOGwifQ.3I3YPCqSxPKBgvwyksQRwg';
});



</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>