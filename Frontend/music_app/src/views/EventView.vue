<template>
  <div>
    <HeaderPage></HeaderPage>
    <section class="max-w-4xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Événements</h1>
      <ul class="space-y-4">
        <li v-for="event in events" :key="event.id" class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold">{{ event.name }}</h2>
          <p class="text-gray-500 text-sm">Date: {{ event.createdAt }}</p>
          <button @click="testEvent(event.id)" class="mt-4 bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
            Voir Détails
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from "@/services/ApiService";
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRouter } from "vue-router";

const router = useRouter();

interface Eve {
    id: number;
    longitude: number;
    latitude: number;
    text: string;
    address: string;
    color: string;
    region_name: string;
}
const testEvent = (eventId: number) => {
  if (eventId) {
    router.push(`event/${eventId}`);
  } else {
    console.error("L'ID de l'événement est manquant.");
  }
};

const events = ref<Eve[]>([]);

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
    const response = await ApiService.get("/event/get-all-events", config);
    events.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
</script>
