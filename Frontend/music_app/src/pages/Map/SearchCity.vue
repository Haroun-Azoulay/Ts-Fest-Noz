searchcity.vue : <template>
  <section class="">
    <div class="flex justify-center items-center">
      <div class="w-full max-w-lg flex justify-center items-center flex-col p-4 rounded-md shadow-lg bg-white">
        <h1 class="text-black mb-4 text-xl font-bold text-center">Ou souhaitez-vous faire votre recherche ?</h1>
        <form @submit.prevent="geocodeAndSubmit" class="w-full">
          <div class="mb-4">
            <label class="block text-black text-m font-medium leading-tight">Nom de la ville</label>
            <input class="text-center w-full p-2 border rounded shadow-md" @input="handleInput" v-model="geocoding_city" type="text" placeholder="Entrez une ville" required>
            <ul class="text-black" v-if="cities.length">
              <li 
                v-for="(city, index) in cities" 
                :key="index" 
                @click="selectCity(city)"
              >
                {{ city }}
              </li>
            </ul>
          </div>
          <div>
            <button type="submit" class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </div>
    <br>
    <div class="row">
      <div v-for="(city, index) in events" 
              :key="index">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title text-black">{{ city.name }}</h5>
            <p class="card-text text-black">{{ city.description }}</p>
            <a :href="`/${city.id}`" class="btn btn-primary">Détails</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { geocodeAddress, geocodeAddressByPlace } from '../../services/GeocodingService';
import mapboxgl from 'mapbox-gl';

const cities = ref<[]>([]);
const geocoding_city = ref('');
const events = ref<[]>([]);
const result = ref(null);

const emit = defineEmits(['geocodeResult']);

const selectCity = (city: string) => {
  geocoding_city.value = city;
  cities.value = [];
}

const handleInput = async () => {
  if (geocoding_city.value.length > 1) {
    cities.value = await fetchCities(geocoding_city.value);
  } else {
    cities.value = [];
  }
}

const geocodeAndSubmit = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await ApiService.get(`/get-event-city/${geocoding_city.value}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const { latitude, longitude, streetAddress, postalCode, city, country, place } = await geocodeAddressByPlace(`${geocoding_city.value}`);
    result.value = { latitude, longitude, streetAddress, postalCode, city, country, place };
    console.log(latitude);
    emit('geocodeResult', result.value);
    events.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des évènements par la ville :", error);
  }
};

const fetchCities = async (query: any) => {
  if (!query) return [];
  const url = `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom&format=json&geometry=centre`;
  try {
    const response = await axios.get(url);
    return response.data.map((city) => city.nom);
  } catch (error) {
    console.error("Erreur lors de la récupération des villes :", error);
  }
};

onMounted(() => {
  // mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  mapboxgl.accessToken = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";
});

</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>