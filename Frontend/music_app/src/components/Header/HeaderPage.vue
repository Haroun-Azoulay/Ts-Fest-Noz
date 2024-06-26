<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center justify-center">
        <img src="../../assets/logo.png" style="height: 200px">
      </a>
      <button @click="toggleMenu" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}" class="w-full md:block md:w-auto flex justify-center" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li v-if="!isLoggedIn">
            <button class="ButtonPrimary w-80 h-12 px-12 m-5 py-2.5 bg-violet-600 rounded-lg flex-col justify-center items-center gap-2.5 flex" @click="goToSignupPage">
              <div class="Frame590 px-2 justify-center items-center gap-2.5 inline-flex">
                <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                  S'inscrire
                </span>
              </div>
            </button>
          </li>
          <li v-if="!isLoggedIn">
            <button class="ButtonPrimary w-80 h-12 px-12 m-5 py-2.5 bg-violet-600 rounded-lg flex-col justify-center items-center gap-2.5 flex" @click="goToSigninPage">
              <div class="Frame590 px-2 justify-center items-center gap-2.5 inline-flex">
                <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                  Se connecter
                </span>
              </div>
            </button>
          </li>
          <li v-if="isLoggedIn">
            <button @click="logout" class="ButtonPrimary w-80 h-12 px-12 m-5 py-2.5 bg-red-600 rounded-lg flex-col justify-center items-center gap-2.5 flex text-white">
              Deconnexion
            </button>
            <div v-if="isAdmin">
              <button @click="goToAdminHomePage" class="ButtonPrimary w-80 h-12 px-12 m-5 py-2.5 bg-red-600 rounded-lg flex-col justify-center items-center gap-2.5 flex text-white">
                Admin Page
              </button>
            </div>
            <button class="ButtonPrimary w-80 h-12 px-12 m-5 py-2.5 bg-violet-600 rounded-lg flex-col justify-center items-center gap-2.5 flex" @click="goToEventsPage">
              <div class="Frame590 px-2 justify-center items-center gap-2.5 inline-flex">
                <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                  Annonces
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useJwt } from '@vueuse/integrations/useJwt';

const router = useRouter();
const isMenuOpen = ref(false);
const isLoggedIn = ref(false);
const isAdmin = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToSigninPage = () => {
  router.push({ path: '/signin' });
};

const goToSignupPage = () => {
  router.push({ path: '/signup' });
};

const goToAdminHomePage = () => {
  router.push({ path: '/admin' });
};

const goToEventsPage = () => {
  router.push({ path: '/event' });
};

const logout = () => {
  localStorage.removeItem('authToken');
  isLoggedIn.value = false;
  window.location.reload();
};

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('authToken') !== null;
});

onMounted(async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    console.log('Token d\'authentification ici :', authToken);

    const { payload } = useJwt(authToken);
    const roleId = payload.value.role;

    if (roleId === 'admin') {
      isAdmin.value = true;
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.ButtonPrimary {
  @apply w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-violet-600 rounded-lg flex justify-center items-center;
}

.ButtonSecondary {
  @apply text-center text-white text-base font-bold font-['Roboto'];
}
</style>
