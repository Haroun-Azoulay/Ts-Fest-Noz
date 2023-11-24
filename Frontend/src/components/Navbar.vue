<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fest-Noz</span>
      </a>
      <button data-collapse-toggle="navbar-dropdown" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a href="#"
            @click="goToHome"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
              aria-current="page">Accueil</a>
          </li>
          <div v-if="isAdmin">
            <li>
            <a href="#"
            @click="goToAdmin"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin Dashboard</a>
          </li>
      </div>
          <li>
            <a href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Informations</a>
          </li>
          <li>
            <button @click="toggleAnnoucement" id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
              class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Annonces
              <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg></button>
            <div v-if="isToggleAnnoucementOpen"
              class="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a 
                  @click="goToAnnoucement"
                  href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Annonces</a>
                </li>
              </ul>
              <div class="py-1">
                <a href="#"
                  @click="goToPostAnnoucement"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Poster une annonce</a>
              </div>
            </div>
          </li>
          <li>
            <a href="#"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Rechercher</a>
          </li>
          <li>
            <button @click="toggleConnexion" id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
              class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Connexion
              <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg></button>
            <div v-if="isToggleConnexionOpen"
              class="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                <li>
                  <a 
                  @click="goToConnexion"
                  href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Connexion</a>
                </li>
              </ul>
              <div class="py-1">
                <a href="#"
                  @click="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Deconnexion</a>
              </div>
            </div>
          </li>
          <div v-if="isConnect">
          <li>
            Bienvenue, {{ myUser.pseudo }}
          </li>
        </div>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView></RouterView>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// @ts-ignore
import ApiService from "@/services/ApiService";
const isAdmin = ref<boolean>(false);
const router = useRouter();

const isToggleConnexionOpen = ref<boolean>(false);
const isToggleAnnoucementOpen = ref<boolean>(false);
const isConnect = ref<boolean>(false);


interface User {
  pseudo: string;
}

const myUser = ref<User>({ pseudo: '' });

const toggleConnexion = () => {
  console.log(isToggleConnexionOpen.value)
  isToggleConnexionOpen.value = !isToggleConnexionOpen.value;
};

const toggleAnnoucement = () => {
  isToggleAnnoucementOpen.value = !isToggleAnnoucementOpen.value;
}

onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    console.log("Token d'authentification :", authToken);
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Origin: "http://localhost:5173",
      },
    };

    const response = await ApiService.get("/admin/all-users", config);
    isAdmin.value = response.data.some((user: any) => user.role === 'admin');
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});

onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    console.log("Token d'authentification :", authToken);
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Origin: "http://localhost:5173",
      },
    };

    const response = await ApiService.get("/users/my-user", config);
    myUser.value = response.data
    isConnect.value = true;
    console.log(myUser.value)
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});


const logout = () => {
  // Supprimer le token en local (localStorage) lors de la déconnexion
  localStorage.removeItem("authToken");
  // Rediriger vers la page de connexion après la déconnexion
};
const goToConnexion = () => {
  router.push({ path: "/connexion" })
}

const goToPostArticleForum = () => {
  router.push({ path: "/forum/post-article" })
}

const goToHomeForum = () => {
  router.push({ path: "/forum/home" })
}

const goToHome = () => {
  router.push({ path: "/" })
};

const goToAllArticlesForum = () => {
  router.push({ path: "/forum/all-articles" })
}

const goToAnnoucement = () => {
  router.push({ path: "/announcement" })
}
const goToPostAnnoucement = () => {
  router.push({ path: "/post-annoucement" })
}
const goToAdmin = () => {
  router.push({ path: "/admin" })
}
</script>
  