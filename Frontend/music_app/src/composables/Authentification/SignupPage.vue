<template>
  <ModalConfirm v-model="show" title="Erreur" @confirm="confirm">
    <p>{{ errorMessage }}</p>
  </ModalConfirm>
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div
      class="px-16 bg-white shadow-md flex flex-col justify-center items-center"
      style="height: 100%"
    >
      <a href="/" class="flex items-center justify-center">
        <img src="../../assets/images/logo.png" style="height: 200px" />
      </a>
      <div class="font-semibold text-2xl">S'Inscrire</div>
      <div class="w-96 h-20 px-2.5 flex-col justify-start items-start gap-1 flex">
        <label class="w-96 px-2 text-gray-800 text-sm font-medium leading-tight">Nom</label>
        <input
          data-test="signupLastname"
          class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
          placeholder="Saisissez votre nom"
          v-model="request.lastname"
        />
      </div>

      <div class="w-96 h-20 px-2.5 flex-col justify-start items-start gap-1 flex">
        <label class="w-96 px-2 text-gray-800 text-sm font-medium leading-tight">Prénom</label>
        <input
          data-test="signupFirstname"
          class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
          placeholder="Saisissez votre prénom"
          v-model="request.firstname"
        />
      </div>

      <div class="w-96 h-20 px-2.5 flex-col justify-start items-start gap-1 flex">
        <label class="w-96 px-2 text-gray-800 text-sm font-medium leading-tight">Email</label>
        <input
          data-test="signupEmail"
          class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
          placeholder="Saisissez votre email"
          v-model="request.email"
        />
      </div>

      <div class="w-96 h-20 px-2.5 pb-2.5 flex-col justify-start items-start gap-2.5 flex relative">
        <label class="w-96 px-2 text-gray-800 text-sm font-medium leading-tight">Ville</label>
        <input
          data-test="signupCity"
          class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
          list="cities-list"
          @input="handleInput"
          v-model="geocoding_city"
          type="text"
          placeholder="Entrez une ville"
          required
        />
        <ul
          v-if="showDropdown"
          class="p-0 absolute w-96 left-0 top-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-56 overflow-y-auto"
        >
          <li
            data-test="signupCoordinates"
            v-for="(city, index) in cities"
            :key="index"
            @click="selectCity(city.nom, city.centre.coordinates[0], city.centre.coordinates[1])"
            class="text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-300 active:bg-gray-400"
          >
            {{ city.nom }}
          </li>
        </ul>
      </div>
      <div class="w-96 h-20 px-2.5 flex-col justify-start items-start gap-1 flex">
        <label class="w-96 px-2 text-gray-800 text-sm font-medium leading-tight">Pseudo</label>
        <input
          data-test="signupPseudo"
          class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
          placeholder="Saisissez votre pseudo"
          v-model="request.pseudo"
        />
      </div>
      <div class="w-96 h-20 px-2.5 pb-2.5 flex-col justify-start items-start gap-2.5 flex">
        <label class="w-96 px-2 text-gray-800 text-sm font-medium leading-tight"
          >Mot de passe</label
        >
        <input
          data-test="signupPassword"
          class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
          id="password"
          type="password"
          placeholder="********"
          v-model="request.password"
        />
      </div>
      <button
        data-test="submitSignupForm"
        :class="[
          'w-80 h-12 px-12 mt-3 py-2.5 rounded-lg flex justify-center items-center gap-2.5 mb-8',
          buttonClass
        ]"
        :disabled="isButtonDisabled"
        @click="signup"
      >
        <span class="text-white text-base font-bold">S'inscrire</span>
      </button>
      <span class="text-slate-900 font-semibold"> Vous avez déjà un compte ? </span>
      <a href="/signin" class="text-violet-600 font-semibold">Connectez-vous !</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Signup } from '../../../models/authentification'
import ApiService from '@/services/ApiService'
import { ref, computed } from 'vue'
import axios from 'axios'
import ModalConfirm from '../../components/pModal/ModalConfirm.vue'

const cities = ref<string[]>([])
const geocoding_city = ref('')
const showDropdown = ref(false)
const show = ref(false)
const requestLatitude = ref()
const requestLongitude = ref()
const errorMessage = ref('')
const confirm = () => {
  show.value = false
}

const router = useRouter()

const request = ref<Signup>({
  lastname: '',
  firstname: '',
  email: '',
  pseudo: '',
  role: 'user',
  password: '',
  city: '',
  latitude: requestLatitude.value,
  longitude: requestLongitude.value,
})

const isButtonDisabled = computed(() => {
  return !(
    request.value.lastname &&
    request.value.firstname &&
    request.value.email &&
    request.value.pseudo &&
    request.value.password &&
    request.value.city 
  )
})

const buttonClass = computed(() => {
  return isButtonDisabled.value ? 'bg-gray-400' : 'bg-violet-600'
})

const handleInput = async () => {
  if (geocoding_city.value.length >= 2) {
    cities.value = await fetchCities(geocoding_city.value)
    showDropdown.value = cities.value.length > 0
  } else {
    cities.value = []
    showDropdown.value = false
  }

  request.value.city = geocoding_city.value
}

const verifyTown = (queryResponse: string, queryApi: string[]): Promise<void> => {
  console.log(queryResponse);
  console.log(queryApi);
  return new Promise((resolve, reject) => {
    if (queryApi.some((city) => city.nom === queryResponse)) {
      resolve()
    } else {
      reject(new Error('The town don´t exist'))
    }
  })
}

const fetchCities = async (query: any) => {
  if (!query) return []
  const url = `https://geo.api.gouv.fr/communes?nom=${query}&fields=nom,centre`
  try {
    const response = await axios.get(url)
    const responseMap = response.data.map((city: any) => city)
    return responseMap
  } catch (error) {
    console.error('Error to retrieve towns :', error)
    return []
  }
}

const selectCity = (city: string, cityLatitude: number, cityLongitude: number) => {
  geocoding_city.value = city
  request.value.city = city
  request.value.latitude = cityLongitude
  request.value.longitude = cityLatitude
  showDropdown.value = false
  return geocoding_city.value
}
const signup = async () => {
  try {
    await verifyTown(request.value.city, cities.value);
    const response = await ApiService.post('/signup', request.value)
    const token = response.data.token
    router.push({ path: '/signin' })
    localStorage.setItem('authToken', token)
  } catch (error: any) {
    console.error(error)
    errorMessage.value = error.response?.data?.message || error.message
    show.value = true
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
