<template>
  <div class="container">
    <HeaderPage />
    <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
      <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
      <p>{{ successMessage }}</p>
    </ModalConfirm>
    <fieldset>
      <legend>Paramètres d'événements</legend>
      <div>
        <input type="radio" id="huey" name="drone" value="huey" @change="handleChangeAllPoints" checked />
        <label for="huey"> Tous les points </label>
        <input
          v-if="isAuthorized"
          type="radio"
          id="dewey"
          name="drone"
          value="dewey"
          @change="handleChangeMyPoints"
        />
        <label v-if="isAuthorized" for="dewey"> Mes points</label>
      </div>
      <div>
        <label for="startDate">Date de début :</label>
        <input type="date" id="startDate" v-model="startDate" />
        <label for="endDate">Date de fin :</label>
        <input type="date" id="endDate" v-model="endDate" />
        <button @click="filterPointsByDate">Filtrer</button>
      </div>
    </fieldset>
    <section id="map" style="position: absolute; width: 100%; height: 100%"></section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import mapboxgl, { Map } from 'mapbox-gl';
import { useJwt } from '@vueuse/integrations/useJwt';
import ApiService from "@/services/ApiService";
import { format } from 'date-fns';
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
  url_point: string;
  date: string;
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
let userRole: string | null = null;

const startDate = ref<string>('');
const endDate = ref<string>('');
const isAuthorized = ref<boolean>(false);

const filterPointsByDate = () => {
  const filteredPoints = points.value.filter(point => {
    const pointDate = new Date(point.date);
    const start = startDate.value ? new Date(startDate.value) : new Date('1900-01-01');
    const end = endDate.value ? new Date(endDate.value) : new Date('2100-12-31');
    return pointDate >= start && pointDate <= end;
  });
  points.value = filteredPoints;
  addMarkers();
};

const createMap = () => {
  const token: string = import.meta.env.VITE_MAPBOX_TOKEN;
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

      const popupContent = `
        <section style="font-family: Arial, sans-serif; padding: 10px;">
          <h1 style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${point.text}</h1>
          <p style="margin: 5px 0;">Adresse: ${point.address}</p>
          <p style="margin: 5px 0;">Région: ${point.region_name}</p>
          <p style="margin: 5px 0;">Date: ${formatedDate}</p>
          <a href="${point.url_point}" style="display: inline-block; margin: 10px 0; color: #9333ea; text-decoration: none;">Cliquer ici</a>
          <button onclick="window.deletePoint(${point.id})" style="padding: 5px 10px; border: none; border-radius: 4px; background-color: #9333ea; color: white; cursor: pointer; transition: background-color 0.3s ease;">Supprimer</button>
        </section>
      `;

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
    const response = await ApiService.get(`/city/get-point/${userId}`, config);
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
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

legend {
  font-weight: bold;
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

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #9333ea;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #9333ea;
}
</style>