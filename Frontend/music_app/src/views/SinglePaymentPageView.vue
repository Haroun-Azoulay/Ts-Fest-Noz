<template>
  <div>
    <HeaderPage></HeaderPage>
    <section class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 class="text-3xl font-bold mb-4">Détails de l'événement</h1>
      <p class="text-xl mb-6">Veuillez scanner le QR code ci-dessous pour plus de détails.</p>
      <div class="flex justify-center mb-6">
        <qrcode-vue :value="qrValue" :level="level" :render-as="renderAs" class="w-64 h-64" />
      </div>
      <div class="text-center">
        <button @click="goToIdentificationPage" class="bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
          Essayer sans QR code
        </button>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import HeaderPage from '../components/Header/HeaderPage.vue';
import { useRouter } from 'vue-router';
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue';

const router = useRouter();

const token = ref<string | null>(null);
const level = ref<Level>('M');
const renderAs = ref<RenderAs>('svg');

onMounted(() => {
  const authToken = localStorage.getItem("QRCODE");
  if (authToken) {
    token.value = authToken;
  }
});

const qrValue = computed(() => {
  const baseUrl = "http://localhost:5000/login";
  if (token.value) {
    return `${baseUrl}?token=${token.value}`;
  }
  return baseUrl;
});

const goToIdentificationPage = () => {
  const externalUrl = 'http://localhost:5000/login';
  window.location.href = externalUrl;
  // router.push({ path: `/event/token/3AGZEYG&1386SFAFTFDA` });
};
</script>
