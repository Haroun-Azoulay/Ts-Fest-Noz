<template>
  <div :class="['min-h-screen flex flex-col', backgroundClass]">
    <HeaderPage></HeaderPage>
    <div class="flex-grow flex flex-col items-center justify-center p-4">
      <p class="text-xl font-semibold mb-4">Page de vérification</p>
      <button @click="deletetoken" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out mb-4">
        Supprimer le token
      </button>
      <p class="text-gray-700">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import HeaderPage from '../pages/Header/HeaderPage-backup.vue';
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
      Origin: "http://localhost:5173",
    },
  };

  try {
    const response = await ApiService.post('event/get-event/token/', { token: authToken }, config);
    console.log("Réponse de la vérification du token :", response.data);
    message.value = "Token valide. Réponse : " + JSON.stringify(response.data);
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
      Origin: "http://localhost:5173",
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
