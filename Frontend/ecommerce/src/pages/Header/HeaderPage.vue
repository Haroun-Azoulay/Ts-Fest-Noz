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
                                    <img alt="" style="height:100px;" src="../../assets/images/logo.png" />
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
                            <li><a href="/#de-carousel">Home</a></li>
                            <li><a href="/#section-shop">Boutique</a></li>
                            <li><a href="">Pages</a>
                                <ul>
                                    <li><a @click.prevent="goToGroupPage">Créer un groupe</a></li>
                                    <li><a @click.prevent="goToGroupPage">Vendre un produit</a></li>
                                    <li><a @click.prevent="goToGroupPage">Voir mes produits</a></li>
                                    <li><a @click.prevent="goContactPage">Contact</a></li>
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
                            <a @click="logout" style=" margin-right: 5px;"><i class="bi bi-bag-fill" style="font-size:2em"></i></a>
                            <a @click="goToDashboardPage" style=" margin-right: 5px;"><i class="bi bi-person-circle" style="font-size:2em"></i></a>
                            <a @click="logout" class="btn-main" style="background-color:red;margin-right:5px;">Deconnexion</a>
                            <a v-if="isAdmin" @click="goToAdminHomePage" class="btn-main" style="background-color:green;margin-right:5px;">Admin</a>
                            <a @click="goToFestNozOfficialWebsite" class="btn-main">Site Officiel Fest-Noz</a>
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
import ApiService from '@/services/ApiService';

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

const goToFestNozOfficialWebsite = () => {
  window.location.href = 'http://localhost:5173'
};

const goToGroupPage = () => {
  router.push({ path : '/group' });
};

const goToDashboardPage = () => {
  router.push({ path : '/dashboard' });
};

const goForumPage = (event: Event) => {
  router.push({ path : '/forum' });
};

const goContactPage = () => {
  router.push({ path : '/contact' });
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
      await ApiService.get('/users/my-user', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const { payload } = useJwt(authToken);
      const roleId = payload.value?.role;

      if (roleId === 'admin') {
        isAdmin.value = true;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    if (isLoggedIn.value === true) {
      logout();
    }
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
