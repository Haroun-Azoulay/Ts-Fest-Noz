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
  <div style="background:#371990;padding-top:3%;">
    <section class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-black">Merci beaucoup de votre achat !</h2>
      <p class="text-xl mb-6 text-black">Vous retrouverez ci-dessous le QR Code à présenter à l'évènement.</p>
      <div class="flex justify-center mb-6">
        <a @click="goToIdentificationPage">
          <qrcode-vue :value="qrValue" :level="level" :render-as="renderAs" class="w-64 h-64" />
        </a>
      </div>
    </section>
  </div>
  <FooterPage/>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import HeaderPage from '../pages/Header/HeaderPage.vue';
import FooterPage from '../pages/Footer/FooterPage.vue';
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
};
</script>
