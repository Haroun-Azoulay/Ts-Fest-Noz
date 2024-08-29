<template>
  <header class="transparent">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="de-flex sm-pt10">
                    <div class="de-flex-col">
                        <div class="de-flex-col">
                            <!-- logo begin -->
                            <div id="logo">
                                <a href="/">
                                    <img alt="" style="height:50px;" src="../../assets/images/logo.png" />
                                </a>
                            </div>
                            <!-- logo close -->
                        </div>
                        <div class="de-flex-col">
                        </div>
                    </div>
                    <div class="de-flex-col header-col-mid">
                        <!-- mainmenu begin -->
                        <ul id="mainmenu">
                            <li><a href="#de-carousel">Home</a>
                                <ul>
                                    <li><a href="index.html">Rockfest</a></li>
                                    <li><a href="02_djfest-index.html">DJFest</a></li>
                                    <li><a href="03_electrofest-index.html">Electrofest</a></li>
                                    <li><a href="01_rockfest-index-video.html">Rockfest Video</a></li>
                                </ul>
                            </li>                                   
                            <li><a href="#section-artists">Artistes</a></li>                  
                            <li><a href="#section-plan">Plan</a></li>             
                            <li><a href="#section-tickets">Tickets</a></li>
                            <li><a href="#section-forum">Forum</a></li>
                            <li><a href="#section-gallery">Gallerie</a></li>
                            <li><a href="index-dj.html">Pages</a>
                                <ul>
                                    <li><a @click.prevent="goToCityPage">Rechercher un evenement</a></li>
                                    <li><a @click.prevent="goAddEventPage">Proposer un evenement</a></li>
                                    <li><a @click.prevent="goForumPage">Forum</a></li>
                                </ul>
                            </li>
                            
                        </ul>
                    </div>
                    <div class="de-flex-col">
                        <div v-if="!isLoggedIn" class="menu_side_area" style="text-align:center;">
                            <a @click="goToSignupPage" class="btn-main" style="margin-right:5px;"><i class="fa fa-sign-in"></i><span>Inscription</span></a>
                            <a @click="goToSigninPage" class="btn-main"><i class="fa fa-sign-in"></i><span>Connexion</span></a>
                            <span id="menu-btn"></span>
                        </div>
                        <div v-if="isLoggedIn" class="menu_side_area" style="text-align:center;">
                            <a @click="logout" class="btn-main" style="background-color:red;margin-right:5px;">Deconnexion</a>
                            <a v-if="isAdmin" @click="goToAdminHomePage" class="btn-main" style="background-color:green;margin-right:5px;">Admin</a>
                            <a @click="goToEventsPage" class="btn-main">Annonces</a>
                            <span id="menu-btn"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useJwt } from '@vueuse/integrations/useJwt';

const router = useRouter();
const route = useRoute();
const isLoggedIn = ref(false);
const isAdmin = ref(false);

const goToSigninPage = () => {
  router.push({ path : '/signin' });
};

const goToSignupPage = () => {
  router.push({ path : '/signup' });
};

const goToAdminHomePage = () => {
  router.push({ path : '/admin' });
};

const goToEventsPage = () => {
  router.push({ path : '/event' });
};

const goToCityPage = (event: Event) => {
  router.push({ path : '/city' });
};

const goAddEventPage = (event: Event) => {
  router.push({ path : '/add' });
};

const goForumPage = (event: Event) => {
  router.push({ path : '/forum' });
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
