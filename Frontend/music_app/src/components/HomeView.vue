<template>
  <div id="wrapper">
    <HeaderPage />
    <!-- content begin -->
    <div class="no-bottom no-top" id="content">
      <div id="top"></div>
      <!-- Carousel wrapper -->
      <section
        id="de-carousel"
        class="no-top no-bottom carousel slide carousel-fade shadow-2-strong"
        data-mdb-ride="carousel"
      >
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-mdb-target="#de-carousel" data-mdb-slide-to="0" class="active"></li>
          <li data-mdb-target="#de-carousel" data-mdb-slide-to="1"></li>
          <li data-mdb-target="#de-carousel" data-mdb-slide-to="2"></li>
        </ol>
        <!-- Inner -->
        <div class="carousel-inner">
          <!-- Single item -->
          <div class="carousel-item active" data-bgimage="url(/images-dj/slider/1.jpg)">
            <div class="mask">
              <div class="d-flex justify-content-center align-items-center h-100">
                <div class="container text-white text-center">
                  <div class="row">
                    <div class="col-md-12">
                      <h1 class="ultra-big mb-3 wow fadeInUp">
                        Summer<br /><span class="id-color">Remix</span>
                      </h1>
                      <div class="col-md-6 offset-md-3">
                        <p class="lead wow fadeInUp" data-wow-delay=".3s">
                          Les plus gros évènements de musiques depuis des décennies. Organisé par
                          plus de 100 musiciens de tous les coins du monde. Inscrivez-vous
                          maintenant!
                        </p>
                      </div>
                      <div class="spacer-10"></div>
                      <a href="#section-artists" class="btn-main wow fadeInUp" data-wow-delay=".6s"
                        >Explore</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Single item -->
          <div class="carousel-item" data-bgimage="url(images-dj/slider/2.jpg)">
            <div class="mask">
              <div class="d-flex justify-content-center align-items-center h-100 wow f">
                <div class="container text-white text-center">
                  <div class="row">
                    <div class="col-md-12">
                      <h1 class="ultra-big mb-3 wow fadeInUp">
                        Musiques<br /><span class="id-color">Sans fin</span>
                      </h1>
                      <div class="col-md-6 offset-md-3">
                        <p class="lead wow fadeInUp" data-wow-delay=".3s">
                          Les plus gros évènements de musiques depuis des décennies. Organisé par
                          plus de 100 musiciens de tous les coins du monde. Inscrivez-vous
                          maintenant!
                        </p>
                      </div>
                      <div class="spacer-10"></div>
                      <a href="#section-artists" class="btn-main wow fadeInUp" data-wow-delay=".6s"
                        >Explorez</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Inner -->
        <!-- Controls -->
        <a class="carousel-control-prev" href="#de-carousel" role="button" data-mdb-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#de-carousel" role="button" data-mdb-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </section>
      <!-- Carousel wrapper -->

      <div class="arrow_wrap">
        <div class="arrow__up"></div>
      </div>
      <section id="section-date" class="bg-color pt40 pb30">
        <div class="container">
          <div class="row g-custom-x align-items-center">
            <div class="col-lg-12">
              <div class="text-center">
                <h2 class="s2 text-black wow fadeInUp" data-wow-delay="0s">
                  <i style="margin-right: 5%; color: black" class="fa fa-apple"></i
                  ><i style="color: black" class="fa fa-android"></i>
                </h2>
                <h3 class="text-black wow fadeInUp" data-wow-delay=".2s">
                  Disponible sur iOS et Android
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnnouncementsPage></AnnouncementsPage>
      <section
        id="section-plan"
        class="map_box_container_city"
        aria-label="section-services-tab"
        data-bgimage="url(images-dj/background/1.jpg)"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <div class="wm wow slideInUp">Events</div>
                <h2 class="wow fadeInUp" data-wow-delay=".2s">
                  <span class="id-color">02</span> Evenements
                </h2>
                <div class="small-border bg-color wow zoomIn" data-wow-delay=".4s"></div>
              </div>
            </div>
            <div class="spacer-single"></div>
            <div class="col-md-12">
              <div class="de_tab tab_style_4 text-center">
                <h2 class="mb-6" style="font-size: 22px; font-weight: 600">
                  Trouvez les meilleurs évènements à proximité !
                </h2>

                <div class="flex flex-row flex-wrap gap-6 justify-center mt-6">
                  <div
                    v-for="event in eventNearby"
                    class="flex mt-6 hover:scale-110 flex-col items-center max-w-sm p-6 bg-gradient-to-b from-[#5D26C1] to-[#2B86C5] border-4 border-white rounded-2xl shadow-lg"
                    style="height: 20rem"
                  >
                    <a href="#">
                      <p class="mb-2 text-xl font-extrabold tracking-tight text-[#F9F9F9]">
                        {{ event.details.text }}
                      </p>
                    </a>
                    <p class="mb-2 text-lg font-semibold tracking-tight text-[#D1D5DB]">
                      {{ event.details.city_name }}
                    </p>
                    <p class="mb-4 font-normal text-[#E5E7EB]">
                      À seulement <span class="font-bold">{{ event.distance }}</span> km de votre lieu d'inscription !
                    </p>
                    <a
                      href="#"
                      class="hover:scale-110 inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-b from-[#cdff6b] to-[#2B86C5] rounded-lg transition-all"
                    >
                      En savoir plus
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
                    </a>
                  </div>
                </div>

                <!-- <div v-if="isUser || isArtist || isOrganizer || isFullAuthorized">
                  <HomeSearchCity @geocodeResult="handleGeocodeResult"></HomeSearchCity>
                  <div id="map"></div>
                </div> -->

                <div class="mt-6" v-bind:style="isOrganizer || isFullAuthorized ? '' : 'display:none;'">
                  <h2><span class="id-color">OU</span></h2>
                  <h2 class="mb-6" style="font-size: 22px; font-weight: 800">
                    Proposez ou assistez aux meilleurs évenements proches
                    <br />
                    de chez vous ou que vous soyez !
                  </h2>
                </div>
                <div class="de_tab_content text-left mt-5">
                  <div id="tab1" class="tab_single_content">
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <ul class="list-boxed-s1">
                          <li>
                            <template v-if="isUser || isArtist || isOrganizer || isFullAuthorized">
                              <h3
                                v-bind:style="'pointer-events:auto;cursor:pointer;'"
                                @click="goToCityPage"
                              >
                                Trouver un événement
                              </h3>
                            </template>
                            <template v-else>
                              <button
                                v-bind:style="'pointer-events:auto;cursor:pointer;'"
                                @click="goToLoginPage"
                              >
                                Connectez-Vous
                              </button>
                            </template>
                          </li>
                          <li
                            v-bind:style="
                              isOrganizer || isFullAuthorized
                                ? 'pointer-events:auto;cursor:pointer;'
                                : 'display:none;'
                            "
                            @click="goAddEventPage"
                          >
                            <h3>Proposer un evenement</h3>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section-announcements" data-bgimage="url(images-dj/background/3.jpg)">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <div class="wm wow slideInUp">Communauté</div>
              <h2 class="wow fadeInUp" data-wow-delay=".2s">
                <span class="id-color">03</span> Communauté Active
              </h2>
              <div class="small-border bg-color wow zoomIn" data-wow-delay=".4s"></div>
            </div>
            <div class="spacer-single"></div>
          </div>
          <div style="display: flex">
            <div class="text-center md:text-left flex-1">
              <h2 class="font-inter text-2xl md:text-4xl font-extrabold mb-6">
                Laissez une annonce !
              </h2>
              <p class="text-gray-600 mb-6 text-white">
                Commentez, Partagez, Parlez tout simplement, exprimez vous sur les événements et
                faites des rencontres qui dureront peut-être toute la vie !
              </p>
              <a
                v-if="!isUser && !isArtist && !isOrganizer"
                style="background-color: #cdff6b; color: black"
                class="btn-main"
                @click="goToLoginPage"
              >
                <span>Connectez vous</span>
              </a>
              <a v-if="isUser || isArtist || isOrganizer" class="btn-main" @click="goForumPage">
                <span>Accedez au Forum</span></a
              >
            </div>
            <div class="flex-1 mt-8 md:mt-0 md:ml-8">
              <img
                src="../assets/images/forum.png"
                alt="Message image"
                class="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="section-gallery" data-bgimage="url(images-dj/background/2.jpg)">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <div class="wm wow slideInUp">Galeries</div>
              <h2 class="wow fadeInUp" data-wow-delay=".2s">
                <span class="id-color">04 </span>Galerie des Evenements
              </h2>
              <div class="small-border bg-color wow zoomIn" data-wow-delay=".4s"></div>
            </div>
            <div class="spacer-single"></div>
          </div>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div
                id="carouselExampleIndicators"
                class="carousel slide carousel-fade wow flipInY"
                data-mdb-ride="carousel"
              >
                <!-- Slides -->
                <div class="carousel-inner mb-5">
                  <div class="carousel-item active">
                    <img src="/images-dj/gallery/1.jpg" class="d-block w-100" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="/images-dj/gallery/2.jpg" class="d-block w-100" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="/images-dj/gallery/3.jpg" class="d-block w-100" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="/images-dj/gallery/4.jpg" class="d-block w-100" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="/images-dj/gallery/5.jpg" class="d-block w-100" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img src="/images-dj/gallery/6.jpg" class="d-block w-100" alt="" />
                  </div>
                </div>
                <!-- Slides -->
                <!-- Controls -->
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="prev"
                >
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-mdb-target="#carouselExampleIndicators"
                  data-mdb-slide="next"
                >
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
                <!-- Controls -->
                <!-- Thumbnails -->
                <div class="carousel-indicators" style="margin-bottom: -20px">
                  <button
                    type="button"
                    data-mdb-target="#carouselExampleIndicators"
                    data-mdb-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                    style="width: 100px"
                  >
                    <img class="d-block w-100 img-fluid" src="/images-dj/gallery/1.jpg" alt="" />
                  </button>
                  <button
                    type="button"
                    data-mdb-target="#carouselExampleIndicators"
                    data-mdb-slide-to="1"
                    aria-label="Slide 2"
                    style="width: 100px"
                  >
                    <img class="d-block w-100 img-fluid" src="/images-dj/gallery/2.jpg" alt="" />
                  </button>
                  <button
                    type="button"
                    data-mdb-target="#carouselExampleIndicators"
                    data-mdb-slide-to="2"
                    aria-label="Slide 3"
                    style="width: 100px"
                  >
                    <img class="d-block w-100 img-fluid" src="/images-dj/gallery/3.jpg" alt="" />
                  </button>
                  <button
                    type="button"
                    data-mdb-target="#carouselExampleIndicators"
                    data-mdb-slide-to="3"
                    aria-label="Slide 4"
                    style="width: 100px"
                  >
                    <img class="d-block w-100 img-fluid" src="/images-dj/gallery/4.jpg" alt="" />
                  </button>
                  <button
                    type="button"
                    data-mdb-target="#carouselExampleIndicators"
                    data-mdb-slide-to="4"
                    aria-label="Slide 5"
                    style="width: 100px"
                  >
                    <img class="d-block w-100 img-fluid" src="/images-dj/gallery/5.jpg" alt="" />
                  </button>
                  <button
                    type="button"
                    data-mdb-target="#carouselExampleIndicators"
                    data-mdb-slide-to="5"
                    aria-label="Slide 6"
                    style="width: 100px"
                  >
                    <img class="d-block w-100 img-fluid" src="/images-dj/gallery/6.jpg" alt="" />
                  </button>
                </div>
                <!-- Thumbnails -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="section-countdown" aria-label="section">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="wm wow slideInUp">Begins in</div>
              <div id="defaultCountdown" class="wow fadeInUp" data-wow-delay=".2s"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- content close -->
    <a href="#" id="back-to-top"></a>
    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import HeaderPage from '../pages/Header/HeaderPage.vue'
