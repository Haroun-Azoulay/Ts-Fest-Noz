<template>
  <div id="wrapper">
    <HeaderPage />
    <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
      <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
      <p>{{ successMessage }}</p>
    </ModalConfirm>
    <section id="subheader" class="text-light h-50" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  <div class="col-md-12 text-center">
                    <h1>Plan</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
          </div>
      </div>
    </section>
    <section class="bg-white flex flex-row gap-4 justify-center items-center pt-0 pb-0">
    <fieldset  style="border: none;" class="bg-white">
      <h1 class="text-black mt-4 text-xl text-center">Paramètres d'événements</h1>
        <input type="radio" id="huey" name="drone" value="huey" @change="handleChangeAllPoints" checked />
        <label class="text-black font-semibold m-2 mt-4" for="huey"> Tous les points</label>
        <input
          v-if="isAuthorized"
          type="radio"
          id="dewey"
          name="drone"
          value="dewey"
          @change="handleChangeMyPoints"
        />
        <label class="text-black font-semibold p-2" v-if="isAuthorized" for="dewey"> Mes points</label>
        <label class="text-black font-semibold p-2" for="startDate">Date de début :</label>
        <input class="text-white font-semibold hover:bg-violet-400 rounded-xl p-2 bg-violet-600" type="date" id="startDate" lang="fr-CA" v-model="startDate" />
        <label class="text-black font-semibold p-2" for="endDate">Date de fin :</label>
        <input class="text-white font-semibold hover:bg-violet-400 rounded-xl p-2 bg-violet-600" type="date" id="endDate" lang="fr-CA" vv-model="endDate" />
        <br>
        <label class="text-black font-semibold p-2" for="dewey">Type de musique :</label>
        <select class="w-30 h-12 p-2 rounded-lg border-black border-1" style="margin-bottom: 0;" v-model="selectedStyle" name="style" id="music-style-select">
          <option selected value="">Type de musique</option>
          <option value="jazz">Jazz</option>
          <option value="rap-rnb">Rap - R'N'B</option>
          <option value="classique">Classique</option>
          <option value="reggae">Reggae</option>
          <option value="pop-rock">Pop - Rock</option>
          <option value="country">Country</option>
          <option value="autre">Autres</option>
        </select>
        <button class="w-full font-semibold bg-violet-600 text-white mt-[42px] p-2 rounded shadow-md hover:bg-violet-400" @click="filterPointsByDate">Filtrer</button>
    </fieldset>
    <div class= "vertical"></div>
    <SearchCityPage @geocodeResult="handleGeocodeResult"></SearchCityPage>
    </section>
    <section class="map_box_container_city">
      <div class="rounded-xl" id="map">
      </div>
    </section>
  </div>
  <FooterPage/>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { useJwt } from '@vueuse/integrations/useJwt';
import ApiService from "@/services/ApiService";
import { format } from 'date-fns';
import HeaderPage from '../../composables/Header/HeaderPage.vue';
import FooterPage from '../../composables/Footer/FooterPage.vue';
import ModalConfirm from '../../components/pModal/ModalConfirm.vue';
import SearchCityPage from '../../composables/Map/SearchCity.vue';

interface Maps {
  id: number;
  user_id: string;
  longitude: number;
  latitude: number;
  text: string;
  address: string;
  color: string;
  region_name: string;
  url_point: string;
  date: string;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);
const selectedStyle = ref('');

const confirmError = () => {
  showError.value = false;
};

const confirmSuccess = () => {
  showSuccess.value = false;
  window.location.reload();
};

let map: Map;
let userId: string | null = null;
let userRole: string | null = null;
const startDate = ref<string>('');
const endDate = ref<string>('');
const isAuthorized = ref<boolean>(false);
const filteredPoints = ref<Maps[]>([]);
const result = ref(null);
const points = ref<Maps[]>([]);
const center = ref<Coordinates>({ longitude: 2.3522, latitude: 48.8566 });
const zoom = ref<number>(10.5);
const markers = ref<mapboxgl.Marker[]>([]);
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
    .setLngLat(coordinates);

  addMarkers();
};

const handleGeocodeResult = (geocodeResult) => {
  result.value = geocodeResult;
  updateMap([geocodeResult.longitude, geocodeResult.latitude]);
};

