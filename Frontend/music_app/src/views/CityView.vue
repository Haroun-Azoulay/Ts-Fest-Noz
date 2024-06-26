<template>
  <HeaderPage></HeaderPage>
  <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
    <p>{{ errorMessage }}</p>
  </ModalConfirm>
  <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
    <p>{{ successMessage }}</p>
  </ModalConfirm>
  <fieldset>
    <legend>Parametres d'evenements</legend>
    <div>
      <input type="radio" id="huey" name="drone" value="huey" @change="handleChangeAllPoints" checked />
      <label for="huey">Tous les points</label>
      <input type="radio" id="dewey" name="drone" value="dewey" @change="handleChangeMyPoints" />
      <label for="dewey">Mes points</label>
    </div>
  </fieldset>
  <div id="map" style="position: absolute; width: 100%; height: 100%"></div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';  
import { useJwt } from '@vueuse/integrations/useJwt';
import ApiService from "@/services/ApiService";
import HeaderPage from '../components/Header/HeaderPage.vue';
import ModalConfirm from '../components/pModal/ModalConfirm.vue';

const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);

const confirmError = () => {
  showError.value = false;
};

const confirmSuccess = () => {
  showSuccess.value = false;
  window.location.reload();
};

interface Maps {
  id: number;
  longitude: number;
  latitude: number;
  text: string;
  address: string;
  color: string;
  region_name: string;
  region_geo_json: string;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

const points = ref<Maps[]>([]);
const center = ref<Coordinates>({ longitude: 2.3522, latitude: 48.8566 });
const zoom = ref<number>(10.5);
const markers = ref<mapboxgl.Marker[]>([]);

let map: Map;
let userId: string | null = null;

const createMap = () => {
  const token: string = import.meta.env.VITE_MAPBOX_TOKEN;
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
        
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<section>
                    <h1>${point.text}</h1>
                    <p>${point.address}</p>
                    <p>${point.region_name}</p>
                    <p>${point.region_geo_json}</p>
                    <button onclick="window.deletePoint(${point.id})">Remove</button>
                  </section>`);
        
      marker.setPopup(popup);
      markers.value.push(marker);
      console.log(point)
      console.log("tttttttttttttttttttttttttt")
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
    const response = await ApiService.get("/city/get-all-points", config);
    points.value = response.data;
    addMarkers();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

window.deletePoint = async (pointId: number) => {
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

    await ApiService.delete(`/city/delete-point/${pointId}`, config);
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
    console.log(payload)
    userId = payload.value.userId;
    handleChangeAllPoints();
  }
});

const handleChangeMyPoints = async () => {
  if (!userId) {
    console.error("L'utilisateur n'est pas authentifié.");
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
    const response = await ApiService.get(`/city/get-point/${userId}`, config);
    points.value = response.data;
    addMarkers();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};
</script>
