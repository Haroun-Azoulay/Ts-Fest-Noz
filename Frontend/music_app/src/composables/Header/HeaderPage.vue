<template>
  <header class="transparent">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="de-flex sm-pt10" style="flex-direction: row">
            <div class="de-flex-col">
              <div class="de-flex-col">
                <!-- logo begin -->
                <div id="logo">
                  <a @click.prevent="goToHomePage">
                    <img alt="" style="height: 80px" src="../../assets/images/logo.png" />
                  </a>
                </div>
                <!-- logo close -->
              </div>
              <div class="de-flex-col"></div>
            </div>
            <div class="de-flex-col header-col-mid">
              <!-- mainmenu begin -->
              <ul id="mainmenu">
                <li class="hover:bg-lime-500"><a href="/#de-carousel">Home</a></li>
                <li class="hover:bg-lime-500"><a href="/#section-artists">Artistes</a></li>
                <li class="hover:bg-lime-500"><a href="/#section-plan">Evenement</a></li>
                <li class="hover:bg-lime-500"><a href="/#section-announcements">Annonces</a></li>
                <li class="hover:bg-lime-500"><a href="/#section-gallery">Galerie</a></li>
                <li class="hover:bg-lime-500"><a @click.prevent="goContactPage">Contact</a></li>
                <li v-if="isUser || isArtist || isOrganizer || isAdmin">
                  <a v-if="isUser || isArtist || isOrganizer || isAdmin" href="">Pages</a>
                  <ul>
                    <li class="hover:bg-lime-500">
                      <a @click.prevent="goToCityPage">Rechercher un evenement</a>
                    </li>
                    <li v-if="isOrganizer || isAdmin" class="hover:bg-lime-500">
                      <a @click.prevent="goAddEventPage">Proposer un evenement</a>
                    </li>
                    <li class="hover:bg-lime-500"><a @click.prevent="goToEventsPage">Liste d'évènements</a></li>
                    <li class="hover:bg-lime-500"><a @click.prevent="goContactPage">Contact</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="de-flex-col">
              <div
                v-if="!isLoggedIn"
                class="menu_side_area"
                style="text-align: center; height: 50px"
              >
                <a @click="goToSignupPage" class="btn-main" style="margin-right: 10px"
                  ><i class="fa fa-circle"></i><span>Inscription</span></a
                >
                <a @click="goToSigninPage" class="btn-main"
                  ><i class="fa fa-sign-in"></i><span>Connexion</span></a
                >
                <span id="menu-btn"></span>
              </div>
              <div v-if="isLoggedIn" 
              class="menu_side_area" 
              style="text-align: center; height: 50px">
                <a
                  @click="logout"
                  class="btn-main text-white"
                  style="background-color: red; margin-right: 10px"
                  ><i class="fa fa-sign-out"></i><span>Deconnexion</span></a
                >
                <a
                  v-if="isFullAuthorized"
                  @click="goToAdminHomePage"
                  class="btn-main"
                  style="background-color: green; margin-right: 10px"
                  ><span>Admin</span></a
                >
                <a href="http://0.0.0.0:5174/" class="btn-main">E-Commerce</a>
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
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'
import ApiService from '@/services/ApiService'

const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(false)
const isAdmin = ref(false)
const isUser = ref(false)
const isArtist = ref(false)
const isOrganizer = ref(false)
const isFullAuthorized = ref(false)

const goToHomePage = () => {
  router.push({ path: '/' })
}

const goToSigninPage = () => {
  router.push({ path: '/signin' })
}

const goToSignupPage = () => {
  router.push({ path: '/signup' })
}

const goToAdminHomePage = () => {
  router.push({ path: '/admin' })
}

const goToEventsPage = () => {
  router.push({ path: '/event' })
}

const goToCityPage = (event: Event) => {
  router.push({ path: '/city' })
}

const goAddEventPage = (event: Event) => {
  router.push({ path: '/add' })
}

const goForumPage = (event: Event) => {
  router.push({ path: '/announcements' })
}

const goContactPage = () => {
  router.push({ path: '/contact' })
}

const logout = () => {
  localStorage.removeItem('authToken')
  isLoggedIn.value = false
  window.location.reload()
}

const isHomePage = computed(() => {
  return route.path === '/'
})

onMounted(async () => {
  isLoggedIn.value = localStorage.getItem('authToken') !== null
  try {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      await ApiService.get('/my-user', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      const { payload } = useJwt(authToken)
      const roleId = payload.value?.role
      isUser.value = true
      if (roleId !== 'user') {
        isUser.value = false
      }
      if (roleId === 'admin') {
        isFullAuthorized.value = true
      } else if (roleId === 'artist') {
        isArtist.value = true
      } else if (roleId === 'organizer') {
        isOrganizer.value = true
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error)
    if (isLoggedIn.value === true) {
      logout()
    }
  }
})
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.ButtonPrimary {
  @apply w-full md:w-32 h-8 px-4 py-1.5 bg-violet-600 text-white rounded-lg flex justify-center items-center text-sm font-bold font-['Inter'] m-1;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.5s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
</style>
