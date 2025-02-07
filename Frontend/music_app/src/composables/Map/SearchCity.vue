<template>
  <ModalConfirm v-model="show" title="Erreur" @confirm="confirm">
    <p>{{ errorMessage }}</p>
  </ModalConfirm>
  <div class="flex justify-center items-center">
    <div
      style="height: 280px"
      class="w-full flex justify-center items-center flex-col p-4 rounded-md"
    >
      <h1 class="text-black text-xl font-bold text-center">
        Où souhaitez-vous faire votre recherche ?
      </h1>
      <form @submit.prevent="geocodeAndSubmit" class="w-full relative">
        <div class="relative">
          <label class="block text-black text-center m-2 text-m font-medium leading-tight">
            Nom de la ville
          </label>
          <input
            class="text-center w-full p-2 border rounded shadow-md"
            @input="handleInput"
            v-model="geocoding_city"
            type="text"
            placeholder="Entrez une ville"
            required
          />
          <ul
            v-if="cities.length"
            class="absolute w-full p-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-56 overflow-y-auto"
          >
            <li
              v-for="(city, index) in cities"
              :key="index"
              @click="selectCity(city)"
              class="p-2 w-full text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-300 active:bg-gray-400"
            >
              {{ city }}
            </li>
          </ul>
        </div>
        <div>
          <button
            type="submit"
            class="mt-3 font-semibold w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
  </div>
  <br />
  <div class="row">
    <div v-for="(city, index) in events" :key="index">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title text-black">{{ city.name }}</h5>
          <p class="card-text text-black">{{ city.description }}</p>
          <a :href="`/${city.id}`" class="btn btn-primary">Détails</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import axios from 'axios';
import ApiService from '@/services/ApiService';
import { geocodeAddressByPlace } from '../../services/GeocodingService';
import mapboxgl from 'mapbox-gl';
import ModalConfirm from '../../components/pModal/ModalConfirm.vue';

const cities = ref<string[]>([]);
const listTown = ref<string[]>([]);
const geocoding_city = ref('');
const events = ref<[]>([]);
const result = ref(null);
const errorMessage = ref('');
const show = ref(false);
const emit = defineEmits(['geocodeResult']);

const confirm = () => {
  show.value = false;
};

const selectCity = (city: string) => {
  geocoding_city.value = city;
  listTown.value = cities.value
  cities.value = [];
};

const handleInput = async () => {
  if (geocoding_city.value.length >= 2) {
    cities.value = await fetchCities(geocoding_city.value);
  } else {
    cities.value = [];
  }
};

const geocodeAndSubmit = async () => {
  try {
    if (!geocoding_city.value) {
      throw new Error('Veuillez entrer un nom de ville valide.');
    }

    await verifyTown(geocoding_city.value, listTown.value);

    const authToken = localStorage.getItem('authToken');
    const response = await ApiService.get(`/get-event-city/${geocoding_city.value}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const { latitude, longitude, streetAddress, postalCode, city, country, place } = await geocodeAddressByPlace(
      `${geocoding_city.value}`
    );
    result.value = { latitude, longitude, streetAddress, postalCode, city, country, place };

    emit('geocodeResult', result.value);
    events.value = response.data;
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || error.message;
    show.value = true;
    console.error(error);
  }
};

const fetchCities = async (query: string) => {
  if (!query) return [];
  const url = `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom`;
  try {
    const response = await axios.get(url);
    return Array.isArray(response.data) ? response.data.map((city) => city.nom) : [];
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

const verifyTown = (queryResponse: string, queryApi: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(queryResponse, queryApi);
    if (queryApi.some((city) => city === queryResponse)) {
      resolve()
    } else {
      reject(new Error('The town don´t exist'))
    }
  })
}

onMounted(() => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
