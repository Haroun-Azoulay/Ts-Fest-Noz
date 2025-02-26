
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
    <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
      <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
      <p>{{ successMessage }}</p>
    </ModalConfirm>
    <section class="flex flex-col lg:flex-row justify-center items-center rounded-xl">
      <Wizard
  v-model="currentTabIndex"
  horizontal-tabs
  card-background
  navigable-tabs
  scrollable-tabs
  :buttonClass
  :nextButton="nextButtonOptions"
  :backButton="backButtonOptions"
  :custom-tabs="customTabs"
  :beforeChange="onTabBeforeChange"
  @change="onChangeCurrentTab"
  @complete:wizard="wizardCompleted"
  class="rounded-lg shadow-md w-full max-w-3xl"
>
<h5 v-if="currentTabIndex === 0">
  <SearchPage @geocodeResult="handleGeocodeResult"></SearchPage>
</h5>

<h5 class="flex justify-center items-center m-0 flex-col " v-if="currentTabIndex === 1">
        <div
          class="col-lg-6 w-full text-black lg:w-1/5 flex justify-center items-center flex-col"
          v-if="result" style="height: 600px;">
          <label class="text-black text-m font-medium leading-tight text-center">Adresse complète</label>
          <p class="text-m text-black mb-4 text-center">Nom de l'emplacement : {{ result.place }} {{ result.postalCode }}
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
      </div>
</h5>
<h5 class="flex justify-center items-center m-0 flex-col" v-if="currentTabIndex === 2">
        <div style="width:450px" class="items-center rounded-xl flex justify-center">
          <div id="map"></div>
        </div>
</h5>

</Wizard>

    </section>
 
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
import mapboxgl, { Map } from 'mapbox-gl';
import ApiService from "@/services/ApiService";
import HeaderPage from '../../composables/Header/HeaderPage.vue';
import SearchPage from '../../composables/Map/SearchPage.vue';
import ModalConfirm from '../../components/pModal/ModalConfirm.vue'
import FooterPage from '../../composables/Footer/FooterPage.vue';
import Wizard from 'form-wizard-vue3'
import { useRouter } from 'vue-router'
import 'form-wizard-vue3/dist/form-wizard-vue3.css';

const currentTabIndex = ref(0)
const result = ref(null);
const event_name = ref('');
const event_label = ref('');
const event_txt = ref('');
const selectedStyle = ref('');
let map: Map;
const neWPointMap = ref([])
const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);
const meetingTime = ref(''); 
const isUpdateMap = ref(false)
const router = useRouter()
const confirmError = () => {
  showError.value = false;
};


const customTabs = ref([
  { title: "Localisation", icon: "user" },
  { title: "Ajout de l´évenement", icon: "search" },
  { title: "Carte", icon: "map" },
]);


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


const nextButtonOptions = computed(() => {
  if (currentTabIndex.value === 1) { 
    return {
      addPoint,
      text: "Suivant ",
      icon: "arrow-right",
      hideIcon: false,
      hideText: false,
      disabled: false,
    };
  } else if (currentTabIndex.value === 2) {
  return {
      text: "Suivant",
      icon: "arrow-right",
      hideIcon: true,
      hideText: true,
      disabled: currentTabIndex.value === 2
    };
  } else {
    return {
      text: "Suivant",
      icon: "arrow-right",
      hideIcon: false,
      hideText: false,
      disabled: false,
    };
  }
});

const onChangeCurrentTab = (index, oldIndex) => {
  console.log(index, oldIndex);
  currentTabIndex.value = index;
};

const onTabBeforeChange = () => {
  if (currentTabIndex.value === 0) {
    console.log('0 Tab');
    console.log(currentTabIndex.value)
  }

  if (currentTabIndex.value === 1) {
    console.log('1 Tab');
    console.log(currentTabIndex.value)
  }

  if (currentTabIndex.value === 2) {
      createMapFunction();
  }
};

const wizardCompleted = () => {
  addPoint(),
  alert("The point is added !");
};

const backButtonOptions = computed(() => {
  return {
    text: "Retour",
    icon: "arrow-left",
    hideIcon: false,
    hideText: false,
    disabled: currentTabIndex.value === 0,
  };
});



const handleGeocodeResult = (geocodeResult) => {
  result.value = geocodeResult;
  neWPointMap.value= ([geocodeResult.longitude, geocodeResult.latitude]);
  const elem = document.getElementById("map");
  if (elem) {
    elem.style.height = "600px";
  }
};

const addPoint = async () => {
  try {
    if (!result.value) {
      throw new Error("No geocoding data available.");
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

    const response_event = await ApiService.post('/add-event', Event, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const eventId = response_event.data.id;
    const event_url = `http://localhost:5173/event/${eventId}`;
    Point.url_point = event_url;

    const response = await ApiService.post('/add-point', Point, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(meetingTime)
    console.log(response.data);
    successMessage.value = "The point has been successfully added.";
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

const createMapFunction = () => {

  setTimeout(() => {
    createMap(neWPointMap.value);
  }, 500); 
};



const createMap = (coordinates:any | null) => {
  if (coordinates != null) {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 15,
  }) 
}  else {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [2.3522, 48.8566], 
    zoom: 10,
  });
  }
};


onMounted(() => {
  currentTabIndex.value = 0;
  const token: string = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";

mapboxgl.accessToken = token;

});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
