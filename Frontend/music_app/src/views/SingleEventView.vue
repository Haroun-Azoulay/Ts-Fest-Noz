<template>
  <HeaderPage/>
  <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  
                  <div class="col-md-12 text-center">
                    <h1>Détails de l'évènement</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
        </div>
    </div>
  </section>
  <div class="flex flex-col" style="background:#371990;height:50vh;padding-top:3%;">
    <main class="flex-grow">
      <section class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 class="text-2xl font-bold text-black">Détails</h2>
        <div v-if="event" class="space-y-4">
          <div class="flex items-center">
            <span class="text-gray-500 font-semibold">Nom:</span>
            <span class="ml-2 text-black font-semibold">{{ event.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 font-semibold">Description:</span>
            <span class="ml-2 text-black">{{ event.description }}</span>
          </div>
          <button @click="goToPaymentPage" class="font-bold mt-6 bg-violet-600 text-white py-2 px-6 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
            RÉSERVER
          </button>
        </div>
        <div v-else class="text-center">
          <p class="text-gray-500">Chargement des détails de l'événement...</p>
        </div>
      </section>
    </main>
  </div>
  <FooterPage></FooterPage>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HeaderPage from '../composables/Header/HeaderPage.vue';
import { useRouter, useRoute } from 'vue-router';
import ApiService from "@/services/ApiService";
import { useJwt } from '@vueuse/integrations/useJwt';
import { provide } from 'vue'
import FooterPage from '../composables/Footer/FooterPage.vue';
const router = useRouter();
const route = useRoute();

interface Eve {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  text: string;
  address: string;
  color: string;
  region_name: string;
}

const QRCODE = {
  payment: true,
};

const event = ref<Eve | null>(null);
let userId: number | null = null;

onMounted(async () => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    const { payload } = useJwt(authToken);
    userId = payload.value.userId;
    console.log(payload);
  }

  const eventId = route.params.id;
  console.log(eventId);

  if (eventId) {
    try {
      const response = await ApiService.get(`/get-event/${eventId}`);
      event.value = response.data;
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }
});

const goToPaymentPage = async () => {
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
      },
    };

    const eventId = route.params.id;
    const response = await ApiService.post(`/get-event/${event.value?.id}/payment`, QRCODE, config);
    const token = response.data.token;
    localStorage.setItem('QRCODE', token);
    console.log("ca marche");
    provide('eventId', eventId);
    router.push({ path: `/event/${eventId}/${userId}` });
    // const externalUrl = 'http://localhost:5000/login';
    // window.location.href = externalUrl;
    // router.push({ path: `/event/token/3AGZEYG&1386SFAFTFDA` });
  } catch (error: any) {
    console.error("Erreur lors de la requête de paiement :", error.response?.data || error.message);
  }
};
</script>
