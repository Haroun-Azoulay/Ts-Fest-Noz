
<template>
  <div>
    <HeaderPage></HeaderPage>
    <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  <div class="col-md-12 text-center">
                    <h1>Proposer un évènement</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
          </div>
      </div>
    </section>
    <h2 class="" style="text-align:center;background:#371990;margin-bottom:0;">
        Entrez vos informations et situez<br/> <span class="id-color">votre événement sur la carte !</span>
    </h2>
    <SearchPage @geocodeResult="handleGeocodeResult"></SearchPage>
    <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
      <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
      <p>{{ successMessage }}</p>
    </ModalConfirm>
    <section class="flex flex-col lg:flex-row justify-center items-center">
      <!--<h2 style="text-align:center;position:absolute;z-index:1;">La carte s'affichera après que vous ayez cliqué sur Rechercher.</h2>-->
      <div id="add-event-map" class="row" style="height:0vh;">
        <div class="col-lg-6 map_box_container" style="height:100%;">
          <div id="map"></div>
        </div>
        <div
          class="col-lg-6 border-2 w-full lg:w-1/5 flex justify-center items-center flex-col bg-violet-600 rounded-md lg:mt-0 p-4"
          v-if="result" style="height: 100%;">
          <h1 class="text-white mb-4 text-xl font-bold text-center">Ajout de l'evenement</h1>
          <label class="text-white text-m font-medium leading-tight text-center">Adresse complète</label>
          <p class="text-m text-white mb-4 text-center">Nom de l'emplacement : {{ result.place }} {{ result.postalCode }}
            {{ result.city }} {{ result.country }}</p>
          <label class="text-white text-m font-medium leading-tight mb-1 text-center">Nom de l'evenement</label>
          <input class="w-full mb-4 p-2 rounded" placeholder="Saisissez le nom de l'événement" v-model="event_name" />
          <label class="text-white text-m font-medium leading-tight text-center">Choisissez une heure pour votre rendez-vous :</label>
          <input type="datetime-local" class="mb-4 w-full h-12 p-2 rounded" name="meeting-time" v-model="meetingTime"
            min="2024-07-07T00:00" max="2025-07-14T00:00" />
          <label for="music-style-select" class="mb-1 text-white text-m font-medium leading-tight text-center">Style de
            musique</label>
          <select class="mb-4 w-full h-12 p-2 rounded" v-model="selectedStyle" name="style" id="music-style-select">
            <option value="">Type de musique</option>
            <option value="jazz">Jazz</option>
            <option value="rap-rnb">Rap - R'N'B</option>
            <option value="classique">Classique</option>
            <option value="reggae">Reggae</option>
            <option value="pop-rock">Pop - Rock</option>
            <option value="country">Country</option>
            <option value="autre">Autres</option>
          </select>
          <label class="text-white text-m font-medium leading-tight mb-1 text-center">Numéro du groupe / de
            l'artiste</label>
          <input class="mb-4 w-full p-2 rounded" v-model="event_label" type="text"
            placeholder="Entrez le nom de l'événement" required>
          <label class="text-white text-m font-medium leading-tight mb-1 text-center">Description de l'événement</label>
          <textarea class="mb-1 w-full h-24 p-2 rounded" v-model="event_txt" type="text"
            placeholder="Entrez la description" required></textarea>
          <button @click="addPoint" type="submit"
            class="mt-1 bg-white text-violet-600 p-2 rounded hover:text-white hover:bg-violet-300 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
            Ajouter un point et l'événement
          </button>
        </div>
      </div>
    </section>
    <!--<section class="max-w-screen-lg mx-auto p-4 md:p-16">
      <div class="flex justify-evenly items-center">
        <img src="../assets/images/jazze.PNG" alt="Jazz Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/images/rock.PNG" alt="Rock Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/images/salsa.PNG" alt="Salsa Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/images/piano.PNG" alt="Classical Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/images/rap.PNG" alt="Rap Logo" class="w-32 h-32 object-contain mx-4 my-4">
      </div>
    </section>
    <hr class="my-8 border-gray-200">-->
    <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
      <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
      <p>{{ successMessage }}</p>
    </ModalConfirm>
  </div>
  <FooterPage></FooterPage>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import mapboxgl from 'mapbox-gl';
import ApiService from "@/services/ApiService";
import HeaderPage from '../pages/Header/HeaderPage.vue';
import SearchPage from '../pages/Map/SearchPage.vue';
import ModalConfirm from './pModal/ModalConfirm.vue';
import FooterPage from '../pages/Footer/FooterPage.vue';

const result = ref(null);
const event_name = ref('');
const event_label = ref('');
const event_txt = ref('');
const selectedStyle = ref('');
let map;
const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);
const meetingTime = ref(''); 

const confirmError = () => {
  showError.value = false;
};

const confirmSuccess = () => {
  showSuccess.value = false;
  const elem = document.getElementById('add-event-map');
  if (elem) {
    elem.style.height = '100%';
  }
};

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

const handleGeocodeResult = (geocodeResult) => {
  result.value = geocodeResult;
  updateMap([geocodeResult.longitude, geocodeResult.latitude]);
  const elem = document.getElementById("map");
  if (elem) {
    elem.style.height = "600px";
  }
};

const addPoint = async () => {
  try {
    if (!result.value) {
      throw new Error("Aucune donnée de géocodage disponible.");
    }

    const Point = {
      longitude: result.value.longitude,
      latitude: result.value.latitude,
      date: meetingTime.value,
      text: event_name.value,
      address: result.value.place,
      city_name: result.value.city,
      zip_code: result.value.postalCode,
      style: selectedStyle.value,
      label: event_label.value,
      color: styleColor.value,
      departement_number: result.value.postalCode,
      region_name: result.value.country,
      url_point: ""
    };

    const Event = {
      name: event_name.value,
      description: event_txt.value,
      url: "",
    };

    const authToken = await getAuthToken();

    const response_event = await ApiService.post('/event/add-event', Event, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const eventId = response_event.data.id;
    const event_url = `http://localhost:5173/event/${eventId}`;
    Point.url_point = event_url;

    const response = await ApiService.post('/city/add-point', Point, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(meetingTime)
    console.log(response.data);
    successMessage.value = "Le point a bien été ajouté";
    showSuccess.value = true;
    location.reload();
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error.response?.data?.message || error.message;
    showError.value = true;
  }
};

const getAuthToken = async () => {
  return localStorage.getItem('authToken');
};

const updateMap = (coordinates) => {
  if (map) {
    map.remove();
  }

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 15,
  });

  new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
};

onMounted(() => {
  const token: string = import.meta.env.VITE_MAPBOX_TOKEN;
  mapboxgl.accessToken = token;

});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
