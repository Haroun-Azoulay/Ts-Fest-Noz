<template>
  <HeaderPage/>
  <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
    <div class="center-y relative text-center">
        <div class="container">
            <div class="row">
                
                <div class="col-md-12 text-center">
                  <h1>Page de vérification</h1>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
  </section>
  <div :class="['min-h-screen flex flex-col', backgroundClass]">
    <div class="flex-grow flex flex-col items-center justify-center p-4">
      <p class="text-black text-xl font-semibold mb-4">Page de vérification</p>
      <button @click="deletetoken" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out mb-4">
        Supprimer le token
      </button>
      <p class="text-gray-700 text-black">{{ message }}</p>
    </div>
  </div>
  <FooterPage/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import HeaderPage from '../pages/Header/HeaderPage.vue';
import FooterPage from '../pages/Footer/FooterPage.vue';
import ApiService from '../services/ApiService';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const token = ref<string | null>(null);
const message = ref<string>("");

const checkToken = async () => {
  const authToken = localStorage.getItem("QRCODE");
  if (!authToken) {
    console.error("L'utilisateur n'est pas authentifié.");
    message.value = "L'utilisateur n'est pas authentifié.";
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5174",
    },
  };

  try {
    const response = await ApiService.post('event/get-event/token/', { token: authToken }, config);
    console.log("Réponse de la vérification du token :", response.data);
    message.value = "Token valide.";
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    message.value = "Erreur lors de la vérification du token.";
  }
};

const deletetoken = async () => {
  const authToken = localStorage.getItem("QRCODE");
  if (!authToken) {
    console.error("L'utilisateur n'est pas authentifié.");
    message.value = "L'utilisateur n'est pas authentifié.";
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5174",
    },
  };

  try {
    const response = await ApiService.delete(`/event/delete-token/${authToken}`, config);
    console.log("Réponse de la suppression du token :", response.data);
    message.value = "Token supprimé avec succès.";
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    message.value = "Erreur lors de la suppression du token.";
  }
};

onMounted(() => {
  const authToken = localStorage.getItem("QRCODE");
  if (authToken) {
    token.value = authToken;
    checkToken();
  }
});

const backgroundClass = computed(() => {
  if (message.value.includes("succès") || message.value.includes("Token valide")) {
    return 'bg-green-500';
  } else if (message.value.includes("Erreur") || message.value.includes("n'est pas authentifié")) {
    return 'bg-red-500';
  } else {
    return 'bg-gray-100';
  }
});
</script>
