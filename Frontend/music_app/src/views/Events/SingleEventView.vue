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
  <div class="flex flex-col" style="background:#371990;padding-top:3%;">
    <main class="flex-grow">
      <section class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 class="text-3xl font-bold text-black">Détails</h2>
        <div v-if="event" class="space-y-4">
          <div class="flex items-center">
            <span class="text-gray-500 font-semibold">Nom:</span>
            <span class="ml-2 text-black font-semibold">{{ event.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 font-semibold">Description:</span>
            <span class="ml-2 text-black">{{ event.description }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 font-semibold">Prix :</span>
            <span class="ml-2 text-black">{{ event.price }}</span>
          </div>
          <hr>
          <div>
            <h2 class="text-3xl font-bold text-black">Paiement</h2>
            <form id="eventPaymentForm" action="">
              <h2 class="text-2xl font-bold text-black">Adresse de facturation</h2>
              <span class="text-gray-500 font-semibold">Nom :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.lastname">
              <span class="text-gray-500 font-semibold">Prénom :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.firstname">
              <span class="text-gray-500 font-semibold">Adresse :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.address">
              <span class="text-gray-500 font-semibold">Code postal :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.postalCode">
              <span class="text-gray-500 font-semibold">Ville :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.city">
              <br>
              <button id="submitEventPaymentForm" @click="goToPaymentPage" class="font-bold mt-6 bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-50">
                RÉSERVER
              </button>
              <br>
              <span class="text-gray-500" style="font-size:0.9em"><i class="fa fa-solid fa-lock"></i> Sur FestNoz, vos données confidentielles sont protégées et ne seront jamais partagées à des parties tierces.</span>
            </form>
          </div>
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
import HeaderPage from '../../composables/Header/HeaderPage.vue';
import { useRouter, useRoute } from 'vue-router';
import ApiService from "@/services/ApiService";
import { useJwt } from '@vueuse/integrations/useJwt';
import { provide } from 'vue'
import FooterPage from '../../composables/Footer/FooterPage.vue';
import { jsPDF } from "jspdf";
import { applyPlugin } from 'jspdf-autotable'

applyPlugin(jsPDF);
const router = useRouter();
const route = useRoute();

interface Eve {
  id: number;
  name: string;
  description: string;
  price: string;
}

const billing = ref({
  eventId: '',
  lastname: '',
  firstname: '',
  address: '',
  city: '',
  postalCode: '',
  price: ''
});

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
  }

  const eventId = route.params.id;
  if (eventId) {
    try {
      const response = await ApiService.get(`/get-event/${eventId}`);
      event.value = response.data;
      billing.value.price = event.value.price;
      billing.value.eventId = eventId;
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }
});
</script>
