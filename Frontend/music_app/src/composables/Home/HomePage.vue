announcementspage.vue :
<template>
    <div class="container mt-12" v-if="isArtist || isOrganizer || isFullAuthorized">
      <div class="row g-custom-x align-items-center">
        <div class="col-lg-12">
          <div class="text-center">
            <h2 class="wow fadeInUp" data-wow-delay=".2s">
              <div v-if="isOrganizer">
                <h2 class="font-inter text-2xl md:text-4xl font-extrabold mb-6">
                  <span class="id-color text-color:#371990 bold">Annonces</span> des artistes près de vous
                </h2>
              </div>
              <div v-if="isArtist">
                <h2 class="font-inter text-2xl md:text-4xl font-extrabold mb-6">
                  <span class="id-color text-color:#371990 bold">Annonces</span> des organisateurs près de vous
                </h2>
              </div>
            </h2>
          </div>
        </div>
      </div>
      <div
        id="list-announcement-posts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        v-if="announcements.length !== 0"
      >
        <div class="flex flex-row flex-wrap gap-6 justify-center mt-6">
          <div
            v-for="announcement in announcements"
            class="flex mt-6 hover:scale-110 flex-col items-center max-w-sm p-6 bg-gradient-to-b from-[#5D26C1] to-[#2B86C5] border-4 border-white rounded-2xl shadow-lg"
            style="height: 20rem"
          >
            <a href="#">
              <p class="mb-2 text-xl font-extrabold tracking-tight text-[#F9F9F9]">
                {{ announcement.title }} <span class="font-light">par</span> {{ announcement.User.pseudo }}
              </p>
            </a>
            <p class="mb-2 text-lg font-semibold tracking-tight text-[#D1D5DB]">
              {{ announcement.User.city }}
            </p>
            <p class="mb-4 font-normal text-[#E5E7EB]">
              Créé le {{ new Date(announcement.createdAt).toLocaleString('fr-FR') }}
            </p>
            <p class="mb-4 font-normal text-[#E5E7EB]">
              {{ announcement.subtitle }}
            </p>
            <button
              @click=goToSingleAnnouncement(announcement.id)
              class="hover:scale-110 inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-b from-[#cdff6b] to-[#2B86C5] rounded-lg transition-all"
            >
              Visiter l'annonce
              <svg
                class="rtl:rotate-180 w-4 h-4 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="mb-10" style="display:flex;justify-content:center;" v-else>
        <h3>Aucune annonce dans votre zone a été faite pour l'instant.</h3>
      </div>
      <br />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'
import ApiService from '@/services/ApiService'
import { useRouter } from 'vue-router'
import type { ArtistInfo } from 'models/user'

const isUser = ref(false)
const isArtist = ref(false)
const isOrganizer = ref(false)
const isFullAuthorized = ref(false)
const announcements = ref([])
const closeArtists = ref<ArtistInfo[]>([])
const router = useRouter()
const artistsRandom = ref()
const isNotLoginOrUser = ref(true)

const goToSingleAnnouncement = (postId: number) => {
  if (postId) {
    router.push(`/forum/${postId}`)
  } else {
    console.error("L'ID du post manquant")
  }
}

const goToEventPage = () => {
  router.push({ path: '/event' })
}

const goToAddEventPage = () => {
  router.push({ path: '/event/add' })
}

const goToContactPage = (event: Event) => {
  event.preventDefault()
  router.push({ path: '/contact' })
}

onMounted(async () => {
  try {
    const showArtistRandom = await ApiService.get(`/get-random-groups`, {});
    artistsRandom.value = showArtistRandom.data;
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const { payload } = useJwt(authToken)
      const roleId = payload.value?.role
      if (roleId) {
        isUser.value = true
        if (roleId !== 'user') {
          isUser.value = false
        }
        if (roleId === 'admin') {
          isFullAuthorized.value = true
          isNotLoginOrUser.value = false
        } else if (roleId === 'artist') {
          isArtist.value = true
          isNotLoginOrUser.value = false
        } else if (roleId === 'organizer') {
          isOrganizer.value = true
          isNotLoginOrUser.value = false
        }
        if (roleId === 'artist' || roleId === 'organizer') {
          const getAnnouncements = await ApiService.get(`/get-close-posts`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });
          console.log(getAnnouncements);
          announcements.value = getAnnouncements.data
          announcements.value.slice(0, 3)
          console.log(announcements.value)
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de la requête :', error)
  }
})
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
