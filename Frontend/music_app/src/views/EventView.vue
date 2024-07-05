<template>
  <div class="min-h-screen flex flex-col">
    <HeaderPage />
    <main class="flex-grow">
      <div class="container mx-auto p-4">
        <div class="flex flex-col md:flex-row md:justify-center md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div class="relative mb-4 md:mb-0">
            <label for="default-search" class="sr-only">Search</label>
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Recherchez par nom</label>
            <input v-model="searchQuery" type="search" id="default-search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-" placeholder="Recherche"/>
          </div>

          <div class="flex space-x-4">
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de début</label>
              <input type="date" id="startDate" v-model="startDate" class="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de fin</label>
              <input type="date" id="endDate" v-model="endDate" class="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
        </div>

        <section class="max-w-4xl mx-auto p-4">
          <h1 class="text-3xl font-bold mb-6">Liste des Événements</h1>
          <ul class="space-y-4">
            <li v-for="event in filteredEvents" :key="event.id" class="bg-white shadow-md rounded-lg p-6">
              <h2 class="text-xl font-semibold">{{ event.name }}</h2>
              <p class="text-gray-500 text-sm">Date: {{ formatEventDate(event.createdAt) }}</p>
              <button @click="gotoEventSinglePage(event.id)" class="mt-4 bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700">
                Voir Détails
              </button>
            </li>
          </ul>
        </section>
      </div>
    </main>
    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import ApiService from "@/services/ApiService";
import HeaderPage from '../components/Header/HeaderPage.vue';
import FooterPage from '../components/Footer/FooterPage.vue';

const router = useRouter();

interface Event {
  id: number;
  name: string;
  createdAt: string;
  longitude: number;
  latitude: number;
  text: string;
  address: string;
  color: string;
  region_name: string;
}

const searchQuery = ref('');
const startDate = ref<string | null>(null);
const endDate = ref<string | null>(null);

const events = ref<Event[]>([]);

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


const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearchQuery = event.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStartDate = startDate.value ? new Date(event.createdAt) >= new Date(startDate.value) : true;
    const matchesEndDate = endDate.value ? new Date(event.createdAt) <= new Date(endDate.value) : true;
    return matchesSearchQuery && matchesStartDate && matchesEndDate;
  });
});

const gotoEventSinglePage = (eventId: number) => {
  if (eventId) {
    router.push(`event/${eventId}`);
  } else {
    console.error("L'ID de l'événement est manquant.");
  }
};

const formatEventDate = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};
</script>
