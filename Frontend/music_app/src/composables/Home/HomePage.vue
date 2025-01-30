announcementspage.vue :
<template>
  <section id="section-artists">
    <div class="container">
      <div class="row g-custom-x align-items-center">
        <div class="col-lg-12">
          <div class="text-center">
            <div class="wm wow slideInUp">Artistes</div>
            <h2 class="wow fadeInUp" data-wow-delay=".2s">
              <span class="id-color">01 </span>Nos Artistes
            </h2>
            <div class="small-border bg-color-2"></div>
            <div class="spacer-single"></div>
          </div>
        </div>
        <div class="col-md-4 mb-sm-30">
          <div class="de-image-text s2 wow flipInY">
            <a href="#" class="d-text">
              <div class="arrow_wrap">
                <div class="arrow__up"></div>
              </div>
              <h3>DJ Neurogenic</h3>
            </a>
            <img src="/images-dj/misc/featured-1.jpg" class="img-fluid" alt="" />
          </div>
        </div>
        <div class="col-md-4 mb-sm-30">
          <div class="de-image-text s2 wow flipInY">
            <a href="#" class="d-text">
              <div class="arrow_wrap">
                <div class="arrow__up"></div>
              </div>
              <h3>DJ Phenomenic</h3>
            </a>
            <img src="/images-dj/misc/featured-2.jpg" class="img-fluid" alt="" />
          </div>
        </div>
        <div class="col-md-4 mb-sm-30">
          <div class="de-image-text s2 wow flipInY">
            <a href="#" class="d-text">
              <div class="arrow_wrap">
                <div class="arrow__up"></div>
              </div>
              <h3>DJ Fritz</h3>
            </a>
            <img src="/images-dj/misc/featured-3.jpg" class="img-fluid" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10 offset-md-1 text-center">
          <div class="spacer-single"></div>
          <ul class="list-inline-style-1">
            <li>
              Découvrez aussi quelques artistes sélectionnés au hasard avec lesquels nous
              collaborons :
            </li>
            <li v-for="artist in artistsRandom">
              {{ artist.name + ' ' }}
            </li>
          </ul>
        </div>
      </div>
      <div class="de_tab tab_style_4 mt-5 text-center">
        <div class="col-md-10 offset-md-1 text-center">
          <div v-bind:style="isArtist ? '' : 'display:none;'">
            <h2 class="wow fadeInUp mt-9" data-wow-delay=".2s">
              Vous êtes <span class="id-color">Artiste</span>, vous avez une question ?
            </h2>
          </div>
          <div v-bind:style="isOrganizer ? '' : 'display:none;'">
            <h2 class="wow fadeInUp mt-9" data-wow-delay=".2s">
              Vous êtes <span class="id-color">Organisateur</span>, vous avez une question ?
            </h2>
          </div>
          <div v-if="isNotLoginOrUser">
  <h2 class="wow fadeInUp mt-9" data-wow-delay=".2s">
    Contactez <span class="id-color">Notre Equipe</span> pour une remarque ou bien vous
    souhaitez devenir <span class="id-color">organisateur</span> ou
    <span class="id-color">artiste</span> ?
  </h2>
