<template>
  <div class="flex flex-col min-h-screen">
    <HeaderPage />

    <section class="flex flex-col md:flex-row justify-center items-center p-4 md:p-16 max-w-screen-lg mx-auto flex-grow">
      <div class="text-center md:text-left md:mr-8 flex-1 mb-8 md:mb-0">
        <h1
          class="font-inter text-2xl md:text-5xl font-extrabold leading-tight tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
          Les Meilleurs Evenements musicaux sont tout autour de vous !
        </h1>
        <h3 class="font-inter text-2xl md:text-3xl font-extrabold leading-tight tracking-normal mb-6">
          Proposez ou assistez aux meilleurs évenements proche de chez vous ou que vous soyez !
        </h3>
        <div class="flex flex-col md:flex-row justify-center md:justify-start">
          <button
            :class="['ButtonPrimary', isFullAuthorized ? 'bg-violet-600' : 'bg-gray-400']"
            :disabled="!isFullAuthorized"
            @click="goToCityPage">
            <span class="ButtonSecondary text-center text-white text-base font-bold font-['Inter']">
              Trouver un evenement
            </span>
          </button>
          <button
            :class="['ButtonPrimary', isAuthorized ? 'bg-violet-600' : 'bg-gray-400']"
            :disabled="!isAuthorized"
            @click="goAddEventPage">
            <span class="ButtonSecondary text-center text-white text-base font-bold font-['Inter']">
              Proposer un evenement
            </span>
          </button>
        </div>
      </div>
      <img src="../assets/home.png" class="w-full md:w-1/2 mt-6 md:mt-0 flex-1" alt="Home image">
    </section>

    <hr class="my-8 border-gray-200">
    <section class="max-w-screen-lg mx-auto p-4 md:p-16">
      <h2 class="text-center font-inter text-3xl md:text-4xl font-extrabold mb-12">Ce que nous offrons !</h2>
      <div class="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
        <div class="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-xs">
          <img src="../assets/appli (4).png" alt="Mobile Icon" class="mx-auto mb-4 w-12 h-12">
          <h3 class="font-inter text-xl font-bold mb-2">Une Application Mobile</h3>
          <p class="text-gray-600">Vous pourrez proposer ou chercher des événements depuis votre smartphone ! (ça arrive ! )</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-xs border-2 border-purple-400 transform scale-105">
          <img src="../assets/appli (3).png" alt="Web Icon" class="mx-auto mb-4 w-12 h-12">
          <h3 class="font-inter text-xl font-bold mb-2 text-purple-600">Un Site web</h3>
          <p class="text-gray-600">Un site web intuitif sur lequel vous pourrez faire tout aussi bien voire mieux que sur votre téléphone :)</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-xs">
          <img src="../assets/carte (1).png" alt="Map Icon" class="mx-auto mb-4 w-12 h-12">
          <h3 class="font-inter text-xl font-bold mb-2">Une carte intuitive</h3>
          <p class="text-gray-600">Une carte intuitive qui vous permettra de situer très simplement les événements autour de vous !</p>
        </div>
      </div>
    </section>

    <hr class="my-8 border-gray-200">
    <section class="max-w-screen-lg mx-auto p-4 md:p-16 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
      <div class="text-center md:text-left flex-1">
        <h2 class="font-inter text-2xl md:text-4xl font-extrabold mb-6">Laissez un message !</h2>
        <p class="text-gray-600 mb-6">
          Commentez, Partagez, Parlez tout simplement, exprimez vous sur les événements et faites des rencontres qui dureront peut-être toute la vie !
        </p>
        <button
        :class="['ButtonPrimary', isFullAuthorized ? 'bg-violet-600' : 'bg-gray-400']"
            :disabled="!isFullAuthorized"
          class="ButtonPrimary md:w-80 h-12 px-6 py-2.5 rounded-lg flex justify-center items-center mb-6"
          @click="goForumPage">
          <span class="ButtonSecondary text-center text-white text-base font-bold font-['Inter']">
            Accéder au forum
          </span>
        </button>
      </div>
      <div class="flex-1 mt-8 md:mt-0 md:ml-8">
        <img src="../assets/forum.png" alt="Message image" class="rounded-lg shadow-md">
      </div>
    </section>

    <hr class="my-8 border-gray-200">

    <section class="max-w-screen-lg mx-auto p-4 md:p-16">
      <div class="flex justify-evenly items-center">
        <img src="../assets/jazze.PNG" alt="Jazz Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/rock.PNG" alt="Rock Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/salsa.PNG" alt="Salsa Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/piano.PNG" alt="Classical Logo" class="w-32 h-32 object-contain mx-4 my-4">
        <img src="../assets/rap.PNG" alt="Rap Logo" class="w-32 h-32 object-contain mx-4 my-4">
      </div>
    </section>

    <hr class="my-8 border-gray-200">
    <section class="max-w-screen-lg mx-auto p-4 md:p-16 text-center">
      <h2 class="font-inter text-3xl md:text-4xl font-extrabold mb-4">Vous avez votre avis ?</h2>
      <h3 class="font-inter text-2xl md:text-3xl font-extrabold mb-8 text-purple-600">Partagez le !</h3>
      <div class="flex flex-col md:flex-row items-center justify-center mb-8">
        <div class="text-left flex-1 max-w-2xl mx-auto">
          <p class="italic text-gray-600">
            <span class="text-purple-600 text-2xl">“</span>
            J'ai récemment proposé un concert dans mon bar sur le site web 'Fest-Noz.com' et mon expérience a été incroyable ! La recherche était intuitive et fluide, ce qui m'a permis de proposer exactement ce que je voulais et en un rien de temps. Cette nuit-là il y'avait foule dans mon bar ! 'Charles Leclerc'
            <span class="text-purple-600 text-2xl">”</span>
          </p>
        </div>
      </div>
      <div class="flex justify-center items-center space-x-4">
        <div class="text-center">
          <img src="../assets/DALL·E 2024-07-02 23.34.18 - Generate a headshot image of a friendly and professional looking woman in her 40s with a clear background. The image should be square (e.g., 500x500 p.webp" alt="User 1" class="rounded-full w-24 h-24 mx-auto mb-2">
          <h4 class="font-inter text-lg font-bold">Marine Lecompte</h4>
          <p class="text-gray-600 text-sm">Chanteuse Country</p>
          <div class="flex justify-center mt-2">
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
          </div>
        </div>
        <div class="text-center">
          <img src="../assets/DALL·E 2024-07-02 23.34.15 - Generate a headshot image of a friendly and professional looking older man in his 60s with a clear background. The image should be square (e.g., 500x5.webp" alt="User 2" class="rounded-full w-24 h-24 mx-auto mb-2">
          <h4 class="font-inter text-lg font-bold">Charles Leclerc</h4>
          <p class="text-gray-600 text-sm">Patron de bar</p>
          <div class="flex justify-center mt-2">
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
          </div>
        </div>
        <div class="text-center">
          <img src="../assets/DALL·E 2024-07-02 23.34.12 - Generate a headshot image of a friendly and professional looking young woman in her 20s with a clear background. The image should be square (e.g., 500.webp" alt="User 3" class="rounded-full w-24 h-24 mx-auto mb-2">
          <h4 class="font-inter text-lg font-bold">Romeena De Silva</h4>
          <p class="text-gray-600 text-sm">Danseuse de Salsa</p>
          <div class="flex justify-center mt-2">
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
          </div>
        </div>
        <div class="text-center">
          <img src="../assets/DALL·E 2024-07-02 23.34.21 - Generate a headshot image of a friendly and professional looking man in his 30s with a clear background. The image should be square (e.g., 500x500 pix.webp" alt="User 4" class="rounded-full w-24 h-24 mx-auto mb-2">
          <h4 class="font-inter text-lg font-bold">Antoine Chevalier</h4>
          <p class="text-gray-600 text-sm">Fan de Rai</p>
          <div class="flex justify-center mt-2">
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
            <span class="text-yellow-500">&#9733;</span>
          </div>
        </div>
      </div>
    </section>

    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import HeaderPage from '../components/Header/HeaderPage.vue';
import FooterPage from '../components/Footer/FooterPage.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useJwt } from '@vueuse/integrations/useJwt';

const isAuthorized = ref(false);
const isFullAuthorized = ref(false);
const router = useRouter();

const goToCityPage = () => {
  router.push({ path: '/city' });
};

onMounted(async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const { payload } = useJwt(authToken);
      const roleId = payload.value?.role;

      if (roleId === 'admin' || roleId === 'artist' || roleId === 'organizer') {
        isAuthorized.value = true;
        isFullAuthorized.value = true;
      } else if (roleId === 'user') {
        isFullAuthorized.value = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
});

const goAddEventPage = () => {
  if (isFullAuthorized.value) {
    router.push({ path: '/add' });
  }
};

const goForumPage = () => {
  if (isFullAuthorized.value) {
    router.push({ path: '/forum' });
  }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.ButtonPrimary {
  @apply md:w-80 h-12 px-6 m-2 py-2.5 rounded-lg flex justify-center items-center;
}

.ButtonSecondary {
  @apply text-center text-white text-base font-bold font-['Inter'];
}

.ButtonPrimary:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
</style>
