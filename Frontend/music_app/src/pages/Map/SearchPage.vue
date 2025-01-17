searchpage.vue : <template>
  <section class="flex justify-center items-center  min-h-screen">
    <div class="w-full max-w-lg flex justify-center items-center flex-col p-4 rounded-md shadow-lg bg-white">
      <h1 class="text-black mb-4 text-xl font-bold text-center">Créez un marqueur d'un évènement</h1>
      <form @submit.prevent="geocodeAndSubmit" class="w-full">
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Ville</label>
          <input class="text-center w-full p-2 border rounded shadow-md" v-model="geocoding_town" type="text" placeholder="Entrez la ville" required>
        </div>
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Numéro de rue</label>
          <input class="text-center w-full p-2 border rounded shadow-md" v-model="geocoding_number" type="text" placeholder="Entrez le numéro" required>
        </div>
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Nom de rue</label>
          <input class="text-center w-full p-2 border rounded shadow-md" v-model="geocoding_address" type="text" placeholder="Entrez la rue" required>
        </div>
        <div class="mb-4">
          <label class="block text-black text-m font-medium leading-tight">Code postal</label>
          <input class="text-center w-full p-2 border rounded shadow-md" v-model="geocoding_postal_code" type="text" placeholder="Entrez le code postal" required>
        </div>
        <div>
          <button type="submit" class="w-full bg-violet-600 text-white p-2 rounded shadow-md hover:text-violet-600 hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-600 focus:ring-opacity-50">
            Rechercher
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits } from 'vue';
import { geocodeAddress } from '../../services/GeocodingService';
import mapboxgl from 'mapbox-gl';

const geocoding_number = ref('');
const geocoding_address = ref('');
const geocoding_postal_code = ref('');
const geocoding_town = ref('');
const event_name = ref('');
const event_txt = ref('');
const result = ref(null);
const selectedStyle = ref('');


const fullAddress = computed(() => {
  return `${geocoding_number.value} ${geocoding_address.value}, ${geocoding_postal_code.value} ${geocoding_town.value}`.trim();
});
let map;

const emit = defineEmits(['geocodeResult']);

const geocodeAndSubmit = async () => {
  try {
    const { latitude, longitude, streetAddress, postalCode, city, country, place } = await geocodeAddress(fullAddress.value);
    result.value = { latitude, longitude, streetAddress, postalCode, city, country, place };
    console.log(result.value);
    emit('geocodeResult', result.value);

    updateMap([longitude, latitude]);

    const elem = document.getElementById('add-event-map');
    const select_map = document.getElementById('map');
    if (elem) {
      elem.style.height = '100vh';
    }
    if (select_map) {
      select_map.style.height = '100%';
    }
  } catch (error) {
    console.error('Erreur de géocodage d\'adresse :', error.message);
  }
};


const updateMap = (coordinates) => {
  if (map) {
    map.remove();
  }

  
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates,
    zoom: 15,
  });

 
  new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
};


onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
});



</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>