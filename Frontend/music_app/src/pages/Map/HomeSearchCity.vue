homesearchcity.vue : <template>
    <div class="row">
      <div v-for="(city, index) in events" 
              :key="index">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title text-black">{{ city.name }}</h5>
            <p class="card-text text-black">{{ city.description }}</p>
            <a :href="`/${city.id}`" class="btn btn-primary">Détails</a>
          </div>
        </div>
      </div>
    </div>
    <br>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import ApiService from '@/services/ApiService';
import { geocodeAddressByPlace } from '../../services/GeocodingService';
import mapboxgl from 'mapbox-gl';
import type { User } from 'models/user';

const events = ref<[]>([]);
const result = ref(null);

const emit = defineEmits(['geocodeResult']);

onMounted(async () => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";
  try {
    const authToken = localStorage.getItem('authToken');
    const getUser = await ApiService.get(`/my-user`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const user : User = getUser.data;
    const response = await ApiService.get(`/get-city-points/${user.city}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const { latitude, longitude, streetAddress, postalCode, city, country, place } = await geocodeAddressByPlace(`${user.city}`);
    result.value = { latitude, longitude, streetAddress, postalCode, city, country, place };
    console.log(latitude);
    emit('geocodeResult', result.value);
    events.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des évènements par la ville :", error);
  }
});

</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>