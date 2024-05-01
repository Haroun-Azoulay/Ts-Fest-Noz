<template>
  <div>
    <HeaderPage></HeaderPage>
    <section class="flex row justify-center content-center">
      <form @submit.prevent="geocodeAndSubmit">
        <!-- Vos champs de formulaire ici -->
        <input v-model="geocoding_number" type="text" placeholder="Entrez le numero" required>
        <input v-model="geocoding_address" type="text" placeholder="Entrez la rue" required>
        <input v-model="geocoding_postal_code" type="text" placeholder="Entrez le code postal" required>
        <input v-model="geocoding_town" type="text" placeholder="Entrez la ville" required>
        <button type="submit">Rechercher</button>
      </form>

      <div id="map" style="height: 400px; width: 100%;"></div>
      <!-- Afficher les résultats de géocodage -->
      <div v-if="result">
        <p>Latitude : {{ result.latitude }}</p>
        <p>Longitude : {{ result.longitude }}</p>
        <p>{{ fullAddress }}</p>
        <p>Nom de l'emplacement : {{ result.streetAddress }}</p>
        <p>Nom de l'emplacement : {{ result.postalCode }}</p>
        <p>Nom de l'emplacement : {{ result.city }}</p>
        <p>Nom de l'emplacement : {{ result.country }}</p>
        <input placeholder="Saisissez le nom de l'evenement" v-model="result.text" />
        <label for="pet-select">Style de musique</label>
        <select v-model="selectedStyle" name="style" id="music-style-select">
          <option value="">-Type de musique</option>
          <option value="jazz">Jazz</option>
          <option value="rap-rai">Rap - R'N'B</option>
          <option value="classique">Classique</option>
          <option value="reagge">Reagge</option>
          <option value="pop-rock">Pop - Rock</option>
          <option value="country">Country</option>
          <option value="autre">Autres</option>
        </select>
        <input v-model="event_name" type="text" placeholder="Entrez le nom de l'evement" required>
        <input v-model="event_txt" type="text" placeholder="Entrez la description" required>
        <button @click="addPoint">Ajouter un point et l'evenement</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import mapboxgl from 'mapbox-gl';
import ApiService from "@/services/ApiService";
import HeaderPage from '../components/Header/HeaderPage.vue';
import { geocodeAddress } from '@/services/GeocodingService';

const geocoding_number = ref('');
const geocoding_address = ref('');
const geocoding_postal_code = ref('');
const geocoding_town = ref('');
const event_name = ref('');
const event_txt = ref('');
const result = ref("");
const selectedStyle = ref('');

const fullAddress = computed(() => {
  return `${geocoding_number.value} ${geocoding_address.value}, ${geocoding_postal_code.value} ${geocoding_town.value}`.trim();
});
let map;


const styleColor = computed(() => {
  switch (selectedStyle.value) {
    case 'jazz':
      return '#00FF7F';
    case 'rap-rnb':
      return '#6A5ACD'; 
    case 'classique':
      return '#FFC0CB';
    case 'reggae':
      return '#D2691E'; 
    case 'pop-rock':
      return '#FFE4E1';
    case 'country':
      return '#B0C4DE';
    default:
      return '#000000';
  }
});

const geocodeAndSubmit = async () => {
  try {
    const { latitude, longitude, streetAddress, postalCode, city, country } = await geocodeAddress(fullAddress.value);
    // Mettez à jour le résultat avec les données de géocodage
    result.value = { latitude, longitude, streetAddress, postalCode, city, country };
    console.log(result.value);

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


const addPoint = async () => {
  try {
    // Utilisez les coordonnées actuelles pour ajouter un point
    const Point = {
      longitude: result.value.longitude,
      latitude: result.value.latitude,
      text: result.value.text,
      address: geocoding_address.value,
      insee_code: 77270,
      city_name: geocoding_town.value,
      zip_code: geocoding_postal_code.value,
      style: selectedStyle.value,
      label: "Tour Eiffel",
      color: styleColor.value,
      departement_name: "Paris",
      departement_number: result.value.postaleCode,
      region_name: fullAddress.value,
      region_geo_json: ""
    };

    const Event = {
      name: event_name.value,
      description: event_txt.value,
      url: "",
    };

    // Récupérez le token de manière asynchrone
    const authToken = await getAuthToken();

    const response_event = await ApiService.post('/event/add-event', Event, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const eventId = response_event.data.id;
    const event_url = `http://localhost:3000/event/get-event/${eventId}`;
    Point.region_geo_json = event_url;

    const response = await ApiService.post('/city/add-point', Point, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log('Point ajouté avec succès:', response.data);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du point :', error);
  }
};
const getAuthToken = async () => {
  // Récupérez le token de manière asynchrone, par exemple, depuis le local storage
  return localStorage.getItem('authToken');
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