</div>
          <div v-bind:style="isFullAuthorized ? '' : 'display:none;'">
            <h2 class="wow fadeInUp mt-9" data-wow-delay=".2s">
              Faire un test d'envoie de formulaire de contact
            </h2>
          </div>
        </div>
        <div class="de_tab_content text-left">
          <div id="tab1" class="tab_single_content pb-0 mb-0">
            <div class="row">
              <div class="col-md-12 text-center">
                <ul class="list-boxed-s1">
                  <li @click="goToContactPage" style="cursor: pointer;">
                    <h3>Contactez-nous</h3>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-12" v-if="isArtist">
      <div class="row g-custom-x align-items-center">
        <div class="col-lg-12">
          <div class="text-center">
            <div class="wm wow slideInUp">Annonces</div>
            <h2 class="wow fadeInUp" data-wow-delay=".2s">
              <span class="id-color">Annonces des organisateurs à venir !</span>
            </h2>
            <div class="small-border bg-color-2"></div>
            <div class="spacer-single"></div>
          </div>
        </div>
      </div>
      <div
        id="list-announcement-posts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="organizerAnnouncement in organizerAnnouncements"
          :key="organizerAnnouncement.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 class="text-xl font-semibold mb-2 text-black">{{ organizerAnnouncement.title }}</h2>
          <p class="text-black-700 mb-4">{{ organizerAnnouncement.description }}</p>
          <button
            class="ButtonPrimary text-white w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300"
            @click="goToSingleAnnouncement(organizerAnnouncement.id)"
          >
            Consulter le post
          </button>
        </div>
      </div>
      <br />
      <div class="d-flex justify-content-center">
        <button
          @click="goToForumPage()"
          class="ButtonPrimary font-bold text-white w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Voir tous les annonces
        </button>
      </div>
    </div>
    <div class="container" v-if="isOrganizer">
      <div class="row g-custom-x align-items-center">
        <div class="col-lg-12">
          <div class="text-center">
            <div class="wm wow slideInUp">Annonces</div>
            <h2 class="wow fadeInUp" data-wow-delay=".2s">
              <span class="id-color text-color:#371990 bold">01</span> Annonces des artistes près de vous
            </h2>
            <div class="small-border bg-color-2"></div>
            <div class="spacer-single"></div>
          </div>
        </div>
      </div>
      <div
        id="list-announcement-posts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="artistAnnouncement in artistAnnouncements"
          :key="artistAnnouncement.id"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 class="text-xl font-semibold mb-2 text-black">{{ artistAnnouncement.title }}</h2>
          <p class="text-black-700 mb-4">{{ artistAnnouncement.description }}</p>
          <button
            class="ButtonPrimary text-white w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300"
            @click="goToSingleAnnouncement(artistAnnouncement.id)"
          >
            Consulter le post
          </button>
        </div>
      </div>
      <br />
      <div class="d-flex justify-content-center">
        <button
          @click="goToForumPage()"
          class="ButtonPrimary text-white w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Voir tous les annonces
        </button>
      </div>
      <div
        class="d-flex justify-content-center align-items-center"
        style="flex-direction: column; margin-bottom: 5%"
      >
        <h2 class="mb-6 mt-6" style="font-size: 22px; font-weight: 600">
          Vous souhaitez laisser une annonce ?
        </h2>
        <button
          @click="goToAddPostPage()"
          class="ButtonPrimary text-white w-full md:w-80 h-12 px-6 m-2 py-2.5 bg-gradient-to-r from-violet-500 to-purple-700 rounded-lg flex justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Créez la vôtre
        </button>
        <div
          v-for="artist in closeArtists"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 class="text-xl font-semibold mb-2 text-black">
            {{ artist.firstname }} {{ artist.lastname }}
          </h2>
          <p class="text-black">{{ artist.pseudo }}</p>
          <p class="text-black">{{ artist.email }}</p>
        </div>
      </div>
    </div>
  </section>
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
const artistAnnouncements = ref([])
const organizerAnnouncements = ref([])
const closeArtists = ref<ArtistInfo[]>([])
const router = useRouter()
const artistsRandom = ref()
const isNotLoginOrUser = ref(true)

const goToSingleAnnouncement = (postId: number) => {
  if (postId) {
    router.push(`/announcements/${postId}`)
  } else {
    console.error("L'ID du post manquant")
  }
}

const goToForumPage = () => {
  router.push({ path: '/forum' })
}

const goToAddPostPage = () => {
  router.push({ path: '/forum/add' })
}

const goToContactPage = (event: Event) => {
  event.preventDefault()
  router.push({ path: '/contact' })
}

onMounted(async () => {
  try {
    const showArtistRandom = await ApiService.get(`/get-random-groups`, {})
    artistsRandom.value = showArtistRandom.data
    const authToken = localStorage.getItem('authToken')
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
        if (roleId === 'artist') {
          const getOrganizerAnnouncements = await ApiService.get(`/get-close-organizer-posts`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
          organizerAnnouncements.value = getOrganizerAnnouncements.data
          organizerAnnouncements.value.slice(0, 3)
          console.log(organizerAnnouncements.value)
        } else if (roleId === 'organizer') {
          const getArtistAnnouncements = await ApiService.get(`/get-close-artist-posts`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
          artistAnnouncements.value = getArtistAnnouncements.data
          artistAnnouncements.value.slice(0, 3)

          const getCloseArtists = await ApiService.get(`/get-close-artists`, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          })
          closeArtists.value = getCloseArtists.data
          console.log(closeArtists.value)
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
