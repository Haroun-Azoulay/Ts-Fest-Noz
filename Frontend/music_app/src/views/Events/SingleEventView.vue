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
              <input type="text" class="form-control" style="width:20em;" v-model="billing.lastname" id="inputBillingAddressLastname" placeholder="">
              <span class="text-gray-500 font-semibold">Prénom :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.firstname" id="inputBillingAddressFirstname" placeholder="">
              <span class="text-gray-500 font-semibold">Adresse :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.address" id="inputBillingAddressLocation" placeholder="">
              <span class="text-gray-500 font-semibold">Code postal :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.postalCode" id="inputBillingAddressPostalCode" placeholder="">
              <span class="text-gray-500 font-semibold">Ville :</span>
              <input type="text" class="form-control" style="width:20em;" v-model="billing.city" id="inputBillingAddressCity" placeholder="">
              <br>
              <h2 class="text-2xl font-bold text-black">Méthode de paiement</h2>
              <select class="form-control" id="eventPaymentMethods" style="width:20em;">
                <option value="">Choisissez votre méthode paiement</option>
                <option value="CC">Carte de crédit</option>
              </select>
              <div id="eventPaymentFormContent" style="display:none;" class="col-sm-10">
                <span class="text-gray-500 font-semibold">Numéro de carte :</span>
                <input type="number" class="form-control" style="width:20em;" id="inputCardNumber" placeholder="">
                <span class="text-gray-500 font-semibold">Code de sécurité :</span>
                <input type="number" class="form-control" style="width:20em;" id="inputCardSecurityCode" placeholder="">
                <span class="text-gray-500 font-semibold">Nom et Prénom :</span>
                <input type="text" class="form-control" style="width:20em;" id="inputCardName" placeholder="">
                <span class="text-gray-500 font-semibold">Date d'expiration :</span>
                <div style="display:flex;justify-content: row;">
                  <select class="h-12 p-2" style="border-radius:7px;border-color: gray;border-width:1px;width:5em;" name="inputCardExpirationDay" id="inputCardExpirationDay">
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <select class="h-12 p-2" style="border-radius:7px;border-color: gray;border-width:1px;width:5em;" name="inputCardExpirationYear" id="inputCardExpirationYear">
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                  </select>
                </div>
                <!-- <img style="width:1em;height:1em;" src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"> -->
                <span id="invalidCardMessage" style="color:red;display:none;">
                  <i class="fa fa-exclamation fa-lg"></i>
                  Carte invalide
                </span>
                <span id="validCardMessage" style="color:green;display:none;" >
                  <i class="fa fa-check fa-lg"></i>
                  Carte valide
                </span>
                <br>
              </div>
              <button disabled id="submitEventPaymentForm" @click="goToPaymentPage" class="font-bold mt-6 bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-600 focus:ring-opacity-50">
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
const inputBillingAddressLastname = ref('');
const inputBillingAddressFirstname = ref('');
const inputBillingAddressLocation = ref('');
const inputBillingAddressPostalCode = ref('');
const inputBillingAddressCity = ref('');

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

const billing = ref<Billing>({
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

const generateInvoicePDF = async (config) => {
  const response_my_billing = await ApiService.get(`/get-my-billing`, config);
  const my_billing = response_my_billing.data.billings[response_my_billing.data.billings.length - 1];
  const doc = new jsPDF();
  doc.addImage("/src/assets/images/logo.png", "PNG", 80, 10, 50, 30);
  doc.setFontSize(20);
  doc.text("FACTURE", 105, 45, { align: "center" });
  doc.setFontSize(12);
  doc.text("ID : " + my_billing.id, 105, 53, { align: "center" });
  doc.text(`Date : ${new Date().toLocaleDateString()}`, 105, 61, { align: "center" });
  doc.text("Client :", 15, 70);
  doc.text(my_billing.lastname + " " + my_billing.firstname, 15, 78);
  doc.text(my_billing.address, 15, 85);
  doc.text(my_billing.postalCode + " " + my_billing.city, 15, 92);
  const produits = [
    [my_billing.Event.name, "1", my_billing.price, my_billing.price],
  ];
  doc.autoTable({
    startY: 100,
    head: [["Nom", "Quantité", "Prix Unitaire", "Total"]],
    body: produits,
  });
  doc.setFontSize(14);
  doc.text(`Total : ${my_billing.price} €`, 140, doc.lastAutoTable.finalY + 10); // Position après le tableau
  doc.setFontSize(12);
  doc.text("Merci pour votre achat !", 15, doc.lastAutoTable.finalY + 20);
  doc.save("festnoz-facture.pdf");
};

const goToPaymentPage = async (e: Event) => {
  e.preventDefault();
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
    console.log(billing.value);
    billing.value.eventId = eventId;
    console.log(event.value);
    billing.value.price = event.value.price;
    const response_billing = await ApiService.post(`/create-billing`, billing.value, config);
    await generateInvoicePDF(config);
    const response_payment = await ApiService.post(`/get-event/${event.value?.id}/payment`, QRCODE, config);
    const token = response_payment.data.token;
    localStorage.setItem('QRCODE', token);
    console.log("ca marche");
    provide('eventId', eventId);
    router.push({ path: `/event/${eventId}/${userId}` });
    // const externalUrl = 'http://0.0.0.0:5000/login';
    // window.location.href = externalUrl;
    // router.push({ path: `/event/token/3AGZEYG&1386SFAFTFDA` });
  } catch (error: any) {
    console.error("Erreur lors de la requête de paiement :", error.response?.data || error.message);
  }
};
</script>
