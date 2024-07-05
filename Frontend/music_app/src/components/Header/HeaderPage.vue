<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <button @click="toggleMenu" type="button"
        class="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="w-full flex items-center justify-between">
        <div class="flex-1 flex justify-center">
          <a href="/" class="flex items-center">
            <img src="../../assets/logo.png" alt="Logo" class="h-20 w-25">
          </a>
        </div>
        <div :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}" class="w-full md:w-auto md:flex md:items-center md:ml-auto">
          <ul class="font-medium flex flex-col md:flex-row p-2 md:p-0 mt-4 md:mt-0 border border-gray-100 md:border-0 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li class="md:ml-2 relative group">
              <button @click="toggleDropdown" class="ButtonPrimary">Menu
                <svg class="w-4 h-4 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <transition name="dropdown" mode="out-in">
                <div v-show="isDropdownOpen" class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <template v-if="!isHomePage">
                    <a href="/" class="block px-4 py-2 m-1 text-gray-800 hover:bg-violet-600 hover:text-white rounded-md">Accueil</a>
                    <div class="border-t border-gray-200"></div>
                  </template>
                  <a @click.prevent="goToCityPage" class="block px-4 py-2 m-1 text-gray-800 hover:bg-violet-600 hover:text-white rounded-md cursor-pointer">Rechercher un evenement</a>
                  <div class="border-t border-gray-200"></div>
                  <a @click.prevent="goAddEventPage" class="block px-4 py-2 m-1 text-gray-800 hover:bg-violet-600 hover:text-white rounded-md cursor-pointer">Proposer un evenement</a>
                  <div class="border-t border-gray-200"></div>
                  <a @click.prevent="goForumPage" class="block px-4 py-2 m-1 text-gray-800 hover:bg-violet-600 hover:text-white rounded-md cursor-pointer">Forum</a>
                </div>
              </transition>
            </li>
            <li v-if="!isLoggedIn" class="md:ml-2">
              <button @click="goToSignupPage" class="ButtonPrimary">Inscription</button>
            </li>
            <li v-if="!isLoggedIn" class="md:ml-2">
              <button @click="goToSigninPage" class="ButtonPrimary">Connection</button>
            </li>
            <li v-if="isLoggedIn" class="md:ml-2 flex items-center space-x-2">
              <button @click="logout" class="ButtonPrimary" style="background-color: red;">Deconnexion</button>
              <div v-if="isAdmin">
                <button @click="goToAdminHomePage" class="ButtonPrimary" style="background-color: black;">Admin</button>
              </div>
              <button @click="goToEventsPage" class="ButtonPrimary">Annonces</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useJwt } from '@vueuse/integrations/useJwt';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
const isLoggedIn = ref(false);
const isAdmin = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = (event: Event) => {
  event.preventDefault();
  isDropdownOpen.value = !isDropdownOpen.value;
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

const goToCityPage = (event: Event) => {
  event.preventDefault();
  router.push({ path: '/city' });
  isDropdownOpen.value = false;
};

const goAddEventPage = (event: Event) => {
  event.preventDefault();
  router.push({ path: '/add' });
  isDropdownOpen.value = false;
};

const goForumPage = (event: Event) => {
  event.preventDefault();
  router.push({ path: '/forum' });
  isDropdownOpen.value = false;
};

const logout = () => {
  localStorage.removeItem('authToken');
  isLoggedIn.value = false;
  window.location.reload();
};

const isHomePage = computed(() => {
  return route.path === '/';
});

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('authToken') !== null;
});

onMounted(async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const { payload } = useJwt(authToken);
      const roleId = payload.value?.role;

      if (roleId === 'admin') {
        isAdmin.value = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
  }
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.ButtonPrimary {
  @apply w-full md:w-32 h-8 px-4 py-1.5 bg-violet-600 text-white rounded-lg flex justify-center items-center text-sm font-bold font-['Inter'] m-1;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.5s;
}
.dropdown-enter, .dropdown-leave-to {
  opacity: 0;
}
</style>
