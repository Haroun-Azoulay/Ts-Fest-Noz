<template>
    <HeaderPage></HeaderPage>
    {{ events }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from "@/services/ApiService";
import HeaderPage from '../components/Header/HeaderPage.vue';

  
interface eve {
    id: number;
    longitude: number;
    latitude: number;
    text: string;
    address: string;
    color: string;
    region_name: string;
  }
  

const events = ref<eve[]>([]);

onMounted(async () => {

    
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
      const response = await ApiService.get("/event/get-all-event", config);
      events.value = response.data;
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });

  onMounted(async () => {

    
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
  const response = await ApiService.get("/event/get-event/${}", config);
  events.value = response.data;
} catch (error) {
  console.error("Erreur lors de la requête :", error);
}
});

</script>