import FooterPage from '../pages/Footer/FooterPage.vue'
import ApiService from '@/services/ApiService'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useJwt } from '@vueuse/integrations/useJwt'
import mapboxgl, { Map } from 'mapbox-gl'
import { format } from 'date-fns'
import HomeSearchCity from '@/pages/Map/HomeSearchCity.vue'
import AnnouncementsPage from '@/pages/Home/AnnouncementsPage.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const result = ref(null)
const isUser = ref(false)
const isArtist = ref(false)
const isOrganizer = ref(false)
const isFullAuthorized = ref(false)
const router = useRouter()
const points = ref<Maps[]>([])
const markers = ref<mapboxgl.Marker[]>([])
const eventNearby = ref()
let map: Map

interface Maps {
  id: number
  longitude: number
  latitude: number
  text: string
  address: string
  color: string
  region_name: string
  url_point: string
  date: string
}

const updateMap = (coordinates) => {
  if (map) {
    map.remove()
  }

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 15
  })

  new mapboxgl.Marker().setLngLat(coordinates)

  addMarkers()
}

const handleGeocodeResult = (geocodeResult) => {
  result.value = geocodeResult
  updateMap([geocodeResult.longitude, geocodeResult.latitude])
}

const clearMarkers = () => {
  markers.value.forEach((marker) => marker.remove())
  markers.value = []
}