const filterPointsByDate = () => {
  points.value = filteredPoints.value.filter(point => {
    let matchStyle = styleColor.value === point.color;
    if (styleColor.value === '#000000') {
      matchStyle = true;
    }
    console.log(styleColor.value + " " + point.color + " " + matchStyle);
    const pointDate = new Date(point.date);
    const start = startDate.value ? new Date(startDate.value) : new Date('1900-01-01');
    const end = endDate.value ? new Date(endDate.value) : new Date('2100-12-31');
    return matchStyle && pointDate >= start && pointDate <= end;
  });
  addMarkers();
};

const createMap = () => {
  const token: string = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";
  console.log(token);
  mapboxgl.accessToken = token;
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [center.value.longitude, center.value.latitude],
    zoom: zoom.value,
  });
};

const clearMarkers = () => {
  markers.value.forEach(marker => marker.remove());
  markers.value = [];
};

const addMarkers = () => {
  if (map) {
    clearMarkers();
    points.value.forEach((point) => {
      const marker = new mapboxgl.Marker({ color: point.color })
        .setLngLat([point.longitude, point.latitude])
        .addTo(map);
      const formatedDate = format(new Date(point.date), "dd/MM/yyyy HH:mm");

      let popupContent = `
        <section style="font-family: Arial, sans-serif; padding: 10px;">
          <h1 style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${point.text}</h1>
          <p style="margin: 5px 0;">Adresse: ${point.address}</p>
          <p style="margin: 5px 0;">Région: ${point.region_name}</p>
          <p style="margin: 5px 0;">Date: ${formatedDate}</p>
          <a href="${point.url_point}" style="display: inline-block; margin: 12px 12px; color: #fffff; text-decoration: none;">Cliquer ici</a>
      `;
      console.log("=============" + point.user_id + "===========" + userId);
      if (point.user_id === userId || userRole === "admin") {
        popupContent += `<button onclick="window.deletePoint('${point.id}', '${point.url_point}')" style="padding: 5px 10px; border: none; border-radius: 4px; background-color: #9333ea; color: white; cursor: pointer; transition: background-color 0.3s ease;">Supprimer</button>
        </section>`;
      } else {
        popupContent += `</section>`;
      }

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);

      marker.setPopup(popup);
      markers.value.push(marker);
      console.log(point);
    });
  }
};


const handleChangeAllPoints = async () => {
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
    const response = await ApiService.get("/get-all-points", config);
    points.value = response.data;
    filteredPoints.value = response.data;
    addMarkers();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

window.deletePoint = async (pointId: string, pointUrl: string) => {
  try {
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
    const eventId = pointUrl.split("/event/")[1];
    await ApiService.delete(`/delete-point/${pointId}`, config);
    await ApiService.delete(`/delete-event/${eventId}`, config);
    successMessage.value = "Le point a bien été supprimé";
    showSuccess.value = true;
    handleChangeAllPoints(); 
  } catch (error: any) {
    console.error(error);
    errorMessage.value = "Erreur lors de la suppression du point";
    showError.value = true;
  }
};

onMounted(() => {
  createMap();

  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    const { payload } = useJwt(authToken);
    userId = payload.value.userId;
    userRole = payload.value.role; 

    if (["admin", "artist", "organizer"].includes(userRole)) {
      isAuthorized.value = true;
    }

    handleChangeAllPoints();
  }
});

const handleChangeMyPoints = async () => {
  if (!userId) {
    console.error("L'utilisateur n'est pas authentifié.");
    return;
  }

  if (!["admin", "artist", "organizer"].includes(userRole)) {
    console.error("L'utilisateur n'a pas les permissions nécessaires.");
    return;
  }

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
    const response = await ApiService.get(`/get-point-user/${userId}`, config);
    points.value = response.data;
    addMarkers();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};
</script>


<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

fieldset {
  border: 1px solid #ccc;
  padding: 10px;
  padding-bottom: 20px;
  background-color: #f9f9f9;
}

legend {
  font-weight: bold;
}

.vertical {
            border-left: 1px solid black;
            height: 230px;
        }

.radio-group {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
}

.radio-group input {
  margin-right: 5px;
}

.date-filter {
  display: flex;
  gap: 10px;
  align-items: center;
}

.date-filter label {
  margin-right: 5px;
}

.date-filter input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