const handleChangeAllPoints = async () => {
  const authToken = localStorage.getItem('authToken')
  if (!authToken) {
    console.error("L'utilisateur n'est pas authentifié.")
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      Origin: 'http://localhost:5173'
    }
  }

  try {
    const response = await ApiService.get('/get-all-points', config)
    points.value = response.data
    addMarkers()
  } catch (error) {
    console.error('Erreur lors de la requête :', error)
  }
}

const addMarkers = () => {
  if (map) {
    clearMarkers()
    points.value.forEach((point) => {
      const marker = new mapboxgl.Marker({ color: point.color })
        .setLngLat([point.longitude, point.latitude])
        .addTo(map)
      const formatedDate = format(new Date(point.date), 'dd/MM/yyyy HH:mm')

      const popupContent = `
                    <section style="font-family: Arial, sans-serif; padding: 10px;">
                    <h1 style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">${point.text}</h1>
                    <p style="margin: 5px 0;">Adresse: ${point.address}</p>
                    <p style="margin: 5px 0;">Région: ${point.region_name}</p>
                    <p style="margin: 5px 0;">Date: ${formatedDate}</p>
                    <a href="${point.url_point}" style="display: inline-block; margin: 12px 12px; color: #fffff; text-decoration: none;">Cliquer ici</a>
                    <button onclick="window.deletePoint(${point.id})" style="padding: 5px 10px; border: none; border-radius: 4px; background-color: #9333ea; color: white; cursor: pointer; transition: background-color 0.3s ease;">Supprimer</button>
                    </section>
                `

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent)

      marker.setPopup(popup)
      markers.value.push(marker)
      console.log(point)
    })
  }
}

const goToCityPage = () => {
  router.push('/city').then(() => {
    window.location.reload()
  })
}

const goToLoginPage = () => {
  router.push('/signin')
}

const goAddEventPage = () => {
  if (isArtist.value || isOrganizer.value || isFullAuthorized.value) {
    router.push('/add').then(() => {
      window.location.reload()
    })
  }
}

const goForumPage = () => {
  if (isUser.value || isArtist.value || isOrganizer.value || isFullAuthorized.value) {
    router.push('/announcements')
  }
}

onMounted(async () => {
  try {
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
      const { payload } = useJwt(authToken)
      const userId = payload.value?.userId

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          Origin: 'http://localhost:5173'
        }
      }

      const showEventNearby = await ApiService.get(`/get-point-near-user/${userId}`, config)
      eventNearby.value = showEventNearby.data
      const roleId = payload.value?.role
      if (roleId) {
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
      handleChangeAllPoints()
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

.btn-main:hover {
  font-size: 110%;
}
</style>
